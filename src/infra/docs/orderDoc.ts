import { Order } from '@/domain/contracts/repos/order';
import { Route, Tags, Response, TsoaController, Get, Post, Body, Put, Delete, Path, Security } from '.'

@Route('/order')
export class CreateOrderDoc extends TsoaController {
  /**
   * @summary Rota para criação de um pedido
   */
  @Post()
  @Tags('Order')
  @Security('apiKey')
  @Response<{ orderId: string, status: string }>(201, 'Created')
  CreateOrder(@Body() _body: Order.InsertOrderInput): void {
    /* Documentation - Rout to create an order */
  }
}

@Route('/order/:orderId')
export class FindOrderDoc extends TsoaController {
  /**
   * @summary Rota para buscar um pedido
   */
  @Get()
  @Tags('Order')
  @Security('apiKey')
  @Response<Order.FindOrderOutput>(200, 'Ok')
  FindOrder(@Path() orderId: string): void {
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
  @Response<{ orderId: string, status: string }>(200, 'Ok')
  UpdateOrder(@Body() _body: Order.InsertOrderInput): void {
    /* Documentation - Rout to update an order */
  }
}

@Route('/order/:orderId')
export class DeleteOrderDoc extends TsoaController {
  /**
   * @summary Rota para deletar um pedido
   */
  @Delete()
  @Tags('Order')
  @Security('apiKey')
  @Response<Order.deleteOrderOutput>(200, 'Ok')
  DeleteOrder(@Path() orderId: string): void {
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
  @Response<{ orderId: string, status: string }>(200, 'Ok')
  UpdateOrderStatus(@Body() _body: Order.UpdateOrderStatusInput): void {
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
  @Response<Order.FindOrdersOutput>(200, 'Ok')
  FindAllOrders(): void {
    /* Documentation - Rout to find all orders */
  }
}
