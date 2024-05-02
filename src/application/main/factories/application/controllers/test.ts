import { makeTestRepo } from '@/application/main/factories/infra/repos/mysql'
import { TestController } from '@/application/controllers'
import { makeTokenHandler } from '@/application/main/factories/infra/gateways'
import { makeValidator } from '@/application/main/factories/application/validation'

export const makeTestController = (): TestController => {
  return new TestController(makeValidator(), makeTokenHandler(), makeTestRepo())
}
