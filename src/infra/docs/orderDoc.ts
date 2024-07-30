import { OrderHttp } from '@/domain/contracts/gateways';
import { Route, Tags, Response, TsoaController, Get, Post, Body, Put, Delete, Path, Security, Query } from '.';
import { Example } from 'tsoa';

@Route('/order')
export class CreateOrderDoc extends TsoaController {
  /**
   * @summary Rota para criação de um pedido
   */
  @Post()
  @Example({
    "clientId": "66744e31-896b-43cd-8173-ee07ace7ea17",
    "orderProducts": [
      {
        "productId": "e8f3805b-2781-4f78-bda8-6f874055f65a",
        "count": 1
      },
      {
        "productId": "5bcf2ee7-9745-4c75-84c1-b32121c558a9",
        "count": 2,
        "ingredientProducts": [
          {
            "ingredientId": "9da47fc2-a4b3-4f68-aeec-2533fa77797d",
            "count": 1
          },
          {
            "ingredientId": "39ae382a-7e49-43a2-84fb-4360e793f270",
            "count": 2
          }
        ]
      }
    ]
  })
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
  @Example({
    "orderId": "0c76844d-3ec3-4ed6-8d61-1d415cf80c68",
    "orderProducts": [
      {
        "productId": "e8f3805b-2781-4f78-bda8-6f874055f65a",
        "count": 1
      },
      {
        "productId": "537c4a15-8b7c-4cfa-bf46-59d6024b9178",
        "count": 1,
        "ingredientProducts": [
          {
            "ingredientId": "b7e93649-63c9-4956-acef-0582d4f12c56",
            "count": 1
          },
          {
            "ingredientId": "1bc2164a-6244-4574-87af-325b8854f364",
            "count": 1000
          }
        ]
      }
    ]
  })
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
  @Example({
    "orderId": "0c76844d-3ec3-4ed6-8d61-1d415cf80c68",
    "status": "Em Preparação"
  })
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

@Route('/webhook')
export class UpdatePaymentStatusDoc extends TsoaController {
  /**
   * @summary Rota para atualizar o status do pagamento
   */
  @Post()
  @Tags('Payment')
  @Security('apiKey')
  @Response<OrderHttp.UpdatePaymentStatusOutput>(200, 'Ok')
  UpdatePaymentStatus(@Body() _body: OrderHttp.UpdatePaymentStatusInput): void {
    /* Documentation - Rout to update payment status */
  }
}
