import { makePatientRepo, makeUserRepo } from '@/application/main/factories/infra/repos/mysql'
import { PatientController } from '@/application/controllers'
import { makeTokenHandler } from '@/application/main/factories/infra/gateways'
import { makeValidator } from '@/application/main/factories/application/validation'

export const makePatientController = (): PatientController => {
  return new PatientController(makeValidator(), makeTokenHandler(), makeUserRepo(), makePatientRepo())
}
