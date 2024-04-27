import { makeTestRepo } from '@/main/factories/infra/repos/mysql'
import { TestController } from '@/application/controllers'
import { makeTokenHandler } from '@/main/factories/infra/gateways'
import { makeValidator } from '@/main/factories/application/validation'

export const makeTestController = (): TestController => {
  return new TestController(makeValidator(), makeTokenHandler(), makeTestRepo())
}
