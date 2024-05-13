import { OrderService } from "@/domain/contracts/services/order-service";


export class OrderManager implements OrderService {
  calculateOrderValue(orderData: OrderService.CalculateOrderValueOutput): OrderService.CalculateOrderValueOutput {
    if (!orderData) throw new Error('Order data not found to calculate total price');
    // Calculando a soma dos preços em orderProducts e ingredientProducts
    const totalPrice = orderData.orderProducts.reduce((acc, product) => {
      return acc + parseFloat(product.price);
    }, 0) + orderData.orderProducts.flatMap(product => product.ingredientProducts)
      .reduce((acc, ingredient) => {
        return acc + parseFloat(ingredient.price);
      }, 0);

    orderData.totalPrice = totalPrice
    return orderData
  }
}
