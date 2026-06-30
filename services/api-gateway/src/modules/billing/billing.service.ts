import { Injectable, BadRequestException } from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class BillingService {
  private stripe: Stripe;

  constructor(private readonly prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'mock-key', {
      apiVersion: '2024-06-20' as any,
    });
  }

  async createCustomer(userId: string, email: string, name?: string) {
    const customer = await this.stripe.customers.create({
      email,
      name: name || email,
      metadata: { user_id: userId },
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: { stripeCustomerId: customer.id },
    });

    return customer;
  }

  async createSubscription(userId: string, priceId: string, plan: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    let customerId = user.stripeCustomerId;

    if (!customerId) {
      const customer = await this.createCustomer(userId, user.email, user.name || undefined);
      customerId = customer.id;
    }

    const subscription = await this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
      metadata: { user_id: userId, plan },
    });

    const limits = this.getPlanLimits(plan);

    await this.prisma.subscription.create({
      data: {
        userId,
        plan: plan.toUpperCase() as any,
        status: 'ACTIVE',
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: customerId,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        usageLimits: limits,
      },
    });

    return {
      subscriptionId: subscription.id,
      clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
    };
  }

  async handleWebhook(payload: Buffer, signature: string) {
    const event = this.stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || 'mock-secret'
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

    const sub = await this.prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscriptionId },
    });

    if (sub) {
      await this.prisma.subscription.update({
        where: { id: sub.id },
        data: {
          status: 'ACTIVE',
          currentPeriodStart: new Date(invoice.period_start * 1000),
          currentPeriodEnd: new Date(invoice.period_end * 1000),
        },
      });

      await this.prisma.payment.create({
        data: {
          userId: sub.userId!,
          stripePaymentId: invoice.payment_intent as string,
          amount: invoice.amount_paid / 100,
          currency: invoice.currency.toUpperCase(),
          status: 'COMPLETED',
          description: `Subscription payment - ${invoice.subscription}`,
        },
      });
    }
  }

  private async handlePaymentFailed(invoice: Stripe.Invoice) {
    const subscriptionId = invoice.subscription as string;

    const sub = await this.prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscriptionId },
    });

    if (sub) {
      await this.prisma.subscription.update({
        where: { id: sub.id },
        data: { status: 'INACTIVE' },
      });

      await this.prisma.notification.create({
        data: {
          userId: sub.userId!,
          type: 'BUILD_FAILED', // Reusing matching notification structure or custom type
          title: 'Payment Failed',
          message: 'Your subscription payment failed. Please update your payment method.',
        },
      });
    }
  }

  private async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    const sub = await this.prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscription.id },
    });

    if (sub) {
      await this.prisma.subscription.update({
        where: { id: sub.id },
        data: {
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
        },
      });
    }
  }

  private async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    const sub = await this.prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscription.id },
    });

    if (sub) {
      await this.prisma.subscription.update({
        where: { id: sub.id },
        data: { status: 'INACTIVE' },
      });

      await this.prisma.user.update({
        where: { id: sub.userId! },
        data: { plan: 'FREE' },
      });
    }
  }

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

  async createCreditCheckout(userId: string, creditAmount: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    const session = await this.stripe.checkout.sessions.create({
      customer: user?.stripeCustomerId || undefined,
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: `${creditAmount} AI Credits` },
          unit_amount: Math.round(creditAmount * 0.01 * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard/billing?success=true`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard/billing?canceled=true`,
      metadata: { user_id: userId, credit_amount: creditAmount.toString() },
    });

    return session;
  }

  async getInvoices(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user?.stripeCustomerId) return [];

    const invoices = await this.stripe.invoices.list({
      customer: user.stripeCustomerId,
      limit: 50,
    });

    return invoices.data;
  }

  async cancelSubscription(subscriptionId: string) {
    await this.stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    await this.prisma.subscription.update({
      where: { stripeSubscriptionId: subscriptionId },
      data: { cancelAtPeriodEnd: true },
    });

    return { success: true };
  }

  async resumeSubscription(subscriptionId: string) {
    await this.stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    });

    await this.prisma.subscription.update({
      where: { stripeSubscriptionId: subscriptionId },
      data: { cancelAtPeriodEnd: false },
    });

    return { success: true };
  }
}
