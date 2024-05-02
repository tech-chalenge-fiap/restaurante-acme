import { PatientRepository } from '@/infra/repos/mysql'
import { makeMySQLConnection } from '@/application/main/factories/infra/repos/mysql/helpers'

export const makePatientRepo = (): PatientRepository => {
  return new PatientRepository(makeMySQLConnection())
}
