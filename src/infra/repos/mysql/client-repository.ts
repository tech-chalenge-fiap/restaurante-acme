import { ClientEntity } from '@/infra/repos/mysql/entities'
import { MySQLRepository } from '@/infra/repos/mysql/repository'
import { Client } from '@/domain/contracts/repos'

export class ClientRepository extends MySQLRepository implements Client {
  async getById ({ id }: Client.Input): Promise<Client.Output> {
    const clientRepo = this.getRepository(ClientEntity)
    const client = await clientRepo.findOne({ where: { id } })
    if (client !== null) {
      return {
        id: client.id,
        name: client.name ?? undefined
      }
    }
  }
}
