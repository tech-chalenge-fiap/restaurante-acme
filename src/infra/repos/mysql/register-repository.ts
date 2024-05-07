import { MySQLRepository } from '@/infra/repos/mysql/repository'
import { Register } from '@/domain/contracts/repos'
import { EntityError } from '@/infra/errors'

export class RegisterRepository extends MySQLRepository implements Register {
  
  constructor(private readonly clientEntity: Register.GenericType) { super() }

  async findClient ({ clientId }: Register.FindClientInput): Promise<Register.FindClientOutput> {
    const clientRepo = this.getRepository(this.clientEntity)
    const client = await clientRepo.findOne({ where: { clientId } })
    
    if (client !== null) return {
      clientId: client.clientId,
      name: client.name,
      registration: client.registration,
      email: client.email,
      orders: client.orders
    }
  }

  async insertClient (clientData: Register.InsertClientInput): Promise<Register.InsertClientOutput> {
    try{
      const clientRepo = this.getRepository(this.clientEntity)
      const client = await clientRepo.insert(clientData)
      if (client !== null) {
        return {
          clientId: clientData.clientId,
          name: clientData.name
        }
      }
    }catch(error: any) {
      throw new EntityError(error.message)
    }
    
  }

  getClientEntity = () => new this.clientEntity()
}
