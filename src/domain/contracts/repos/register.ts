export interface Register {
  findClient: (input: Register.FindClientInput) => Promise<Register.FindClientOutput>
  insertClient: (input: Register.InsertClientInput) => Promise<Register.InsertClientOutput>
}

export namespace Register {
  export type FindClientInput = { clientId: string }
  export type FindClientOutput = undefined | {
    clientId: string
    name: string 
    registration: string
    email: string
    orders?: GenericType[]
  }

  export type GenericType<T = any> = T

  export type InsertClientInput = {
    clientId: string
    name: string 
    registration: string
    email: string
    orders?: GenericType[]
  }
  

  export type InsertClientOutput = undefined | {
    clientId: string
    name?: string
  }
}

