import { MySQLConnection } from '@/infra/repos/mysql/helpers'

export const makeMySQLConnection = (): MySQLConnection => {
  const connection = MySQLConnection.getInstance()
  return connection
}
