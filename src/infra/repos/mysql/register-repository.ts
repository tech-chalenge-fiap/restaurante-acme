import { MySQLRepository } from '@/infra/repos/mysql/repository'
import { Register } from '@/domain/contracts/repos'
import { EntityError } from '@/infra/errors'

export class RegisterRepository extends MySQLRepository implements Register {
  
  constructor(private readonly clientEntity: Register.GenericType) { super() }

  async findClient ({ cpf }: Register.FindClientInput): Promise<Register.FindClientOutput> {
    const clientRepo = this.getRepository(this.clientEntity)
    const client = await clientRepo.findOne({ where: { cpf } })
    
    if (client !== null) return {
      clientId: client.clientId,
      name: client.name,
      cpf: client.cpf,
      email: client.email
    }
  }

  async findClientById ({ clientId }: Register.FindClientByIdInput): Promise<Register.FindClientOutput> {
    const clientRepo = this.getRepository(this.clientEntity)
    const client = await clientRepo.findOne({ where: { clientId } })
    
    if (client !== null) return {
      id: client.id,
      clientId: client.clientId,
      name: client.name,
      cpf: client.cpf,
      email: client.email
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
