import { Client } from '@/infra/repos/mysql/entities'
import { MySQLRepository } from '@/infra/repos/mysql/repository'
import { LoadClient } from '@/domain/contracts/repos'

export class ClientRepository extends MySQLRepository implements LoadClient {
  async getById ({ id }: LoadClient.Input): Promise<LoadClient.Output> {
    const clientRepo = this.getRepository(Client)
    const client = await clientRepo.findOne({ where: { id } })
    if (client !== null) {
      return {
        id: client.id,
        name: client.name ?? undefined
      }
    }
  }
}
