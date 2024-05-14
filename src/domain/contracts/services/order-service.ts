import { Order } from "../repos"


export interface OrderService {
  calculateOrderValue: (input: OrderService.CalculateOrderValueInput) => OrderService.CalculateOrderValueOutput
  calculateOrderValues: (input: OrderService.CalculateOrderValuesInput) => OrderService.CalculateOrderValuesOutput
  validateOrderStatusRule: (input: OrderService.GenericType, newStatus?: string) => OrderService.GenericType
}

export namespace OrderService {

  export type GenericType<T = any> = T

  // Order Properties
  export type CalculateOrderValueInput = Order.FindOrderOutput 
  export type CalculateOrderValueOutput = Order.FindOrderOutput 
  export type CalculateOrderValuesInput = Order.FindOrdersOutput
  export type CalculateOrderValuesOutput = Order.FindOrdersOutput
}

