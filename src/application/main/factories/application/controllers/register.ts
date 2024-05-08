import { makeRegisterRepo } from '@/application/main/factories/infra/repos/mysql'
import { RegisterController } from '@/application/controllers'
import { makeTokenHandler } from '@/application/main/factories/infra/gateways'
import { makeValidator } from '@/application/main/factories/application/validation'

export const makeRegisterController = (): RegisterController => {
  return new RegisterController(makeValidator(), makeTokenHandler(), makeRegisterRepo())
}

