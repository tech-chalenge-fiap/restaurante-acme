import { makeClientRepo } from '@/main/factories/infra/repos/mysql'
import { ClientController } from '@/application/controllers'

export const makeClientController = (): ClientController => {
  return new ClientController(makeClientRepo())
}
