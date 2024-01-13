export interface Client {
  getById: (input: Client.Input) => Promise<Client.Output>
}

export namespace Client {
  export type Input = { id: number }
  export type Output = undefined | {
    id?: number
    name?: string
  }
}

