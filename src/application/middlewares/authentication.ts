import { forbidden, HttpResponse, ok } from '@/application/helpers'
import { RequiredString } from '@/application/validation'
import { Middleware } from '@/application/middlewares'
import { env } from '@/main/config/env'
import { logger } from '@/infra/helpers'

type HttpRequest = { authorization?: string, ip?: string }
type Model = Error | { apiName: string }
type Authorize = (input: { token: string }) => Promise<string>

export class AuthenticationMiddleware implements Middleware {
  constructor (private readonly authorize: Authorize) {}

  async handle ({ authorization, ip }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      if (
        !this.validateAuthorization({ authorization }) ||
        !this.validateIp({ ip })) return forbidden()
        const apiName = await this.authorize({ token: authorization! })
        return ok({ apiName })
    } catch (error) {
      logger.warn(error instanceof Error ? error.message : 'unknown error')
      return forbidden()
    }
  }

  private validateAuthorization ({ authorization }: HttpRequest): boolean {
    const error = new RequiredString(authorization!, 'authorization').validate()
    const valid = error === undefined
    if (!valid) throw new Error(`Unknown Authorization: ${authorization}`)
    return valid
  }

  private validateIp ({ ip }: HttpRequest): boolean {
    const whitelist = env.whitelistIps?.split(',') ?? []
    const valid = whitelist.includes(ip!)
    if (!valid) throw new Error(`Unknown IP: ${ip}`)
    return valid
  }
}