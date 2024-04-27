export interface User {
  findOne: (input: User.FindInput) => Promise<User.FindOutput>
  insert: (input: User.InsertInput) => Promise<User.InsertOutput>
}

export namespace User {
  export type FindInput = { userId: string }
  export type FindOutput = undefined | {
    userId?: string
    name: string 
    crpCode: string
    email: string
    password: string 
    birthDate?: string 
    phone: string 
    address?: string
    userType: string 
    lastSession?: Date 
    notes?: string 
    accountStatus: boolean 
    patients?: GenericType[]
  }

  export type GenericType<T = any> = T

  export type InsertInput = {
    userId: string 
    name: string 
    crpCode: string
    email: string
    password: string 
    birthDate?: string 
    phone: string 
    address?: string
    userType: string 
    lastSession?: Date 
    notes?: string 
    accountStatus: boolean 
    patients?: GenericType[]
  }
  

  export type InsertOutput = undefined | {
    userId: string
    name?: string
  }
}

