import { Order } from "../repos"


export interface OrderService {
  calculateOrderValue: (input: OrderService.CalculateOrderValueInput) => OrderService.CalculateOrderValueOutput
  calculateOrderValues: (input: OrderService.CalculateOrderValueInput[]) => OrderService.CalculateOrderValueOutput[]
  validateOrderStatusRule: (input: OrderService.GenericType, newStatus?: string) => OrderService.GenericType
  validatePaymentMethodRule: (paymentMethod: string) => boolean
  saveOrder: (orderData: Order.InsertOrderInput) => Promise<Order.InsertOrderOutput>
  savePayment: (paymentData: Order.InsertPaymentInput) => Promise<Order.InsertPaymentOutput> 
  saveOrderProduct: (productOrderData: Order.InsertOrderProductInput) => Promise<Order.InsertOrderProductOutput>
  saveIngredientProduct: (ingredientProductData: Order.InsertIngredientProductInput) => Promise<Order.InsertIngredientProductOutput>
}

export namespace OrderService {

  export type GenericType<T = any> = T

  // Order Properties
  export type CalculateOrderValueInput = Order.FindOrderOutput 
  export type CalculateOrderValueOutput = Order.FindOrderOutput
}

