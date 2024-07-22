import { OrderService } from "@/domain/contracts/use-cases/order-use-case";
import { OrderServiceError } from "@/domain/errors";
import { Order } from "@/domain/contracts/repos";
import { TokenHandler } from "@/infra/gateways";
import { OrderRepository } from "@/infra/repos/mysql";


export class OrderManager implements OrderService {
  constructor(private readonly orderRepo: OrderRepository, private readonly tokenHandler: TokenHandler) {}
  calculateOrderValues(orderData: OrderService.CalculateOrderValueInput[]): OrderService.CalculateOrderValueInput[] {
    if (!orderData) throw new OrderServiceError(new Error('Order data not found to calculate total price'));
    // Calculando a soma dos preços em orderProducts e ingredientProducts
    return orderData.map((order) => this.calculateOrderValue(order))
  }

  //O preço = count(produtos) * price + count(ingredientes) * price
  calculateOrderValue(orderData: OrderService.GenericType): OrderService.GenericType {
    if (!orderData) throw new OrderServiceError(new Error('Order data not found to calculate total price'));
    // Calculando a soma dos preços em orderProducts e ingredientProducts
    const totalPrice = orderData.orderProducts.reduce((acc: number, product: OrderService.GenericType) => {
      return acc + product.price * product.count;
    }, 0) + orderData.orderProducts.flatMap((product: OrderService.GenericType) => product.ingredientProducts)
      .reduce((acc: number, ingredient: OrderService.GenericType) => {
        return acc + ingredient.price * ingredient.count;
      }, 0);
    orderData.totalPrice = totalPrice
    return orderData
  }


  validateOrderStatusRule(order: OrderService.GenericType, newStatus?: string): boolean {
    // Status permitidos no pedido
    if (order.status && !["Recebido", "Em Preparação", "Pronto", "Finalizado"].includes(order.status)) {
      return false;
    }
    // Não é possível alterar um pedido Pronto
    // Não é possível alterar um pedido Finalizado
    if (order.status && !newStatus && ["Pronto", "Finalizado"].includes(order.status)) {
      return false;
    }
    if (newStatus === "Recebido" && order.status !== "Recebido") {
      return false; // Não é permitido alterar para "Recebido" se o status atual não for "Recebido", status padrão.
    }
    if (newStatus === "Em Preparação" && order.status !== "Recebido") {
      return false; // Não é permitido alterar para "Em Preparação" se o status atual não for "Recebido"
    }
    if (newStatus === "Pronto" && order.status !== "Em Preparação") {
      return false; // Não é permitido alterar para "Pronto" se o status atual não for "Em Preparação"
    }
    if (newStatus === "Finalizado" && order.status !== "Pronto") {
      return false; // Não é permitido alterar para "Finalizado" se o status atual não for "Pronto"
    }
    if (order.payments[0].status === "Processando") {
      return false; // Não é permitido alterar status quanto o pagamento estiver processando
    }
    return true;
  }

  // Forma de pagamento: Pix
  validatePaymentMethodRule (paymentMethod: string): boolean {
    const paymentMethods = ['PIX']
    return paymentMethods.includes(paymentMethod.toLocaleUpperCase())
  }

   async saveOrder(orderData: Order.InsertOrderInput): Promise<Order.InsertOrderOutput> {
    if (!orderData.orderId) orderData.orderId = this.tokenHandler.generateUuid()
    const order = await this.orderRepo.saveOrder(orderData)
    if (order === undefined) throw new Error('Cant insert order')
    return order
  }

  async savePayment(paymentData: Order.InsertPaymentInput): Promise<Order.InsertPaymentOutput> {
    if (!paymentData.paymentId) paymentData.paymentId = this.tokenHandler.generateUuid()
    const order = await this.orderRepo.savePayment(paymentData)
    if (order === undefined) throw new Error('Cant insert payment')
    return order
  }

  async saveOrderProduct(productOrderData: Order.InsertOrderProductInput): Promise<Order.InsertOrderProductOutput> {
    const productOrder = await this.orderRepo.saveOrderProduct(productOrderData)
    if (productOrder === undefined) throw new Error('Cant insert product order')
    return productOrder
  }

  async saveIngredientProduct(ingredientProductData: Order.InsertIngredientProductInput): Promise<Order.InsertIngredientProductOutput> {
    const ingredientProduct = await this.orderRepo.saveIngredientProduct(ingredientProductData)
    if (ingredientProduct === undefined) throw new Error('Cant insert product order')
    return ingredientProduct
  }
}
