export interface Patient {

}

export namespace Patient {
  export type FindInput = { patientId: string }
  export type FindOutput = undefined | {
    orderId: string
    createdAt: string
    client: GenericType[]
  }


  export type GenericType<T = any> = T

  export type InsertInput = {
    orderId: string,
    name: string 
    email: string 
    birthDate?: string 
    registration: string
    phone?: string 
    address?: string 
    education?: string 
    educationalInstitution?: string 
    gender?: string 
    notes?: GenericType[] 
    specialist: GenericType
  }
  

  export type InsertOutput = undefined | {
    orderId: string
    name?: string
  }
}

