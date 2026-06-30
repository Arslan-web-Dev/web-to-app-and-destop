import { Controller, Post, Get, Body, Headers, Req, Res, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { BillingService } from './billing.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../modules/auth/decorators/current-user.decorator';

@ApiTags('Billing')
@Controller({ path: 'billing', version: '1' })
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('checkout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create subscription checkout session' })
  async createCheckout(
    @CurrentUser() user: any,
    @Body('priceId') priceId: string,
    @Body('plan') plan: string,
  ) {
    return this.billingService.createSubscription(user.sub, priceId, plan);
  }

  @Post('credits/checkout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create AI credits checkout session' })
  async createCreditCheckout(
    @CurrentUser() user: any,
    @Body('creditAmount') creditAmount: number,
  ) {
    return this.billingService.createCreditCheckout(user.sub, creditAmount);
  }

  @Get('invoices')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user invoices' })
  async getInvoices(@CurrentUser() user: any) {
    return this.billingService.getInvoices(user.sub);
  }

  @Post('cancel')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancel subscription' })
  async cancelSubscription(
    @CurrentUser() user: any,
    @Body('subscriptionId') subscriptionId: string,
  ) {
    return this.billingService.cancelSubscription(subscriptionId);
  }

  @Post('resume')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Resume subscription' })
  async resumeSubscription(
    @CurrentUser() user: any,
    @Body('subscriptionId') subscriptionId: string,
  ) {
    return this.billingService.resumeSubscription(subscriptionId);
  }

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Stripe webhook handler' })
  async handleWebhook(
    @Req() req: Request,
    @Headers('stripe-signature') signature: string,
  ) {
    const payload = Buffer.from(JSON.stringify(req.body));
    return this.billingService.handleWebhook(payload, signature);
  }
}
