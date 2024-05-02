import { PatientRepository, UserRepository } from '@/infra/repos/mysql'
import { badRequest, HttpResponse, notFound, ok, serverError } from '@/application/helpers'
import { Patient } from '@/domain/contracts/repos'
import { TokenHandler } from '@/infra/gateways'
import { Validator } from '@/application/validation'
import { EntityError } from '@/infra/errors'

export class PatientController {
  constructor(
    private readonly validator: Validator,
    private readonly tokenHandler: TokenHandler,
    private readonly specialistRepo: UserRepository,
    readonly patientRepo: PatientRepository
  ) { }

  async handleGetPatient(httpRequest: any): Promise<HttpResponse> {
    try {
      return await this.getPatient(httpRequest)
    } catch (error) {
      return serverError(error)
    }
  }

  async handleCreatePatient(httpRequest: Patient.InsertInput): Promise<HttpResponse> {
    const patientEntity = Object.assign(this.patientRepo.patientEntity(), httpRequest);
    const errors = await this.validator.validate(patientEntity)
    if (errors.length !== 0) return badRequest(new Error(JSON.stringify(errors)))

    const specialist = await this.specialistRepo.findOne({ userId: httpRequest.specialist })
    if (!specialist) return badRequest(new Error('Cant insert patient: specialist not found'))

    patientEntity.specialist = Object.assign(this.specialistRepo.userEntity(), specialist)

    if (httpRequest.notes) {
      const notes = []
      for (const note of httpRequest.notes) {
        const noteEntity = this.patientRepo.noteEntity();
        noteEntity.noteId = this.tokenHandler.generateUuid();
        noteEntity.patient = patientEntity;
        noteEntity.historic = note
        notes.push(noteEntity)
      }
      patientEntity.notes = notes
    }

    try {
      return await this.createPatient(patientEntity)
    } catch (error) {
      console.log(error)
      if (error instanceof EntityError) return badRequest(new Error(error.message))
      return serverError(error)
    }
  }

  async getPatient({ patientId }: Patient.FindInput): Promise<HttpResponse<Patient.FindOutput | Error>> {
    const patient = await this.patientRepo.findOne({ patientId })
    if (patient === undefined) return notFound()
    return ok(patient)
  }

  async createPatient(patientData: Patient.InsertInput): Promise<HttpResponse<Patient.InsertOutput | Error>> {
    if(!patientData.patientId) patientData.patientId = this.tokenHandler.generateUuid()
  
    const patient = await this.patientRepo.insert(patientData)
    if (patient === undefined) return badRequest(new Error('Cant insert patient'))
    return ok({ patientId: patient.patientId, name: patient.name })
  }

}
