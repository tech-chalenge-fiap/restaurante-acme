import { OrderRepository, RegisterRepository } from '@/infra/repos/mysql'
import { badRequest, HttpResponse, notFound, ok, serverError } from '@/application/helpers'
import { Order } from '@/domain/contracts/repos'
import { TokenHandler } from '@/infra/gateways'
import { Validator } from '@/application/validation'
import { EntityError, TransactionError } from '@/infra/errors'
import { OrderService } from '@/domain/contracts/services/order-service'

export class OrderController {
  constructor(
    private readonly validator: Validator,
    private readonly tokenHandler: TokenHandler,
    private readonly registerRepo: RegisterRepository,
    private readonly orderRepo: OrderRepository,
    private readonly orderService: OrderService
  ) { }

  async handleGetOrders(): Promise<HttpResponse> {
    try {
      return await this.getOrders()
    } catch (error) {
      return serverError(error)
    }
  }


  async getOrders(): Promise<HttpResponse<Order.FindOrdersOutput | Error>> {
    const orders = await this.orderRepo.findOrders()
    if (orders === undefined) return notFound()
    return ok(this.orderService.calculateOrderValues(orders))
  }

  async handleGetOrder(httpRequest: Order.GenericType): Promise<HttpResponse> {
    try {
      return await this.getOrder(httpRequest)
    } catch (error) {
      return serverError(error)
    }
  }

  async getOrder({ orderId }: Order.FindOrderInput): Promise<HttpResponse<Order.FindOrderOutput | Error>> {
    const order = await this.orderRepo.findOrder({ orderId })
    if (order === undefined) return notFound()
    return ok(this.orderService.calculateOrderValue(order))
  }


  async handleUpdateOrder(orderData: Order.InsertOrderInput): Promise<HttpResponse> {

    await this.orderRepo.prepareTransaction()

    // Verificação básica para garantir que temos orderId para alterar o pedido
    if (!orderData.orderId) {
      return badRequest(new Error('Cannot update order: orderId not found'));
    }

    // Verificação básica para garantir que temos produtos para criar o pedido
    if (!orderData.orderProducts || orderData.orderProducts.length === 0) {
      return badRequest(new Error('Cannot update order: orderProducts not found'));
    }

    await this.orderRepo.openTransaction()

    try {
          // Cria a entidade de pedido
    const order = await this.orderRepo.findOrder({ orderId: orderData.orderId });

    if (!order) {
      return badRequest(new Error(`Order with ID ${orderData.orderId} not found`))
    }

      // Processa os produtos associados ao pedido
      for (const orderProductData of orderData.orderProducts) {
        const productEntity = await this.orderRepo.findProduct({ productId: orderProductData.productId });

        if (!productEntity) {
          throw new TransactionError(new Error(`Product with ID ${orderProductData.productId} not found`))
        }

        const orderProductEntity = this.orderRepo.getOrderProductEntity();
        orderProductEntity.product = Object.assign(this.orderRepo.getProductEntity(), productEntity);
        orderProductEntity.count = orderProductData.count;
        orderProductEntity.order = Object.assign(this.orderRepo.getOrderEntity(), order);

        if (orderProductEntity.count === 0) {
          await this.orderRepo.deleteOrderProduct(orderProductEntity)
          continue;
        }

        const orderProduct = await this.createOrderProduct(orderProductEntity)

        // Processa os ingredientes associados ao produto do pedido
        if (orderProductData.ingredientProducts) {
          for (const ingredientProduct of orderProductData.ingredientProducts) {
            const ingredientEntity = await this.orderRepo.findIngredient({ ingredientId: ingredientProduct.ingredientId });

            if (!ingredientEntity) {
              throw new TransactionError(new Error(`Ingredient with ID ${ingredientProduct.ingredientId} not found`))
            }

            const ingredientProductEntity = this.orderRepo.getIngredientProductEntity();
            ingredientProductEntity.ingredient = Object.assign(this.orderRepo.getIngredientEntity(), ingredientEntity);
            ingredientProductEntity.count = ingredientProduct.count;
            ingredientProductEntity.orderProduct = Object.assign(this.orderRepo.getOrderProductEntity(), orderProduct);

            if (orderProductEntity.count === 0) {
              await this.orderRepo.deleteIngredientProduct(orderProductEntity)
              continue;
            }

            await this.createIngredientProduct(ingredientProductEntity)
          }
        }
      }

      await this.orderRepo.commit()

      return ok({ orderId: order?.orderId })
    } catch (error) {

      if (error instanceof TransactionError) {
        await this.orderRepo.rollback()
      }

      if (error instanceof EntityError || error instanceof TransactionError) {
        return badRequest(new Error(error.message));
      }

      return serverError(error);
    } finally {
      await this.orderRepo.closeTransaction();
    }
  }

