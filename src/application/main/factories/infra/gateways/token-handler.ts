import { env } from '@/application/main/config/env'
import { TokenHandler } from '@/infra/gateways'

export const makeTokenHandler = (): TokenHandler => {
  return new TokenHandler(env.apiAccessKey ?? '')
}