import { makePatientRepo, makeUserRepo } from '@/main/factories/infra/repos/mysql'
import { PatientController } from '@/application/controllers'
import { makeTokenHandler } from '@/main/factories/infra/gateways'
import { makeValidator } from '@/main/factories/application/validation'

export const makePatientController = (): PatientController => {
  return new PatientController(makeValidator(), makeTokenHandler(), makeUserRepo(), makePatientRepo())
}
