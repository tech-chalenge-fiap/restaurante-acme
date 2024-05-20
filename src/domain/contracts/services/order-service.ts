import { Order } from "../repos"


export interface OrderService {
  calculateOrderValue: (input: OrderService.CalculateOrderValueInput) => OrderService.CalculateOrderValueOutput
  calculateOrderValues: (input: OrderService.CalculateOrderValueInput[]) => OrderService.CalculateOrderValueOutput[]
  validateOrderStatusRule: (input: OrderService.GenericType, newStatus?: string) => OrderService.GenericType
  validatePaymentMethodRule: (paymentMethod: string) => boolean
}

export namespace OrderService {

  export type GenericType<T = any> = T

  // Order Properties
  export type CalculateOrderValueInput = Order.FindOrderOutput 
  export type CalculateOrderValueOutput = Order.FindOrderOutput
}

