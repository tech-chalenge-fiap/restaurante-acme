export interface Order {
  findOrder: (input: Order.FindOrderInput) => Promise<Order.FindOrderOutput>
  findOrders: () => Promise<Order.FindOrdersOutput>
  saveOrder: (input: Order.InsertOrderInput, options: Order.saveOptions) => Promise<Order.InsertOrderOutput>
  savePayment: (input: Order.InsertPaymentInput, options: Order.saveOptions) => Promise<Order.InsertPaymentOutput>
  saveOrderProduct: (input: Order.InsertOrderProductInput, options: Order.saveOptions) => Promise<Order.InsertOrderProductOutput>
  saveIngredientProduct: (input: Order.InsertIngredientProductInput, options: Order.saveOptions) => Promise<Order.InsertIngredientProductOutput>
  findProduct: (input: Order.FindProductInput) => Promise<Order.FindProductOutput>
  findIngredient: (input: Order.FindIngredientInput) => Promise<Order.FindIngredientOutput>
  deleteOrder: (input: Order.FindOrderInput) => Promise<Order.deleteOrderOutput>
  deleteOrderProduct: (orderProductData: Partial<Order.InsertOrderProductInput>) => Promise<Order.deleteOrderProductOutput> 
  deleteIngredientProduct: (orderProductData: Partial<Order.InsertIngredientProductInput>) => Promise<Order.deleteIngredientProductOutput> 
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
    status?: string
    payments: GenericType[] 
    createdAt: string
    client?: GenericType
    orderProducts: GenericType[]
    totalPrice?: number
  }

  export type FindOrdersOutput = FindOrderOutput[] | undefined 


  export type FindCategoryOutput = undefined | {
    id: number
    name: string
    products: GenericType[]
    ingredients: GenericType[]
  }

  export type FindCategoriesOutput = FindCategoryOutput[] | undefined 


  export type InsertOrderInput = {
    orderId: string
    clientId?: string
    client?: GenericType
    payment: GenericType
    orderProducts: GenericType[]
  }

  export type InsertPaymentInput = {
    paymentId: string
    totalPrice: number
    paymentMethod: string
    status: string
    order: GenericType
  }

  export type InsertPaymentOutput = undefined | {
    id: number
    status: string
    paymentId: string
    totalPrice: number
  }

  export type UpdateOrderStatusInput = {
    orderId: string
    status: string
  }

  export type InsertOrderOutput = undefined | {
    id: number
    status: string
    orderId: string
  }

  
  export type deleteOrderOutput = undefined | {
    orderId: string
    affected: number | null | undefined
  }

  export type deleteOrderProductOutput = undefined | {
    orderId: string
    productId: string
    affected: number | null | undefined
  }

  export type deleteIngredientProductOutput = undefined | {
    ingredientId: string
    orderProductId: string
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
    category: GenericType
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

}

