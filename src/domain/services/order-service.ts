import { OrderService } from "@/domain/contracts/services/order-service";


export class OrderManager implements OrderService {
  calculateOrderValue(orderData: OrderService.CalculateOrderValueOutput): OrderService.CalculateOrderValueOutput {
    if(!orderData) throw new Error('Order data not found to calculate order value');
    orderData.totalValue = 100
    return orderData
  }
}