  async handleCreateOrder(orderData: Order.InsertOrderInput): Promise<HttpResponse> {

    await this.orderRepo.prepareTransaction()

    // Verificação básica para garantir que temos produtos para criar o pedido
    if (!orderData.orderProducts || orderData.orderProducts.length === 0) {
      return badRequest(new Error('Cannot create order: orderProducts not found'));
    }

    // Cria a entidade de pedido
    const orderEntity = Object.assign(this.orderRepo.getOrderEntity(), orderData);

    // Configura o relacionamento entre cliente e pedido
    const client = await this.registerRepo.findClientById({ clientId: orderData.clientId });

    // Vincula o cliente ao pedido caso existir. 
    if (client) {
      orderEntity.client = client;
    }

    orderEntity.orderProducts = [this.orderRepo.getOrderProductEntity()]

    // Valida o pedido antes de salvar
    const errors = await this.validator.validate(orderEntity);
    if (errors.length !== 0) {
      return badRequest(new Error(JSON.stringify(errors)));
    }

    await this.orderRepo.openTransaction()

    try {

      const order = await this.createOrder(orderEntity);

      // Processa os produtos associados ao pedido
      for (const orderProductData of orderData.orderProducts) {
        const productEntity = await this.orderRepo.findProduct({ productId: orderProductData.productId });

        if (!productEntity) {
          throw new TransactionError(new Error(`Product with ID ${orderProductData.productId} not found`))
        }

        const orderProductEntity = this.orderRepo.getOrderProductEntity();
        orderProductEntity.product = Object.assign(this.orderRepo.getProductEntity(), productEntity);
        orderProductEntity.count = orderProductData.count;
        orderProductEntity.order = Object.assign(this.orderRepo.getOrderEntity(), order);

        const orderProduct = await this.createOrderProduct(orderProductEntity)

        // Processa os ingredientes associados ao produto do pedido
        if (orderProductData.ingredientProducts) {
          for (const ingredientProduct of orderProductData.ingredientProducts) {
            const ingredientEntity = await this.orderRepo.findIngredient({ ingredientId: ingredientProduct.ingredientId });

            if (!ingredientEntity) {
              throw new TransactionError(new Error(`Ingredient with ID ${ingredientProduct.ingredientId} not found`))
            }

            const ingredientProductEntity = this.orderRepo.getIngredientProductEntity();
            ingredientProductEntity.ingredient = Object.assign(this.orderRepo.getIngredientEntity(), ingredientEntity);
            ingredientProductEntity.count = ingredientProduct.count;
            ingredientProductEntity.orderProduct = Object.assign(this.orderRepo.getOrderProductEntity(), orderProduct);

            await this.createIngredientProduct(ingredientProductEntity)
          }
        }
      }

      await this.orderRepo.commit()

      return ok({ orderId: order?.orderId })
    } catch (error) {

      if (error instanceof TransactionError) {
        await this.orderRepo.rollback()
      }

      if (error instanceof EntityError || error instanceof TransactionError) {
        return badRequest(new Error(error.message));
      }

      return serverError(error);
    } finally {
      await this.orderRepo.closeTransaction();
    }
  }

  async createOrder(orderData: Order.InsertOrderInput): Promise<Order.InsertOrderOutput> {
    if (!orderData.orderId) orderData.orderId = this.tokenHandler.generateUuid()
    const order = await this.orderRepo.saveOrder(orderData)
    if (order === undefined) throw new Error('Cant insert order')
    return order
  }

  async createOrderProduct(productOrderData: Order.InsertOrderProductInput): Promise<Order.InsertOrderProductOutput> {
    const productOrder = await this.orderRepo.saveOrderProduct(productOrderData)
    if (productOrder === undefined) throw new Error('Cant insert product order')
    return productOrder
  }

  async createIngredientProduct(ingredientProductData: Order.InsertIngredientProductInput): Promise<Order.InsertIngredientProductOutput> {
    const ingredientProduct = await this.orderRepo.saveIngredientProduct(ingredientProductData)
    if (ingredientProduct === undefined) throw new Error('Cant insert product order')
    return ingredientProduct
  }


  async handleDeleteOrder(httpRequest: Order.GenericType): Promise<HttpResponse> {
    try {
      return await this.deleteOrder(httpRequest)
    } catch (error) {
      return serverError(error)
    }
  }

  async deleteOrder({ orderId }: Order.FindOrderInput): Promise<HttpResponse<Order.deleteOrderOutput | Error>> {
    const order = await this.orderRepo.deleteOrder({ orderId })
    if (order === undefined) return notFound()
    return ok(order)
  }

}
