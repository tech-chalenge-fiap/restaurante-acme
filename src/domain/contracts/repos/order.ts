import { Register } from "./register"

export interface Order {
  findOrder: (input: Order.FindOrderInput) => Promise<Order.FindOrderOutput>
  findOrders: () => Promise<Order.FindOrderOutput[] | undefined>
  saveOrder: (input: Order.InsertOrderInput) => Promise<Order.InsertOrderOutput>
  savePayment: (input: Order.InsertPaymentInput) => Promise<Order.InsertPaymentOutput>
  saveOrderProduct: (input: Order.InsertOrderProductInput) => Promise<Order.InsertOrderProductOutput>
  saveIngredientProduct: (input: Order.InsertIngredientProductInput) => Promise<Order.InsertIngredientProductOutput>
  findProduct: (input: Order.FindProductInput) => Promise<Order.FindProductOutput>
  findIngredient: (input: Order.FindIngredientInput) => Promise<Order.FindIngredientOutput>
  deleteOrder: (input: Order.FindOrderInput) => Promise<Order.DeleteOrderOutput>
  deleteOrderProduct: (orderProductData: Partial<Order.InsertOrderProductInput>) => Promise<Order.DeleteOrderProductOutput>
  deleteIngredientProduct: (orderProductData: Partial<Order.InsertIngredientProductInput>) => Promise<Order.DeleteIngredientProductOutput>
}

export namespace Order {
  export type saveOptions = undefined | {
    update?: boolean;
    insert?: boolean
  }

  export type GenericType<T = any> = T

  // Order Properties
  export type FindOrderInput = { orderId: string }

  export type FindOrderOutput = undefined | {
    id: number
    orderId: string
    status: string
    payments: FindPaymentOutput[]
    createdAt: string
    client?: Register.FindClientOutput
    orderProducts: OrderProductOutput[]
    totalPrice?: number
  }

  export type OrderProductOutput = {
    id: number
    productId: string
    name: string
    description: string
    count: number
    category: OrderProductCategoryOutput
    price: number
    ingredientProducts: OrderProductIngredientOutput[]
  }

  export type OrderProductCategoryOutput = {
    categoryId: string
    name: string
  }

  export type OrderProductIngredientOutput = {
    id: number
    ingredientId: string
    name: string
    description: string
    count: number
    price: number
  }

  export type InsertOrderInput = {
    orderId: string
    clientId?: string
    client?: GenericType
    payment: GenericType
    orderProducts: GenericType[]
  }

  export type InsertOrderOutput = undefined | {
    id: number
    status: string
    orderId: string
  }

  export type DeleteOrderOutput = undefined | {
    orderId: string
    affected: number | null | undefined
  }

  //Product Properties
  export type FindProductInput = { productId: string }

  export type FindProductOutput = undefined | {
    id: string
    productId: string
    name: string
    description: string
    price: number
    category: ProductOutput
  }

  export type ProductOutput = {
    id: number
    productId: string
    name: string
    description: string
    price: number
    createdAt: string
    updatedAt: string
  }

  export type IngredientsOutput = {
    id: number
    ingredientId: string
    name: string
    description: string
    createdAt: string
    updatedAt: string
  }

  export type InsertOrderProductInput = {
    count: number
    product: GenericType
    order: GenericType
  }

  export type InsertOrderProductOutput = undefined | {
    id: number
    count: number
    order: GenericType
    product: GenericType
  }

  export type DeleteOrderProductOutput = undefined | {
    orderId: string
    productId: string
    affected: number | null | undefined
  }

  // Categories Properties
  export type FindCategoryOutput = undefined | {
    id: number
    name: string
    products: ProductOutput[]
    ingredients: IngredientsOutput[]
  }

  export type FindCategoriesOutput = FindCategoryOutput[] | undefined

  //Ingredients Properties
  export type FindIngredientInput = { ingredientId: string }

  export type FindIngredientOutput = undefined | {
    id: string
    ingredientId: string
    name: string
    description: string
    price: number
  }

  export type InsertIngredientProductOutput = undefined | {
    id: number
    count: number
    ingredient: GenericType
    orderProduct: GenericType
  }

  export type InsertIngredientProductInput = {
    count: number
    ingredient: GenericType
    orderProduct: GenericType
  }

  export type DeleteIngredientProductOutput = undefined | {
    ingredientId: string
    orderProductId: string
    affected: number | null | undefined
  }

  // Payment properties
  export type FindPaymentInput = { paymentId: string }

  export type InsertPaymentInput = {
    paymentId: string
    totalPrice: number
    paymentMethod: string
    status: string
    order: GenericType
  }

  export type FindPaymentOutput = undefined | {
    id: number
    paymentId: string
    totalPrice: number
    paymentMethod: string
    status: string
    pixUrl: string
    pixCode: string
    expirationDate: Date
    order: GenericType
  }

  export type InsertPaymentOutput = undefined | {
    id: number
    status: string
    paymentId: string
    totalPrice: number
  }

  export type CreatePaymentInput = {
    orderId: string
    paymentMethod: string
  }

  export type UpdatePaymentStatusInput = {
    paymentId: string
    status: string
  }

  export type UpdatePaymentStatusOutput = undefined | {
    status: string
    paymentId: string
  }
}

