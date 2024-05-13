import { MySQLRepository } from '@/infra/repos/mysql/repository'
import { Order } from '@/domain/contracts/repos'
import { EntityError } from '@/infra/errors'

export class OrderRepository extends MySQLRepository implements Order {

  constructor(
    private readonly orderEntity: Order.GenericType,
    private readonly productEntity: Order.GenericType,
    private readonly orderProductEntity: Order.GenericType,
    private readonly ingredientEntity: Order.GenericType,
    private readonly ingredientProductEntity: Order.GenericType
  ) { super() }

  getOrderEntity = () => new this.orderEntity()
  getOrderProductsEntity = () => new this.orderProductEntity()
  getProductEntity = () => new this.productEntity()
  getOrderProductEntity = () => new this.orderProductEntity()
  getIngredientProductEntity = () => new this.ingredientProductEntity()
  getIngredientEntity = () => new this.ingredientEntity()

  async findOrder({ orderId }: Order.FindOrderInput): Promise<Order.FindOrderOutput> {
    const orderRepo = this.getRepository(this.orderEntity);

    const order = await orderRepo.findOne({
      where: { orderId },
      relations: [
        'client', // Relacionamento com ClientEntity
        'orderProducts', // Relacionamento com OrderProductEntity
        'orderProducts.product', // Para obter os produtos associados através do pivot
        'orderProducts.product.category', // Relacionamento com CategoryEntity
        'orderProducts.ingredientProducts',  // Relacionamento com IngredientProductEntity
        'orderProducts.ingredientProducts.ingredient' // Para obter os produtos associados através do pivot
      ],
    });

    if (order !== null) {
      return {
        id: order.id,
        orderId: order.orderId,
        createdAt: order.createdAt,
        client: {
          clientId: order.client?.clientId,
          name: order.client?.name,
          cpf: order.client?.cpf,
          email: order.client?.email
        },
        orderProducts: order.orderProducts.map((op: Order.GenericType) => ({
          productId: op.product?.productId, 
          name: op.product?.name, 
          description: op.product?.description,
          category: {
            categoryId: op.product?.category.categoryId,
            name: op.product?.category.name
          },
          price: op.product?.price,
          ingredientProducts: op.ingredientProducts?.map((ip: Order.GenericType) => ({
            ingredientId: ip.ingredient?.ingredientProductId,
            name: ip.ingredient?.name,
            description: ip.ingredient?.description,
            price: ip.ingredient?.price
          })),
        })),
      };
    }
  }

  async insertOrder(orderData: Order.InsertOrderInput): Promise<Order.InsertOrderOutput> {
    try {
      const orderRepo = this.getRepository(this.orderEntity)
      const order = await orderRepo.insert(orderData)
      if (order.raw.insertId) {
        return {
          id: order.raw.insertId,
          orderId: orderData.orderId
        }
      }
    } catch (error: any) {
      throw new EntityError(error.message)
    }

  }

  async insertProductOrder(productOrderData: Order.InsertProductOrderInput): Promise<Order.InsertProductOrderOutput> {
    try {
      const orderRepo = this.getRepository(this.orderProductEntity)
      const order = await orderRepo.insert(productOrderData)
      if (order.raw.insertId) {
        return {
          id: order.raw.insertId,
          orderId: productOrderData.order.orderId,
          productId: productOrderData.product.productId
        }
      }
    } catch (error: any) {
      throw new EntityError(error.message)
    }

  }

  async insertIngredientProduct(ingredientProductData: Order.InsertIngredientProductInput): Promise<Order.InsertIngredientProductOutput> {
    try {
      const orderRepo = this.getRepository(this.ingredientProductEntity)
      const order = await orderRepo.insert(ingredientProductData)
      if (order.raw.insertId) {
        return {
          id: order.raw.insertId,
          ingredientId: ingredientProductData.ingredient.ingredientId,
          orderProductId: ingredientProductData.orderProduct.id
        }
      }
    } catch (error: any) {
      throw new EntityError(error.message)
    }

  }

  async findProduct({ productId }: Order.FindProductInput): Promise<Order.FindProductOutput> {
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

  async findIngredient({ ingredientId }: Order.FindIngredientInput): Promise<Order.FindIngredientOutput> {
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


