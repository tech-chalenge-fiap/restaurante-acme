export interface Order {
  findOrder: (input: Order.FindOrderInput) => Promise<Order.FindOrderOutput>
  insertOrder: (input: Order.InsertOrderInput) => Promise<Order.InsertOrderOutput>
  insertProductOrder: (input: Order.InsertProductOrderInput) => Promise<Order.InsertProductOrderOutput>
  insertIngredientProduct: (input: Order.InsertIngredientProductInput) => Promise<Order.InsertIngredientProductOutput>
  findProduct: (input: Order.FindProductInput) => Promise<Order.FindProductOutput>
  findIngredient: (input: Order.FindIngredientInput) => Promise<Order.FindIngredientOutput>
}

export namespace Order {

  export type GenericType<T = any> = T

  // Order Properties
  export type FindOrderInput = { orderId: string }

  export type FindOrderOutput = undefined | {
    orderId: string
    createdAt: string
    client?: GenericType
    orderProducts: GenericType[]
  }


  export type InsertOrderInput = {
    orderId: string
    clientId?: string
    client?: GenericType
    orderProducts: GenericType[]
  }

  export type InsertOrderOutput = undefined | {
    id: number
    orderId: string
  }



  //Product Properties
  export type FindProductInput = { productId: string }

  export type FindProductOutput = undefined | {
    id: string
    productId: string
    name: string
    description: string
    price: number
  }

  export type InsertProductOrderInput = {
    product: GenericType
    order: GenericType
  }


  export type InsertProductOrderOutput = undefined | {
    id: number,
    orderId: string
    productId: string
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
    id: number,
    ingredientId: string
    orderProductId: number
  }

  export type InsertIngredientProductInput = {
    ingredient: GenericType
    orderProduct: GenericType
  }

}

