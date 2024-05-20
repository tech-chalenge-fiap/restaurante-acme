
    export interface TokenValidator {
    validate: (input: TokenValidator.Input) => Promise<TokenValidator.Output>
  }
  
  export namespace TokenValidator {
    export type Input = { token: string }
    export type Output = string
  }