import { makeUserRepo } from '@/main/factories/infra/repos/mysql'
import { UserController } from '@/application/controllers'
import { makeTokenHandler } from '@/main/factories/infra/gateways'
import { makeValidator } from '@/main/factories/application/validation'

export const makeUserController = (): UserController => {
  return new UserController(makeValidator(), makeTokenHandler(), makeUserRepo())
}
