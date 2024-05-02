export interface Patient {
  findOne: (input: Patient.FindInput) => Promise<Patient.FindOutput>
  insert: (input: Patient.InsertInput) => Promise<Patient.InsertOutput>
}

export namespace Patient {
  export type FindInput = { patientId: string }
  export type FindOutput = undefined | {
    patientId: string
    name: string 
    email: string 
    registration: string
    birthDate?: string 
    phone?: string 
    address?: string 
    education?: string 
    educationalInstitution?: string 
    gender?: string 
    notes?: GenericType[] 
    specialist: GenericType
  }


  export type GenericType<T = any> = T

  export type InsertInput = {
    patientId: string,
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
    patientId: string
    name?: string
  }
}

