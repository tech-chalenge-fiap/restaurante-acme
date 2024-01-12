import { MySQLClientRepository } from '@/infra/repos/mysql'
import { MySQLClient } from '@/infra/repos/mysql/entities'
import { MySQLConnection, GenericType } from '@/infra/repos/mysql/helpers'
import { MySQLRepository } from '@/infra/repos/mysql/repository'

import { Repository } from 'typeorm'

describe('MySQLClientRepository', () => {
  let sut: MySQLClientRepository
  let mysql: MySQLConnection
  let connection: GenericType
  let clientRepo: Repository<MySQLClient>

  beforeAll(async () => {
    mysql = MySQLConnection.getInstance()
    connection = await mysql.initialize()
  })

  afterAll(async () => {
    await mysql.disconnect()
  })

  beforeEach(() => {
    sut = new MySQLClientRepository(connection)
  })

  it('should extend MySQLRepository', async () => {
    expect(sut).toBeInstanceOf(MySQLRepository)
  })

  it('should return if client exists exists', async () => {
    clientRepo = sut.getRepository(MySQLClient)
    const client = await sut.getById({ id: 1 })
    expect(client?.id).toEqual(1)
  })
})
