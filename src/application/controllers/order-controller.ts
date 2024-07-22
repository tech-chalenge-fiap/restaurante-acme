import { OrderRepository, RegisterRepository } from '@/infra/repos/mysql'
import { created, badRequest, HttpResponse, notFound, ok, serverError } from '@/application/helpers'
import { Order } from '@/domain/contracts/repos'
import { PaymentGateway, TokenHandler } from '@/infra/gateways'
import { Validator } from '@/application/validation'
import { EntityError, TransactionError } from '@/infra/errors'
import { OrderService } from '@/domain/contracts/use-cases/order-use-case'
import { OrderHttp } from '@/domain/contracts/gateways'
import { OrderServiceError } from '@/domain/errors'

export class OrderController {
  constructor(
    private readonly validator: Validator,
    private readonly registerRepo: RegisterRepository,
    private readonly orderRepo: OrderRepository,
    private readonly orderService: OrderService,
    private readonly paymentGateway: PaymentGateway
  ) { }

  // GET /orders
  async handleGetOrders(): Promise<HttpResponse<OrderHttp.GetOrderOutput[] | Error>> {
    try {
      const orders = await this.orderRepo.findOrders()
      if (orders === undefined) return notFound()
      return ok(this.orderService.calculateOrderValues(orders))
    } catch (error) {
      if (
        error instanceof OrderServiceError ||
        error instanceof EntityError ||
        error instanceof TransactionError) {
        return badRequest(new Error(error.message));
      }
      return serverError(error)
    }
  }

  // GET /order
  async handleGetOrder(httpRequest: OrderHttp.GetOrderInput): Promise<HttpResponse<OrderHttp.GetOrderOutput | Error>>{
    try {
      const order = await this.orderRepo.findOrder({ orderId: httpRequest.orderId })
      if (order === undefined) return notFound()
      return ok(this.orderService.calculateOrderValue(order))
    } catch (error) {
      if (
        error instanceof OrderServiceError ||
        error instanceof EntityError ||
        error instanceof TransactionError) {
        return badRequest(new Error(error.message));
      }
      return serverError(error)
    }
  }

