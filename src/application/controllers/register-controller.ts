import { RegisterRepository } from '@/infra/repos/mysql'
import { badRequest, HttpResponse, notFound, ok, serverError } from '@/application/helpers'
import { Register } from '@/domain/contracts/repos'
import { TokenHandler } from '@/infra/gateways'
import { EntityError } from '@/infra/errors'
import { Validator } from '@/application/validation'

export class RegisterController {
  constructor(
    private readonly validator: Validator,
    private readonly tokenHandler: TokenHandler,
    readonly registerRepo: RegisterRepository
  ) { }

  async handleGetClient(httpRequest: any): Promise<HttpResponse> {
    try {
      return await this.getClient(httpRequest)
    } catch (error) {
      return serverError(error)
    }
  }

  async handleCreateClient(httpRequest: Register.InsertClientInput): Promise<HttpResponse> {
    const clientEntity = this.registerRepo.getClientEntity();
    const errors = await this.validator.validate(Object.assign(clientEntity, httpRequest))
    if (errors.length !== 0) return badRequest(new Error(JSON.stringify(errors)))
    try {
      return await this.createClient(clientEntity)
    } catch (error) {
      if (error instanceof EntityError) return badRequest(new Error(error.message))
      return serverError(error)
    }
  }

  async getClient({ cpf }: Register.FindClientInput): Promise<HttpResponse<Register.FindClientOutput | Error>> {
    const client = await this.registerRepo.findClient({ cpf })
    if (client === undefined) return notFound()
    return ok(client)
  }

  async createClient(clientData: Register.InsertClientInput): Promise<HttpResponse<Register.InsertClientOutput | Error>> {
    if(!clientData.clientId) clientData.clientId = this.tokenHandler.generateUuid()
    
    const client = await this.registerRepo.insertClient(clientData)
    if (client === undefined) return badRequest(new Error('Cant insert client'))
    return ok({ clientId: client.clientId, name: client.name })
  }
}
