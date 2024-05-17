import { Order } from '@/domain/contracts/repos/order';
import { Route, Tags, Response, TsoaController, Get, Post, Body, Query, Security } from '.'
import { Example } from 'tsoa';

@Route('/checkout')
export class CreateCheckoutDoc extends TsoaController {
  /**
   * @summary Rota para criação do checkout
   */
  @Post()
  @Example({
    orderId: '7e57d004-2b97-4c3c-b9f9-67647ad1a1f8',
    paymentId: '3f29bc1c-547b-4f57-9fbc-f2e9a1a2b67a',
    status: 'created'

  })
  @Tags('Checkout')
  @Security('apiKey')
  @Response<{ orderId: string, status: string, paymentId: string }>(201, 'Created')
  CreateOrder(@Body() _body: Order.CreatePaymentInput): void {
    /* Documentation - Rout to create checkout */
  }
}

@Route('/checkout')
export class GetCheckoutDoc extends TsoaController {
  /**
   * @summary Rota para obter um checkout
   */
  @Get()
  @Tags('Checkout')
  @Security('apiKey')
  @Response<Order.FindPaymentOutput>(200, 'Ok')
  FindOrder(@Query('paymentId') _paymentId: string): void {
    /* Documentation - Rout to get a checkout */
  }
}
