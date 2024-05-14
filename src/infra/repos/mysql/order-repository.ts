import { MySQLRepository } from '@/infra/repos/mysql/repository'
import { Order } from '@/domain/contracts/repos'
import { EntityError } from '@/infra/errors'

export class OrderRepository extends MySQLRepository implements Order {

  constructor(
    private readonly orderEntity: Order.GenericType,
    private readonly productEntity: Order.GenericType,
    private readonly orderProductEntity: Order.GenericType,
    private readonly ingredientEntity: Order.GenericType,
    private readonly ingredientProductEntity: Order.GenericType,
    private readonly categoryEntity: Order.GenericType
  ) { super() }

  getOrderEntity = () => new this.orderEntity()
  getOrderProductsEntity = () => new this.orderProductEntity()
  getProductEntity = () => new this.productEntity()
  getOrderProductEntity = () => new this.orderProductEntity()
  getIngredientProductEntity = () => new this.ingredientProductEntity()
  getIngredientEntity = () => new this.ingredientEntity()
  getCategoryEntity = () => new this.categoryEntity()


  async findOrders(): Promise<Order.FindOrdersOutput> {
    try {
      const orderRepo = this.getRepository(this.orderEntity);

      const orders = await orderRepo.find({
        relations: [
          'client', // Relacionamento com ClientEntity
          'orderProducts', // Relacionamento com OrderProductEntity
          'orderProducts.product', // Para obter os produtos associados através do pivot
          'orderProducts.product.category', // Relacionamento com CategoryEntity
          'orderProducts.ingredientProducts',  // Relacionamento com IngredientProductEntity
          'orderProducts.ingredientProducts.ingredient' // Para obter os produtos associados através do pivot
        ],
      });

      if (orders !== null && orders.length > 0) {
        return orders.map(order => ({
          id: order.id,
          orderId: order.orderId,
          status: order.status,
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
            count: parseInt(op.count),
            category: {
              categoryId: op.product?.category.categoryId,
              name: op.product?.category.name
            },
            price: parseFloat(op.product?.price),
            ingredientProducts: op.ingredientProducts?.map((ip: Order.GenericType) => ({
              ingredientId: ip.ingredient?.ingredientProductId,
              name: ip.ingredient?.name,
              description: ip.ingredient?.description,
              count: parseInt(ip.count),
              price: parseFloat(ip.ingredient?.price)
            })),
          })),
        }))
      }
    } catch (error: any) {
      throw new EntityError(error.message)
    }
  }

  async findOrder({ orderId }: Order.FindOrderInput): Promise<Order.FindOrderOutput> {
    try {
      const orderRepo = this.getRepository(this.orderEntity);

      const order = await orderRepo.findOne({
        where: { orderId: orderId ??  '' },
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
          status: order.status,
          createdAt: order.createdAt,
          client: {
            clientId: order.client?.clientId,
            name: order.client?.name,
            cpf: order.client?.cpf,
            email: order.client?.email
          },
          orderProducts: order.orderProducts.map((op: Order.GenericType) => ({
            id: op.id,
            productId: op.product?.productId,
            name: op.product?.name,
            description: op.product?.description,
            count: parseInt(op.count),
            category: {
              categoryId: op.product?.category.categoryId,
              name: op.product?.category.name
            },
            price: parseFloat(op.product?.price),
            ingredientProducts: op.ingredientProducts?.map((ip: Order.GenericType) => ({
              id: ip.id,
              ingredientId: ip.ingredient?.ingredientProductId,
              name: ip.ingredient?.name,
              description: ip.ingredient?.description,
              count: ip.count,
              price: parseFloat(ip.ingredient?.price)
            })),
          })),
        };
      }
    } catch (error: any) {
      throw new EntityError(error.message)
    }
  }

  async saveOrder(orderData: Order.InsertOrderInput): Promise<Order.InsertOrderOutput> {
    try {
      const orderRepo = this.getRepository(this.orderEntity)
      const saveResult = await orderRepo.save(orderData)
      if (saveResult !== null) {
        return {
          id: saveResult.id,
          status: saveResult.status,
          orderId: orderData.orderId
        }
      }
    } catch (error: any) {
      throw new EntityError(error.message)
    }
  }

  async saveOrderProduct(orderProductData: Order.InsertOrderProductInput): Promise<Order.InsertOrderProductOutput> {
    try {
      const orderRepo = this.getRepository(this.orderProductEntity)
      //console.log(orderProductData)
      const existingOrderProduct = await orderRepo.findOne({
        where: {
          'order.id': orderProductData.order.id,
          'product.id': orderProductData.product.id
        }
      });
      //console.log(existingOrderProduct)
      if (!existingOrderProduct) {
        const orderProduct = await orderRepo.insert(orderProductData)
        if (orderProduct !== null) {
          return {
            id: orderProduct.raw.insertId,
            count: orderProductData.count,
            order: orderProductData.order,
            product: orderProductData.product
          }
        }
      }
      const orderProduct = await orderRepo.save({...existingOrderProduct, ...orderProductData})
      if (orderProduct !== null) {
        return {
          id: existingOrderProduct?.id,
          count: orderProductData.count,
          order: orderProductData.order,
          product: orderProductData.product
        }
      }
    } catch (error: any) {
      console.log(error)
      throw new EntityError(error.message)
    }

  }

  async saveIngredientProduct(ingredientProductData: Order.InsertIngredientProductInput): Promise<Order.InsertIngredientProductOutput> {
    try {
      const orderRepo = this.getRepository(this.ingredientProductEntity)
      const existingIngredientProduct = await orderRepo.findOne({
        where: {
          "ingredient.id": ingredientProductData.ingredient.id,
          "orderProduct.id": ingredientProductData.orderProduct.id
        }
      });
      if (!existingIngredientProduct) {
        const ingredientProduct = await orderRepo.insert(ingredientProductData)
        if (ingredientProduct !== null) {
          return {
            id: ingredientProduct.raw.insertId,
            count: ingredientProductData.count,
            ingredient: ingredientProductData.ingredient,
            orderProduct: ingredientProductData.orderProduct
          }
        }
      }
      const ingredientProduct = await orderRepo.save({ ...existingIngredientProduct, ...ingredientProductData })
      if (ingredientProduct !== null) {
        return {
          id: existingIngredientProduct?.id,
          count: ingredientProductData.count,
          ingredient: ingredientProductData.ingredient,
          orderProduct: ingredientProductData.orderProduct
        }
      }
    } catch (error: any) {
      throw new EntityError(error.message)
    }
  }

  async findProduct({ productId }: Order.FindProductInput): Promise<Order.FindProductOutput> {
    try {
      const orderRepo = this.getRepository(this.productEntity)
      const product = await orderRepo.findOne({ 
        where: { productId: productId ?? '' },
        relations: ['category']
      })

      if (product !== null) return {
        id: product.id,
        productId: product.productId,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category
      }
    } catch (error: any) {
      throw new EntityError(error.message)
    }
  }

  async findCategories(): Promise<Order.FindCategoriesOutput> {
    try {
      const orderRepo = this.getRepository(this.categoryEntity)
      const categories = await orderRepo.find({
        relations: [
          'products', // Relacionamento com ProductEntity
          'ingredients', // Relacionamento com IngredientEntity
        ],
      });

      if (categories !== null && categories.length > 0) {
        return categories.map(category => ({
          id: category.id,
          name: category.name,
          products: category.products,
          ingredients: category.ingredients
        }))
      }
    } catch (error: any) {
      throw new EntityError(error.message)
    }
  }

  async findIngredient({ ingredientId }: Order.FindIngredientInput): Promise<Order.FindIngredientOutput> {
    try {
      const orderRepo = this.getRepository(this.ingredientEntity)
      const ingredient = await orderRepo.findOne({ where: { ingredientId } })

      if (ingredient !== null) return {
        id: ingredient.id,
        ingredientId: ingredient.ingredientId,
        name: ingredient.name,
        description: ingredient.description,
        price: ingredient.price
      }
    } catch (error: any) {
      throw new EntityError(error.message)
    }
  }

  async deleteOrder(orderData: Order.FindOrderInput): Promise<Order.deleteOrderOutput> {
    try {
      const orderRepo = this.getRepository(this.orderEntity)
      const deleteResult = await orderRepo.delete({ orderId: orderData.orderId })
      if (deleteResult.affected !== 0) {
        return {
          orderId: orderData.orderId,
          affected: deleteResult.affected
        }
      }
    } catch (error: any) {
      throw new EntityError(error.message)
    }
  }

  async deleteOrderProduct(orderProductData: Partial<Order.InsertOrderProductInput>): Promise<Order.deleteOrderProductOutput> {
    try {
      const orderRepo = this.getRepository(this.orderProductEntity)
      const deleteResult = await orderRepo.delete({
        order: orderProductData.order,
        product: orderProductData.product
      })
      if (deleteResult.affected !== 0) {
        return {
          orderId: orderProductData.order.orderId,
          productId: orderProductData.product.productId,
          affected: deleteResult.affected
        }
      }
    } catch (error: any) {
      throw new EntityError(error.message)
    }
  }

  async deleteIngredientProduct(ingredientProductData: Partial<Order.InsertIngredientProductInput>): Promise<Order.deleteIngredientProductOutput> {
    try {
      const orderRepo = this.getRepository(this.ingredientProductEntity)
      const deleteResult = await orderRepo.delete({
        ingredient: ingredientProductData.ingredient,
        orderProduct: ingredientProductData.orderProduct
      })
      if (deleteResult.affected !== 0) {
        return {
          ingredientId: ingredientProductData.ingredient.ingredientId,
          orderProductId: ingredientProductData.orderProduct.orderProductId,
          affected: deleteResult.affected
        }
      }
    } catch (error: any) {
      throw new EntityError(error.message)
    }
  }
}


