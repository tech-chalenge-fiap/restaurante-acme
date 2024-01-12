export interface LoadClient {
  getById: (input: LoadClient.Input) => Promise<LoadClient.Output>
}

export namespace LoadClient {
  export type Input = { id: number }
  export type Output = undefined | {
    id?: number
    name?: string
  }
}

