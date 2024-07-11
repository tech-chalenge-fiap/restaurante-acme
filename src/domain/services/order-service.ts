import { OrderService } from "@/domain/contracts/services/order-service";
import { OrderServiceError } from "@/domain/errors";


export class OrderManager implements OrderService {
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

    // if (order.payments[0].status === "Processando") {
    //   return false; // Não é permitido alterar status quanto o pagamento estiver processando
    // }
    return true;
  }

  // Forma de pagamento: Pix
  validatePaymentMethodRule (paymentMethod: string): boolean {
    const paymentMethods = ['PIX']
    return paymentMethods.includes(paymentMethod.toLocaleUpperCase())
  }
}
