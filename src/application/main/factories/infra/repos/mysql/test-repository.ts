import { TestRepository } from '@/infra/repos/mysql'
import { makeMySQLConnection } from '@/application/main/factories/infra/repos/mysql/helpers'

export const makeTestRepo = (): TestRepository => {
  return new TestRepository(makeMySQLConnection())
}
