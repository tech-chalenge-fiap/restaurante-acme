import { OrderRepository, RegisterRepository } from '@/infra/repos/mysql'
import { badRequest, HttpResponse, notFound, ok, serverError } from '@/application/helpers'
import { Order } from '@/domain/contracts/repos'
import { TokenHandler } from '@/infra/gateways'
import { Validator } from '@/application/validation'
import { EntityError } from '@/infra/errors'

export class OrderController {
  constructor(
    private readonly validator: Validator,
    private readonly tokenHandler: TokenHandler,
    private readonly registerRepo: RegisterRepository,
    readonly orderRepo: OrderRepository
  ) { }

  async handleGetOrder(httpRequest: Order.GenericType): Promise<HttpResponse> {
    try {
      return await this.getOrder(httpRequest)
    } catch (error) {
      return serverError(error)
    }
  }

  async handleCreateOrder(orderData: Order.InsertOrderInput): Promise<HttpResponse> {
    const orderEntity = Object.assign(this.orderRepo.getOrderEntity(), orderData);
    const errors = await this.validator.validate(orderEntity)
    if (errors.length !== 0) return badRequest(new Error(JSON.stringify(errors)))

    const client = await this.registerRepo.findClientById({ clientId: orderData.client })
    if (client) {
      orderEntity.client = Object.assign(this.registerRepo.getClientEntity(), client)
    }

    if (orderData.orderProducts) {
      const orderProducts: Order.GenericType[] = []
      for (const orderProductId of orderData.orderProducts) {
        const orderProductEntity = await this.orderRepo.findOrderProduct({ orderProductId })
        if (!orderProductEntity) return badRequest(new Error(`Cant create Order: ordemProduct ${orderProductId} not found`))
        orderProductEntity.order = orderEntity;
        orderProducts.push(orderProductEntity)
      }
      orderEntity.orderProducts = orderProducts
    }

    try {
      return await this.createOrder(orderEntity)
    } catch (error) {
      if (error instanceof EntityError) return badRequest(new Error(error.message))
      return serverError(error)
    }
  }

  async getOrder({ orderId }: Order.FindOrderInput): Promise<HttpResponse<Order.FindOrderOutput | Error>> {
    const order = await this.orderRepo.findOrder({ orderId })
    if (order === undefined) return notFound()
    return ok(order)
  }

  async createOrder(orderData: Order.InsertOrderInput): Promise<HttpResponse<Order.InsertOrderOutput | Error>> {
    if(!orderData.orderId) orderData.orderId = this.tokenHandler.generateUuid()
  
    const order = await this.orderRepo.insertOrder(orderData)
    if (order === undefined) return badRequest(new Error('Cant insert order'))
    return ok({ orderId: order.orderId, client: order.client, orderProducts: order.orderProducts })
  }

}
