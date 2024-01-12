import { MySQLClientRepository } from '@/infra/repos/mysql'
import { HttpResponse, notFound, ok} from '@/application/helpers'
import { Controller } from '@/application/controllers'

type HttpRequest = { id: number }
type Model = { id?: number, name?: string }

export class ClientController  extends Controller {
  constructor (private readonly clientRepo: MySQLClientRepository) {super()}

  override async perform ({ id }: HttpRequest): Promise<HttpResponse<Model>> {
    const client = await this.clientRepo.getById({ id })
    if(client == undefined) return notFound({})
    return ok({ id: client.id, name: client.name })
  }
}
