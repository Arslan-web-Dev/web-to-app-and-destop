import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class BillingService {
  private stripe: Stripe;
  private supabase: SupabaseClient;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }

  // Create Stripe Customer
  async createCustomer(userId: string, email: string, name?: string) {
    const customer = await this.stripe.customers.create({
      email,
      name: name || email,
      metadata: { user_id: userId },
    });

    await this.supabase
      .from('users')
      .update({ stripe_customer_id: customer.id })
      .eq('id', userId);

    return customer;
  }

  // Create Subscription
  async createSubscription(userId: string, priceId: string, plan: string) {
    const { data: user } = await this.supabase
      .from('users')
      .select('stripe_customer_id, email, name')
      .eq('id', userId)
      .single();

    let customerId = user?.stripe_customer_id;

    if (!customerId) {
      const customer = await this.createCustomer(userId, user.email, user.name);
      customerId = customer.id;
    }

    const subscription = await this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
      metadata: { user_id: userId, plan },
    });

    // Store subscription in database
    await this.supabase.from('subscriptions').insert({
      user_id: userId,
      plan: plan.toUpperCase(),
      status: 'TRIALING',
      stripe_subscription_id: subscription.id,
      stripe_customer_id: customerId,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      usage_limits: this.getPlanLimits(plan),
    });

    return {
      subscriptionId: subscription.id,
      clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
    };
  }

  // Handle Stripe Webhooks
  async handleWebhook(payload: Buffer, signature: string) {
    const event = this.stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case 'invoice.payment_succeeded':
        await this.handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;
      case 'invoice.payment_failed':
        await this.handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;
      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
      case 'customer.subscription.deleted':
        await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
    }

    return { received: true };
  }

  private async handlePaymentSucceeded(invoice: Stripe.Invoice) {
    const subscriptionId = invoice.subscription as string;

    await this.supabase
      .from('subscriptions')
      .update({
        status: 'ACTIVE',
        current_period_start: new Date(invoice.period_start * 1000).toISOString(),
        current_period_end: new Date(invoice.period_end * 1000).toISOString(),
      })
      .eq('stripe_subscription_id', subscriptionId);

    // Create payment record
    await this.supabase.from('payments').insert({
      stripe_payment_id: invoice.payment_intent as string,
      amount: invoice.amount_paid / 100,
      currency: invoice.currency.toUpperCase(),
      status: 'COMPLETED',
      description: `Subscription payment - ${invoice.subscription}`,
    });
  }

  private async handlePaymentFailed(invoice: Stripe.Invoice) {
    const subscriptionId = invoice.subscription as string;

    await this.supabase
      .from('subscriptions')
      .update({ status: 'PAST_DUE' })
      .eq('stripe_subscription_id', subscriptionId);

    // Notify user
    const { data: sub } = await this.supabase
      .from('subscriptions')
      .select('user_id')
      .eq('stripe_subscription_id', subscriptionId)
      .single();

    if (sub) {
      await this.supabase.from('notifications').insert({
        user_id: sub.user_id,
        type: 'PAYMENT_FAILED',
        title: 'Payment Failed',
        message: 'Your subscription payment failed. Please update your payment method.',
      });
    }
  }

  private async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    const statusMap: Record<string, string> = {
      'active': 'ACTIVE',
      'canceled': 'CANCELLED',
      'incomplete': 'PAST_DUE',
      'incomplete_expired': 'UNPAID',
      'past_due': 'PAST_DUE',
      'trialing': 'TRIALING',
      'unpaid': 'UNPAID',
    };

    await this.supabase
      .from('subscriptions')
      .update({
        status: statusMap[subscription.status] || 'ACTIVE',
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end,
      })
      .eq('stripe_subscription_id', subscription.id);
  }

  private async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    await this.supabase
      .from('subscriptions')
      .update({ status: 'CANCELLED' })
      .eq('stripe_subscription_id', subscription.id);

    // Downgrade user to free plan
    const { data: sub } = await this.supabase
      .from('subscriptions')
      .select('user_id')
      .eq('stripe_subscription_id', subscription.id)
      .single();

    if (sub) {
      await this.supabase
        .from('users')
        .update({ plan: 'FREE' })
        .eq('id', sub.user_id);
    }
  }

  // Get plan limits
  private getPlanLimits(plan: string) {
    const limits: Record<string, any> = {
      free: { maxProjects: 3, maxBuildsPerMonth: 10, maxTeamMembers: 1, maxStorageGB: 1, aiCredits: 100 },
      starter: { maxProjects: 10, maxBuildsPerMonth: 50, maxTeamMembers: 3, maxStorageGB: 5, aiCredits: 500 },
      professional: { maxProjects: 50, maxBuildsPerMonth: 200, maxTeamMembers: 10, maxStorageGB: 20, aiCredits: 2000 },
      business: { maxProjects: -1, maxBuildsPerMonth: -1, maxTeamMembers: 50, maxStorageGB: 100, aiCredits: 10000 },
      enterprise: { maxProjects: -1, maxBuildsPerMonth: -1, maxTeamMembers: -1, maxStorageGB: -1, aiCredits: -1 },
    };
    return limits[plan.toLowerCase()] || limits.free;
  }

  // Create checkout session for AI credits
  async createCreditCheckout(userId: string, creditAmount: number) {
    const { data: user } = await this.supabase
      .from('users')
      .select('stripe_customer_id, email')
      .eq('id', userId)
      .single();

    const session = await this.stripe.checkout.sessions.create({
      customer: user?.stripe_customer_id,
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: `${creditAmount} AI Credits` },
          unit_amount: Math.round(creditAmount * 0.01 * 100), // $0.01 per credit
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/dashboard/billing?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/dashboard/billing?canceled=true`,
      metadata: { user_id: userId, credit_amount: creditAmount.toString() },
    });

    return session;
  }

  // Get user invoices
  async getInvoices(userId: string) {
    const { data: user } = await this.supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();

    if (!user?.stripe_customer_id) return [];

    const invoices = await this.stripe.invoices.list({
      customer: user.stripe_customer_id,
      limit: 50,
    });

    return invoices.data;
  }

  // Cancel subscription
  async cancelSubscription(subscriptionId: string) {
    await this.stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    await this.supabase
      .from('subscriptions')
      .update({ cancel_at_period_end: true })
      .eq('stripe_subscription_id', subscriptionId);

    return { success: true };
  }

  // Resume subscription
  async resumeSubscription(subscriptionId: string) {
    await this.stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    });

    await this.supabase
      .from('subscriptions')
      .update({ cancel_at_period_end: false })
      .eq('stripe_subscription_id', subscriptionId);

    return { success: true };
  }
}
