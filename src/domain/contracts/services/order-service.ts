import { Order } from "../repos"


export interface OrderService {
  calculateOrderValue: (input: OrderService.CalculateOrderValueOutput) => OrderService.CalculateOrderValueOutput
}

export namespace OrderService {

  export type GenericType<T = any> = T

  // Order Properties
  export type CalculateOrderValueOutput = Order.FindOrderOutput
}

