export interface Order {
  findOrder: (input: Order.FindOrderInput) => Promise<Order.FindOrderOutput>
  insertOrder: (input: Order.InsertOrderInput) => Promise<Order.InsertOrderOutput>
}

export namespace Order {
  export type FindOrderInput = { orderId: string }
  export type FindOrderOutput = undefined | {
    orderId: string
    createdAt: string
    client: GenericType
    orderItems: GenericType[]
  }


  export type GenericType<T = any> = T

  export type InsertOrderInput = {
    orderId: string
    client: GenericType
    orderItems: GenericType[]
  }
  

  export type InsertOrderOutput = undefined | {
    orderId: string,
    client: GenericType
    orderItems: GenericType[]
  }
}

