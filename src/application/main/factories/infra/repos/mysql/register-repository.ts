import { RegisterRepository } from '@/infra/repos/mysql'
import { ClientEntity } from '@/infra/repos/mysql/entities'

export const makeRegisterRepo = (): RegisterRepository => {
  return new RegisterRepository(ClientEntity)
}
