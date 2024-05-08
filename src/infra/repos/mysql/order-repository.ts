import { MySQLRepository } from '@/infra/repos/mysql/repository'
import { Order } from '@/domain/contracts/repos'
import { EntityError } from '@/infra/errors'

export class OrderRepository extends MySQLRepository implements Order {

    constructor(
        private readonly  orderEntity: Order.GenericType,
        private readonly  productEntity: Order.GenericType,
        private readonly  orderProductEntity: Order.GenericType,
        private readonly ingredientProductEntity: Order.GenericType,
        private readonly categoryProductEntity: Order.GenericType
    ) { super() }

    getOrderEntity = () => new this.orderEntity()
    getOrderProductsEntity = () => new this.orderProductEntity()


    async findOrder ({ orderId }: Order.FindOrderInput): Promise<Order.FindOrderOutput> {
        const orderRepo = this.getRepository(this.orderEntity)
        const order = await orderRepo.findOne({ where: { orderId } })
        
        if (order !== null) return {
          orderId: order.orderId,
          createdAt: order.createdAt,
          client: order.client,
          orderProducts: order.orderProducts
        }
      }
    
      async insertOrder (orderData: Order.InsertOrderInput): Promise<Order.InsertOrderOutput> {
        try{
          const orderRepo = this.getRepository(this.orderEntity)
          const order = await orderRepo.insert(orderData)
          if (order !== null) {
            return {
                orderId: orderData.orderId,
                client: orderData.client,
                orderProducts: orderData.orderProducts
            }
          }
        }catch(error: any) {
          throw new EntityError(error.message)
        }
        
      }

      async findOrderProduct ({ orderProductId }: Order.FindOrderProductInput): Promise<Order.FindOrderProductOutput> {
        const orderRepo = this.getRepository(this.orderProductEntity)
        const orderProduct = await orderRepo.findOne({ where: { orderProductId } })
        
        if (orderProduct !== null) return {
          orderProductId: orderProduct.orderProductId,
          name: orderProduct.name,
          description: orderProduct.description,
          price: orderProduct.price,
          order: orderProduct.order
        }
      }
    
}


