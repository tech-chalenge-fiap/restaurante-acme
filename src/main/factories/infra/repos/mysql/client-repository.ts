import { MySQLClientRepository } from '@/infra/repos/mysql'
import { MySQLConnection } from '@/infra/repos/mysql/helpers'

export const makeMySQLCLientRepo = (): MySQLClientRepository => {
  const mysql = MySQLConnection.getInstance()
  mysql.initialize()
  return new MySQLClientRepository(mysql)
}
