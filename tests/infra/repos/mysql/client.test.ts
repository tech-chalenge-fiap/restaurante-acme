import { ClientRepository } from '@/infra/repos/mysql'
import { Client } from '@/infra/repos/mysql/entities'
import { MySQLConnection, GenericType } from '@/infra/repos/mysql/helpers'
import { MySQLRepository } from '@/infra/repos/mysql/repository'

import { Repository } from 'typeorm'

jest.setTimeout(36000)
describe('ClientRepository', () => {
  let sut: ClientRepository
  let mysql: MySQLConnection
  let connection: GenericType
  let clientRepo: Repository<Client>

  beforeAll(async () => {
    mysql = MySQLConnection.getInstance()
    connection = await mysql.initialize()
  })

  beforeEach(() => {
    sut = new ClientRepository(connection)
  })

  it('should extend MySQLRepository', async () => {
    expect(sut).toBeInstanceOf(MySQLRepository)
  })

  it('should return if client exists exists', async () => {
    clientRepo = sut.getRepository(Client)
    const client = await sut.getById({ id: 1 })
    expect(client?.id).toEqual(1)
  })
})
