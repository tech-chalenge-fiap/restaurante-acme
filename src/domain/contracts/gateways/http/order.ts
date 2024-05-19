import { Order } from "@/domain/contracts/repos"

export namespace OrderHttp {

  // API types contracts

// GET /orders
export type GetOrderInput = { orderId: string }

export type GetOrderOutput = Order.FindOrderOutput

  // POST /orders
  export type CreateOrderInput = {
    /**
     * clientId is optional
     */
    clientId?: string
    orderProducts: CreateOrderProductInput[]
  }

  export type CreateOrderOutput = {
    orderId: string,
    status: string
  }

  export type CreateOrderProductInput = {
    productId: string
    count: number
    /**
     * product count, cant be zero or negative
     * ingredient count, cant be zero or negative
     */
    ingredientProducts?: CreateIngredientProductInput[]
  }

  export type CreateIngredientProductInput = {
    ingredientId: string
    count: number
  }

   // PUT /orders
   export type UpdateOrderInput = {
    orderId: string
    orderProducts: CreateOrderProductInput[]
  }

  export type UpdateOrderOutput = {
    orderId: string,
    status: string
  }

  export type UpdateOrderStatusInput = {
    orderId: string,
    status: string
  }

  export type UpdateOrderStatusOutput = {
    orderId: string,
    status: string
  }

  // DELETE /order
  export type DeleteOrderInput = { orderId: string }

  export type DeleteOrderOutput = Order.DeleteOrderOutput

  // GET /product
  export type GetProductOutput = Order.FindProductOutput

  // GET /categories
  export type GetCategoriesOutput = Order.FindCategoriesOutput


  // GET /checkout
  export type GetPaymentInput = { paymentId: string }

  export type GetPaymentOutput = Order.FindPaymentOutput

  // POST /checkout
  export type CreateCheckoutInput = { orderId: string, paymentMethod: string }

  export type CreateCheckoutOutput = { orderId: string, paymentId: string, status: string }

  
}

