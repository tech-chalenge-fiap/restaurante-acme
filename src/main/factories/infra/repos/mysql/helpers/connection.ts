import { MySQLConnection } from '@/infra/repos/mysql/helpers'

export const makeMySQLConnection = (): MySQLConnection => {
  return MySQLConnection.getInstance()
}
