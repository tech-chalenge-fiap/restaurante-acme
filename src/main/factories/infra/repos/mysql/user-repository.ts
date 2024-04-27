import { UserRepository } from '@/infra/repos/mysql'
import { makeMySQLConnection } from '@/main/factories/infra/repos/mysql/helpers'

export const makeUserRepo = (): UserRepository => {
  return new UserRepository(makeMySQLConnection())
}
