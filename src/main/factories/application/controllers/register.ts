import { makeRegisterRepo } from '@/main/factories/infra/repos/mysql'
import { RegisterController } from '@/application/controllers'
import { makeTokenHandler } from '@/main/factories/infra/gateways'
import { makeValidator } from '@/main/factories/application/validation'

export const makeRegisterController = (): RegisterController => {
  return new RegisterController(makeValidator(), makeTokenHandler(), makeRegisterRepo())
}

