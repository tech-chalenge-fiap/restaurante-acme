export interface Register {
  findClient: (input: Register.FindClientInput) => Promise<Register.FindClientOutput>
  findClientById: (input: Register.FindClientByIdInput) => Promise<Register.FindClientOutput>
  insertClient: (input: Register.InsertClientInput) => Promise<Register.InsertClientOutput>
}

export namespace Register {
  export type FindClientInput = { cpf: string }
  export type FindClientByIdInput = { clientId?: string }
  export type FindClientOutput = undefined | {
    id?: number
    clientId: string
    name: string 
    cpf: string
    email: string
  }

  export type GenericType<T = any> = T

  export type InsertClientInput = {
    clientId: string
    name: string 
    cpf: string
    email: string
  }
  

  export type InsertClientOutput = undefined | {
    clientId: string
    name?: string
  }
}

