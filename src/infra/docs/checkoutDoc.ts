import { OrderHttp } from '@/domain/contracts/gateways';
import { Route, Tags, Response, TsoaController, Get, Post, Body, Query, Security } from '.'
import { Example } from 'tsoa';

@Route('/checkout')
export class CreateCheckoutDoc extends TsoaController {
  /**
   * @summary Rota para criação do checkout
   */
  @Post()
  @Example({
    "paymentMethod": "PIX",
    "orderId": "0c76844d-3ec3-4ed6-8d61-1d415cf80c68"
  })
  @Tags('Checkout')
  @Security('apiKey')
  @Response<OrderHttp.CreateCheckoutOutput>(201, 'Created')
  CreateOrder(@Body() _body: OrderHttp.CreateCheckoutInput): void {
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
  @Response<OrderHttp.GetPaymentOutput>(200, 'Ok')
  FindOrder(@Query('paymentId') _paymentId: string): void {
    /* Documentation - Rout to get a checkout */
  }
}
