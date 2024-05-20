import { makeTokenHandler } from '@/application/main/factories/infra/gateways'
import { makeValidator } from '@/application/main/factories/application/validation'
import { AuthenticationMiddleware } from '@/application/middlewares'

export const makeAuthenticationMiddleware = (): AuthenticationMiddleware => {
  return new AuthenticationMiddleware(makeTokenHandler(), makeValidator())
}