import { Order } from "@/domain/contracts/repos"

export namespace OrderHttp {

  // API types contracts

  // GET /orders
  export type GetOrderInput = { orderId: string }

  export type GetOrderOutput = Order.FindOrderOutput

  // POST /orders
  export type CreateOrderInput = {
    /**
     * clientId é opcional
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
    * Não é possível escolher um produto com a quantidade zero
   * Não é possível escolher um ingrediente com a quantidade zero
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
    orderProducts: UpdateOrderProductInput[]
  }

  export type UpdateOrderProductInput = {
    productId: string
    count: number
    ingredientProducts?: CreateIngredientProductInput[]
  }

  export type UpdateOrderOutput = {
    orderId: string,
    status: string
  }

  export type UpdateOrderStatusInput = {
      /**
     * Não é permitido alterar para "Recebido" se o status atual não for "Recebido", status padrão.
     * Não é permitido alterar para "Em Preparação" se o status atual não for "Recebido" e o status de pagamento for Pendente
     * Não é permitido alterar para "Pronto" se o status atual não for "Em Preparação"
     * Não é permitido alterar para "Finalizado" se o status atual não for "Pronto"
     */
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
  export type CreateCheckoutInput = {
    /**
     * paymentMethod aceita somente 'PIX'
     */
    orderId: string,
    paymentMethod: string
  }

  export type CreateCheckoutOutput = { orderId: string, paymentId: string, status: string }

  export type UpdatePaymentStatusInput = {
    paymentId: string
    status: string
  }

  export type UpdatePaymentStatusOutput = undefined | {
    status: string
    paymentId: string
  }
}

