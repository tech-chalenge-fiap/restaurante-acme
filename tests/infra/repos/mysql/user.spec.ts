import { UserRepository } from '@/infra/repos/mysql'
import { UserEntity } from '@/infra/repos/mysql/entities'
import { MySQLConnection, GenericType } from '@/infra/repos/mysql/helpers'
import { MySQLRepository } from '@/infra/repos/mysql/repository'

import { Repository } from 'typeorm'

jest.setTimeout(36000)
describe('UserRepository', () => {
  let sut: UserRepository
  let mysql: MySQLConnection
  let connection: GenericType
  let clientRepo: Repository<UserEntity>

  beforeAll(async () => {
    mysql = MySQLConnection.getInstance()
    connection = await mysql.initialize()
  })

  beforeEach(() => {
    sut = new UserRepository(connection)
  })

  it('should extend MySQLRepository', async () => {
    expect(sut).toBeInstanceOf(MySQLRepository)
  })

  it('should return if client exists exists', async () => {
    clientRepo = sut.getRepository(UserEntity)
    const client = await sut.findOne({ id: 1 })
    expect(client?.id).toEqual(1)
  })
})
