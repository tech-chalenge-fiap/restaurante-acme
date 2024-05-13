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

  async handleCreateOrder(orderData: Order.InsertOrderInput): Promise<HttpResponse> {

    await this.orderRepo.prepareTransaction()
    
    // Verificação básica para garantir que temos produtos para criar o pedido
    if (!orderData.orderProducts) {
      return badRequest(new Error('Cannot create order: orderProducts not found'));
    }

    // Cria a entidade de pedido
    const orderEntity = this.orderRepo.getOrderEntity();

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
        orderProductEntity.order = Object.assign(this.orderRepo.getOrderEntity(), order);

        const orderProduct = await this.createProductOrder(orderProductEntity)

        // Processa os ingredientes associados ao produto do pedido
        if (orderProductData.ingredientProducts) {
          for (const ingredientProduct of orderProductData.ingredientProducts) {
            const ingredientEntity = await this.orderRepo.findIngredient({ ingredientId: ingredientProduct.ingredientId });

            if (!ingredientEntity) {
              throw new TransactionError(new Error(`Ingredient with ID ${ingredientProduct.ingredientId} not found`))
            }

            const ingredientProductEntity = this.orderRepo.getIngredientProductEntity();
            ingredientProductEntity.ingredient = Object.assign(this.orderRepo.getIngredientEntity(), ingredientEntity);
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
    const order = await this.orderRepo.insertOrder(orderData)
    if (order === undefined) throw new Error('Cant insert order')
    return order
  }

  async createProductOrder(productOrderData: Order.InsertProductOrderInput): Promise<Order.InsertProductOrderOutput> {
    const productOrder = await this.orderRepo.insertProductOrder(productOrderData)
    if (productOrder === undefined) throw new Error('Cant insert product order')
    return productOrder
  }

  async createIngredientProduct(ingredientProductData: Order.InsertIngredientProductInput): Promise<Order.InsertIngredientProductOutput> {
    const ingredientProduct = await this.orderRepo.insertIngredientProduct(ingredientProductData)
    if (ingredientProduct === undefined) throw new Error('Cant insert product order')
    return ingredientProduct
  }

}
