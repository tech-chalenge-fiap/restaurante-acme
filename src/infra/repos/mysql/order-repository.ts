import { MySQLRepository } from '@/infra/repos/mysql/repository'
import { Order } from '@/domain/contracts/repos'
import { EntityError } from '@/infra/errors'

export class OrderRepository extends MySQLRepository implements Order {

    constructor(
        private readonly  orderEntity: Order.GenericType,
        private readonly  productEntity: Order.GenericType,
        private readonly  orderProductEntity: Order.GenericType,
        private readonly ingredientEntity: Order.GenericType,
        private readonly ingredientProductEntity: Order.GenericType
    ) { super() }

    getOrderEntity = () => new this.orderEntity()
    getOrderProductsEntity = () => new this.orderProductEntity()
    getProductEntity = () => new this.productEntity()
    getOrderProductEntity = () => new this.orderProductEntity()
    getIngredientProductEntity = () => new this.ingredientProductEntity()
    getIngredientEntity = () => new this.ingredientEntity()

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
          if (order.raw.insertId) {
            return {
                id: order.raw.insertId,
                orderId: orderData.orderId
            }
          }
        }catch(error: any) {
          throw new EntityError(error.message)
        }
        
      }

      async insertProductOrder (productOrderData: Order.InsertProductOrderInput): Promise<Order.InsertProductOrderOutput> {
        try{
          const orderRepo = this.getRepository(this.orderProductEntity)
          const order = await orderRepo.insert(productOrderData)
          if (order.raw.insertId) {
            return {
                id: order.raw.insertId, 
                orderId: productOrderData.order.orderId,
                productId: productOrderData.product.productId
            }
          }
        }catch(error: any) {
          throw new EntityError(error.message)
        }
        
      }

      async insertIngredientProduct (ingredientProductData: Order.InsertIngredientProductInput): Promise<Order.InsertIngredientProductOutput> {
        try{
          const orderRepo = this.getRepository(this.ingredientProductEntity)
          const order = await orderRepo.insert(ingredientProductData)
          if (order.raw.insertId) {
            return {
                id: order.raw.insertId, 
                ingredientId: ingredientProductData.ingredient.ingredientId,
                orderProductId: ingredientProductData.orderProduct.id
            }
          }
        }catch(error: any) {
          throw new EntityError(error.message)
        }
        
      }

      async findProduct ({ productId }: Order.FindProductInput): Promise<Order.FindProductOutput> {
        const orderRepo = this.getRepository(this.productEntity)
        const product = await orderRepo.findOne({ where: { productId } })
        
        if (product !== null) return {
          id: product.id,
          productId: product.productId,
          name: product.name,
          description: product.description,
          price: product.price
        }
      }

      async findIngredient ({ ingredientId }: Order.FindIngredientInput): Promise<Order.FindIngredientOutput> {
        const orderRepo = this.getRepository(this.ingredientEntity)
        const ingredient = await orderRepo.findOne({ where: { ingredientId } })
        
        if (ingredient !== null) return {
          id: ingredient.id,
          ingredientId: ingredient.ingredientId,
          name: ingredient.name,
          description: ingredient.description,
          price: ingredient.price
        }
      }

}


