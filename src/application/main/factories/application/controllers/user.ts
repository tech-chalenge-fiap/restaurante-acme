import { makeUserRepo } from '@/application/main/factories/infra/repos/mysql'
import { UserController } from '@/application/controllers'
import { makeTokenHandler } from '@/application/main/factories/infra/gateways'
import { makeValidator } from '@/application/main/factories/application/validation'

export const makeUserController = (): UserController => {
  return new UserController(makeValidator(), makeTokenHandler(), makeUserRepo())
}

