import { OrderHttp } from '@/domain/contracts/gateways';
import { Route, Tags, Response, TsoaController, Get, Post, Body, Put, Delete, Path, Security, Query } from '.'

@Route('/order')
export class CreateOrderDoc extends TsoaController {
  /**
   * @summary Rota para criação de um pedido
   */
  @Post()
  @Tags('Order')
  @Security('apiKey')
  @Response<OrderHttp.CreateOrderOutput>(201, 'Created')
  CreateOrder(@Body() _body: OrderHttp.CreateOrderInput): void {
    /* Documentation - Rout to create an order */
  }
}

@Route('/order')
export class FindOrderDoc extends TsoaController {
  /**
   * @summary Rota para buscar um pedido
   */
  @Get()
  @Tags('Order')
  @Security('apiKey')
  @Response<OrderHttp.GetOrderOutput>(200, 'Ok')
  FindOrder(@Query('orderId') _orderId: string): void {
    /* Documentation - Rout to find an order */
  }
}

@Route('/order')
export class UpdateOrderDoc extends TsoaController {
  /**
   * @summary Rota para atualizar o pedido
   */
  @Put()
  @Tags('Order')
  @Security('apiKey')
  @Response<OrderHttp.UpdateOrderOutput>(200, 'Ok')
  UpdateOrder(@Body() _body: OrderHttp.UpdateOrderInput): void {
    /* Documentation - Rout to update an order */
  }
}

@Route('/order')
export class DeleteOrderDoc extends TsoaController {
  /**
   * @summary Rota para deletar um pedido
   */
  @Delete()
  @Tags('Order')
  @Security('apiKey')
  @Response<OrderHttp.DeleteOrderOutput>(200, 'Ok')
  DeleteOrder(@Query('orderId') _orderId: string): void {
    /* Documentation - Rout to delete an order */
  }
}

@Route('/order-status')
export class UpdateOrderStatusDoc extends TsoaController {
  /**
   * @summary Rota para atualizar o status do pedido
   */
  @Put()
  @Tags('Order')
  @Security('apiKey')
  @Response<OrderHttp.UpdateOrderStatusInput>(200, 'Ok')
  UpdateOrderStatus(@Body() _body: OrderHttp.UpdateOrderStatusInput): void {
    /* Documentation - Rout to update order status */
  }
}

@Route('/orders')
export class FindAllOrdersDoc extends TsoaController {
  /**
   * @summary Rota para buscar todos os pedidos
   */
  @Get()
  @Tags('Orders')
  @Security('apiKey')
  @Response<OrderHttp.GetOrderOutput[]>(200, 'Ok')
  FindAllOrders(): void {
    /* Documentation - Rout to find all orders */
  }
}
