export interface Order {
  findOrder: (input: Order.FindOrderInput) => Promise<Order.FindOrderOutput>
  insertOrder: (input: Order.InsertOrderInput) => Promise<Order.InsertOrderOutput>
  findOrderProduct: (input: Order.FindOrderProductInput) => Promise<Order.FindOrderProductOutput>
}

export namespace Order {

  // Order Properties
  export type FindOrderInput = { orderId: string }

  export type FindOrderOutput = undefined | {
    orderId: string
    createdAt: string
    client: GenericType
    orderProducts: GenericType[]
  }


  export type GenericType<T = any> = T

  export type InsertOrderInput = {
    orderId: string
    client: GenericType
    orderProducts: GenericType[]
  }
  

  export type InsertOrderOutput = undefined | {
    orderId: string,
    client: GenericType
    orderProducts: GenericType[]
  }


  //OrdemProduct Properties
  export type FindOrderProductInput = { orderProductId: string }

  export type FindOrderProductOutput = undefined | {
    orderProductId: string
    name: string
    description: string
    price: number
    order: GenericType
  }
}

