export interface Test {
  find: (input: Test.FindInput) => Promise<Test.FindOutput | Test.FindOutput[]>
  save: (input: Test.InsertInput) => Promise<Test.InsertOutput>
}

export namespace Test {
  export type GenericType<T = any> = T
  export type FindInput = { testId: string }
  export type FindOutput = undefined | {
    testId: string
    name: string 
    category?: GenericType
  }

  export type InsertInput = {
    testId: string
    name: string 
    category?: GenericType
  }
  

  export type InsertOutput = undefined | {
    testId: string
    name?: string
    category?: GenericType
  }
}

