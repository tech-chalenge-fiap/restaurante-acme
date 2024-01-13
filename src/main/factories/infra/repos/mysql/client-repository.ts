import { ClientRepository } from '@/infra/repos/mysql'
import { MySQLConnection } from '@/infra/repos/mysql/helpers'

export const makeClientRepo = (): ClientRepository => {
  const connection = MySQLConnection.getInstance()
  connection.initialize()
  return new ClientRepository(connection)
}
