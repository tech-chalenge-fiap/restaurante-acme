import { adaptExpressMiddleware } from '@/application/main/adapters'
import { makeAuthenticationMiddleware } from '@/application/main/factories/application/middlewares'

export const auth = adaptExpressMiddleware(makeAuthenticationMiddleware())