  // POST /order
  async handleCreateOrder(orderData: OrderHttp.CreateOrderInput): Promise<HttpResponse<OrderHttp.CreateOrderOutput | Error>> {

    await this.orderRepo.prepareTransaction()

    // Verificação básica para garantir que temos produtos para criar o pedido
    if (!orderData.orderProducts || orderData.orderProducts.length === 0) {
      return badRequest(new Error('Cannot save order: orderProducts not found'));
    }

    // Cria a entidade de pedido
    const orderEntity = this.orderRepo.getOrderEntity();

    // Cria a entidade de pagamento
    const paymentEntity = this.orderRepo.getPaymentEntity();

    // Configura o relacionamento entre cliente e pedido
    const client = await this.registerRepo.findClientById({ clientId: orderData.clientId });

    // Vincula o cliente ao pedido caso existir.
    if (client) {
      orderEntity.client = client;
    }

    orderEntity.status = '';
    paymentEntity.status = 'Pendente';

    orderEntity.payment = paymentEntity;


    // Valida o pedido antes de salvar
    const errors = await this.validator.validate(orderEntity);
    if (errors.length !== 0) {
      return badRequest(new Error(JSON.stringify(errors)));
    }

    await this.orderRepo.openTransaction()

    try {

      const order = await this.orderService.saveOrder(orderEntity);
      paymentEntity.order = order;

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

        if (orderProductEntity.count <= 0) {
          throw new TransactionError(new Error(`Product with ID ${productEntity.productId} could not count as ${orderProductEntity.count}`))
        }

        const orderProduct = await this.orderService.saveOrderProduct(orderProductEntity)

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

            if (ingredientProductEntity.count <= 0) {
              throw new TransactionError(new Error(`Product with ID ${ingredientEntity.ingredientId} could not count as ${ingredientProductEntity.count}`))
            }

            await this.orderService.saveIngredientProduct(ingredientProductEntity)
          }
        }
      }
      const orderInfo = this.orderService.calculateOrderValue(await this.orderRepo.findOrder({ orderId: order?.orderId ?? '' }))
      paymentEntity.totalPrice = orderInfo?.totalPrice
      await this.orderService.savePayment(paymentEntity)

      await this.orderRepo.commit()

      return created({ orderId: order!.orderId, status: order!.status })
    } catch (error) {

      if (error instanceof TransactionError) {
        await this.orderRepo.rollback()
      }

      if (
        error instanceof OrderServiceError ||
        error instanceof EntityError ||
        error instanceof TransactionError) {
        return badRequest(new Error(error.message));
      }

      return serverError(error);
    } finally {
      await this.orderRepo.closeTransaction();
    }
  }

  // PUT /order
  async handleUpdateOrder(orderData: OrderHttp.UpdateOrderInput): Promise<HttpResponse<OrderHttp.UpdateOrderOutput| Error>> {

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

      // Busca a entidade de pedido
      const order = await this.orderRepo.findOrder({ orderId: orderData.orderId });

      // Cria a entidade de pagamento com base no ultimo pagamento
      const paymentEntity = Object.assign(this.orderRepo.getPaymentEntity(), order?.payments[order?.payments.length - 1]);

      if (!order) {
        return badRequest(new Error(`Order with ID ${orderData.orderId} not found`))
      }

      if (!this.orderService.validateOrderStatusRule(order)) {
        return badRequest(new Error(`Cant not update order with ID ${orderData.orderId}, status ${order.status}`));
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

        // Deleta um produto do pedido caso a quantidade for zero
        if (orderProductEntity.count === 0) {
          await this.orderRepo.deleteOrderProduct(orderProductEntity)
          continue;
        }

        const orderProduct = await this.orderService.saveOrderProduct(orderProductEntity)

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

            // Deleta um ingrediente do produto caso a quantidade for zero
            if (ingredientProductEntity.count === 0) {
              await this.orderRepo.deleteIngredientProduct(ingredientProductEntity)
              continue;
            }

            await this.orderService.saveIngredientProduct(ingredientProductEntity)
          }
        }
      }

      const orderInfo = this.orderService.calculateOrderValue(await this.orderRepo.findOrder({ orderId: order?.orderId ?? '' }))
      paymentEntity.totalPrice = orderInfo?.totalPrice
      await this.orderService.savePayment(paymentEntity)

      await this.orderRepo.commit()

      return ok({ orderId: order?.orderId, status: order.status })
    } catch (error) {

      if (error instanceof TransactionError) {
        await this.orderRepo.rollback()
      }

      if (
        error instanceof OrderServiceError ||
        error instanceof EntityError ||
        error instanceof TransactionError) {
        return badRequest(new Error(error.message));
      }

      return serverError(error);
    } finally {
      await this.orderRepo.closeTransaction();
    }
  }

  // PUT /order-status
  async handleUpdateOrderStatus(orderData: OrderHttp.UpdateOrderStatusInput): Promise<HttpResponse<OrderHttp.UpdateOrderStatusOutput | Error>> {

    await this.orderRepo.prepareTransaction()

    // Verificação básica para garantir que temos orderId para alterar o pedido
    if (!orderData.orderId) {
      return badRequest(new Error('Cannot update order: orderId not found'));
    }

    await this.orderRepo.openTransaction()

    try {
      // Cria a entidade de pedido
      const orderEntity = Object.assign(this.orderRepo.getOrderEntity(), orderData);

      // Valida o pedido antes de salvar
      const errors = await this.validator.validate(orderEntity);
      if (errors.length !== 0) {
        return badRequest(new Error(JSON.stringify(errors)));
      }

      // Busca a entidade de pedido
      const order = await this.orderRepo.findOrder({ orderId: orderData.orderId });

      if (!order) {
        return badRequest(new Error(`Order with ID ${orderData.orderId} not found`))
      }


      if (!this.orderService.validateOrderStatusRule(order, orderData.status)) {
        return badRequest(new Error(`Cant not update order status with ID ${orderData.orderId}, order status ${order.status}, payment status ${order.payments[0]?.status}`));
      }

      // Altera a entidade de pedido
      await this.orderService.saveOrder(Object.assign(order, orderEntity))

      await this.orderRepo.commit()

      return ok({ orderId: order!.orderId, status: order!.status })
    } catch (error) {

      if (error instanceof TransactionError) {
        await this.orderRepo.rollback()
      }

      if (
        error instanceof OrderServiceError ||
        error instanceof EntityError ||
        error instanceof TransactionError) {
        return badRequest(new Error(error.message));
      }

      return serverError(error);
    } finally {
      await this.orderRepo.closeTransaction();
    }
  }

  // DELETE /order
  async handleDeleteOrder(httpRequest: OrderHttp.DeleteOrderInput): Promise<HttpResponse<OrderHttp.DeleteOrderOutput | Error>> {
    try {
      const order = await this.orderRepo.deleteOrder({ orderId: httpRequest.orderId });
      if (order === undefined) return notFound()
      return ok(order)
    } catch (error) {
      return serverError(error)
    }
  }

  // GET /checkout
  async handleGetCheckout({ paymentId }: OrderHttp.GetPaymentInput): Promise<HttpResponse<OrderHttp.GetPaymentOutput | Error>> {
    try {
      const payment = await this.orderRepo.findPayment({ paymentId })
      if (payment === undefined) return notFound()
      return ok(payment)
    } catch (error) {
      return serverError(error)
    }
  }

  // POST /checkout
  async handleCreateCheckout(paymentData: OrderHttp.CreateCheckoutInput): Promise<HttpResponse<OrderHttp.CreateCheckoutOutput | Error>> {

    await this.orderRepo.prepareTransaction()

    // Verificação básica para garantir os dados do checkout
    if (!paymentData.paymentMethod || !paymentData.orderId) {
      return badRequest(new Error('Cannot create checkout: paymentMethod not found'));
    }

    if (!paymentData.orderId) {
      return badRequest(new Error('Cannot create checkout: orderId not found'));
    }

    if (!this.orderService.validatePaymentMethodRule(paymentData.paymentMethod)) {
      return badRequest(new Error(`Cant not create payment with paymentMethod ${paymentData.paymentMethod}`));
    }

    await this.orderRepo.openTransaction()

    try {

      // Busca a entidade de pedido
      const order = this.orderService.calculateOrderValue(await this.orderRepo.findOrder({ orderId: paymentData.orderId }));

      if (!order) {
        return badRequest(new Error(`Order with ID ${paymentData.orderId} not found`))
      }
      // Cria a entidade de pagamento com base no ultimo pagamento
      const payment = order.payments[order.payments.length - 1];
      const paymentEntity = Object.assign(this.orderRepo.getPaymentEntity(), payment);


      paymentEntity.totalPrice = order.totalPrice;
      paymentEntity.order = order;

      const pixGenerated = await this.paymentGateway.pixGenerate(order);

      if (!pixGenerated) {
        throw new TransactionError(new Error(`Payment with order ID ${order.orderId} not perform successfull transaction`))
      }

      paymentEntity.status = 'Processando';

      const savedPayment = await this.orderService.savePayment(Object.assign(paymentEntity, pixGenerated));

      if (!savedPayment) {
        throw new TransactionError(new Error(`Payment with order ID ${order.orderId} not perform successfull transaction`))
      }

      order.status = 'Recebido';

      // Altera status da entidade de pedido
      const orderEntity = this.orderRepo.getOrderEntity()
      orderEntity.id = order.id;
      orderEntity.orderId = order.orderId;
      orderEntity.status  = 'Recebido';
      orderEntity.payments = [paymentEntity]
      await this.orderService.saveOrder(orderEntity)

      await this.orderRepo.commit()

      return created({ orderId: order?.orderId, status: savedPayment?.status, paymentId: savedPayment.paymentId })
    } catch (error) {

      if (error instanceof TransactionError) {
        await this.orderRepo.rollback()
      }

      if (
        error instanceof OrderServiceError ||
        error instanceof EntityError ||
        error instanceof TransactionError) {
        return badRequest(new Error(error.message));
      }

      return serverError(error);
    } finally {
      await this.orderRepo.closeTransaction();
    }
  }
}
