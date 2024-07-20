import { MySQLRepository, Not } from '@/infra/repos/mysql/repository'
import { Order } from '@/domain/contracts/repos'
import { EntityError } from '@/infra/errors'
import { OrderStatus } from './entities'
export class OrderRepository extends MySQLRepository implements Order {

  constructor(
    private readonly orderEntity: Order.GenericType,
    private readonly productEntity: Order.GenericType,
    private readonly orderProductEntity: Order.GenericType,
    private readonly ingredientEntity: Order.GenericType,
    private readonly ingredientProductEntity: Order.GenericType,
    private readonly categoryEntity: Order.GenericType,
    private readonly paymentEntity: Order.GenericType
  ) { super() }

  getOrderEntity = () => new this.orderEntity()
  getOrderProductsEntity = () => new this.orderProductEntity()
  getProductEntity = () => new this.productEntity()
  getOrderProductEntity = () => new this.orderProductEntity()
  getIngredientProductEntity = () => new this.ingredientProductEntity()
  getIngredientEntity = () => new this.ingredientEntity()
  getCategoryEntity = () => new this.categoryEntity()
  getPaymentEntity = () => new this.paymentEntity()


  async findOrders(): Promise<Order.FindOrderOutput[] | undefined> {
    try {
      const orderRepo = this.getRepository(this.orderEntity);

      const orders = await orderRepo.find({
        where: {
          status: Not(OrderStatus.FINALIZADO)
        },
        relations: [
          'client', // Relacionamento com ClientEntity
          'payments', // Relacionamento com PaymentEntity
          'orderProducts', // Relacionamento com OrderProductEntity
          'orderProducts.product', // Para obter os produtos associados através do pivot
          'orderProducts.product.category', // Relacionamento com CategoryEntity
          'orderProducts.ingredientProducts',  // Relacionamento com IngredientProductEntity
          'orderProducts.ingredientProducts.ingredient' // Para obter os produtos associados através do pivot
        ],
      });

      if (orders !== null && orders.length > 0) {
        // Set the priority of the orders to be displayed in the dashboard, and then sort them by createdAt
        return [OrderStatus.PRONTO, OrderStatus.EM_PREPARACAO, OrderStatus.RECEBIDO].flatMap((status) => {
          return orders
            .filter(order => order.status === status)
            .sort((a, b) => a.createdAt - b.createdAt)
            .map(order => ({
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
                  ingredientId: ip.ingredient?.ingredientId,
                  name: ip.ingredient?.name,
                  description: ip.ingredient?.description,
                  count: parseInt(ip.count),
                  price: parseFloat(ip.ingredient?.price)
                })),
              })),
              payments: order.payments?.map((pay: Order.GenericType) => ({
                id: pay.id,
                paymentId: pay.paymentId,
                totalPrice: parseFloat(pay.totalPrice),
                paymentMethod: pay.paymentMethod,
                status: pay.status
              }))
            }))
        })
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
          'payments', // Relacionamento com PaymentEntity
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
              ingredientId: ip.ingredient?.ingredientId,
              name: ip.ingredient?.name,
              description: ip.ingredient?.description,
              count: ip.count,
              price: parseFloat(ip.ingredient?.price)
            })),
          })),
          payments: order.payments?.map((pay: Order.GenericType) => ({
            id: pay.id,
            paymentId: pay.paymentId,
            totalPrice: parseFloat(pay.totalPrice),
            paymentMethod: pay.paymentMethod,
            status: pay.status
          }))
        };
      }
    } catch (error: any) {
      throw new EntityError(error.message)
    }
  }

  async saveOrder(orderData: Order.InsertOrderInput): Promise<Order.InsertOrderOutput> {
    try {
      const orderRepo = this.getRepository(this.orderEntity)
      console.log(orderData)
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

  async savePayment(paymentData: Order.InsertPaymentInput): Promise<Order.InsertPaymentOutput> {
    try {
      const paymentRepo = this.getRepository(this.paymentEntity)

      const saveResult = await paymentRepo.save(paymentData)

      if (saveResult !== null) {
        return {
          id: saveResult.id,
          status: paymentData.status,
          paymentId: paymentData.paymentId,
          totalPrice: paymentData.totalPrice
        }
      }
    } catch (error: any) {
      throw new EntityError(error.message)
    }
  }

  async findPayment({ paymentId }: Order.FindPaymentInput): Promise<Order.FindPaymentOutput> {
    try {
      const paymentRepo = this.getRepository(this.paymentEntity);

      const paymentOrder = await paymentRepo.findOne({
        where: { paymentId: paymentId ??  '' },
        relations: [
          'order', // Relacionamento com OrderEntit
        ],
      });

      if (paymentOrder !== null) {
        return {
          id: paymentOrder.id,
          paymentId: paymentOrder.paymentId,
          status: paymentOrder.status,
          totalPrice: parseFloat(paymentOrder.totalPrice),
          paymentMethod: paymentOrder.paymentMethod,
          pixUrl: paymentOrder.pixUrl,
          pixCode: paymentOrder.pixCode,
          expirationDate: paymentOrder.expirationDate,
          order: paymentOrder.order
        };
      }
    } catch (error: any) {
      throw new EntityError(error.message)
    }
  }

  async saveOrderProduct(orderProductData: Order.InsertOrderProductInput): Promise<Order.InsertOrderProductOutput> {
    try {
      const orderProductRepo = this.getRepository(this.orderProductEntity)

      const existingOrderProduct = await orderProductRepo.findOne({
        where: {
          'order.id': orderProductData.order.id,
          'product.id': orderProductData.product.id
        }
      });

      if (!existingOrderProduct) {
        const orderProduct = await orderProductRepo.insert(orderProductData)
        if (orderProduct !== null) {
          return {
            id: orderProduct.raw.insertId,
            count: orderProductData.count,
            order: orderProductData.order,
            product: orderProductData.product
          }
        }
      }

      const orderProduct = await orderProductRepo.save({...existingOrderProduct, ...orderProductData})

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
      const ingredientProductRepo = this.getRepository(this.ingredientProductEntity)

      const existingIngredientProduct = await ingredientProductRepo.findOne({
        where: {
          "ingredient.id": ingredientProductData.ingredient.id,
          "orderProduct.id": ingredientProductData.orderProduct.id
        }
      });

      if (!existingIngredientProduct) {
        const ingredientProduct = await ingredientProductRepo.insert(ingredientProductData)
        if (ingredientProduct !== null) {
          return {
            id: ingredientProduct.raw.insertId,
            count: ingredientProductData.count,
            ingredient: ingredientProductData.ingredient,
            orderProduct: ingredientProductData.orderProduct
          }
        }
      }

      const ingredientProduct = await ingredientProductRepo.save({ ...existingIngredientProduct, ...ingredientProductData })

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
      const productRepo = this.getRepository(this.productEntity)

      const product = await productRepo.findOne({
        where: { productId: productId ?? '' },
        relations: ['category']
      })

      if (product !== null) return {
        id: product.id,
        productId: product.productId,
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        category: product.category
      }
    } catch (error: any) {
      throw new EntityError(error.message)
    }
  }

  async findCategories(): Promise<Order.FindCategoriesOutput> {
    try {
      const categoryRepo = this.getRepository(this.categoryEntity)

      const categories = await categoryRepo.find({
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
      const ingredientRepo = this.getRepository(this.ingredientEntity)

      const ingredient = await ingredientRepo.findOne({ where: { ingredientId: ingredientId ?? '' } })

      if (ingredient !== null) return {
        id: ingredient.id,
        ingredientId: ingredient.ingredientId,
        name: ingredient.name,
        description: ingredient.description,
        price: parseFloat(ingredient.price)
      }
    } catch (error: any) {
      throw new EntityError(error.message)
    }
  }

  async deleteOrder(orderData: Order.FindOrderInput): Promise<Order.DeleteOrderOutput> {
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

  async deleteOrderProduct(orderProductData: Partial<Order.InsertOrderProductInput>): Promise<Order.DeleteOrderProductOutput> {
    try {
      const orderProductRepo = this.getRepository(this.orderProductEntity)

      const deleteResult = await orderProductRepo.delete({
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

  async deleteIngredientProduct(ingredientProductData: Partial<Order.InsertIngredientProductInput>): Promise<Order.DeleteIngredientProductOutput> {
    try {
      const ingredientProductRepo = this.getRepository(this.ingredientProductEntity)

      const deleteResult = await ingredientProductRepo.delete({
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


