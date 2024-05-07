import { MySQLRepository } from '@/infra/repos/mysql/repository'
import { Order } from '@/domain/contracts/repos'
import { EntityError } from '@/infra/errors'

export class OrderRepository extends MySQLRepository implements Order {

    constructor(
        private readonly  orderEntity: Order.GenericType,
        private readonly  orderItemEntity: Order.GenericType,
        private readonly ingredientItemEntity: Order.GenericType,
        private readonly categoryItemEntity: Order.GenericType
    ) { super() }


    async findOrder ({ orderId }: Order.FindOrderInput): Promise<Order.FindOrderOutput> {
        const clientRepo = this.getRepository(this.orderEntity)
        const order = await clientRepo.findOne({ where: { orderId } })
        
        if (order !== null) return {
          orderId: order.orderId,
          createdAt: order.createdAt,
          client: order.client,
          orderItems: order.orderItems
        }
      }
    
      async insertOrder (orderData: Order.InsertOrderInput): Promise<Order.InsertOrderOutput> {
        try{
          const clientRepo = this.getRepository(this.orderEntity)
          const order = await clientRepo.insert(orderData)
          if (order !== null) {
            return {
                orderId: orderData.orderId,
                client: orderData.client,
                orderItems: orderData.orderItems
            }
          }
        }catch(error: any) {
          throw new EntityError(error.message)
        }
        
      }
    
      getOrderEntity = () => new this.orderEntity()

}


