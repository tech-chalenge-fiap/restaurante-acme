import { forbidden, HttpResponse, ok } from '@/application/helpers'
import { Middleware } from '@/application/middlewares'
import { env } from '@/main/config/env'
import { logger } from '@/infra/helpers'
import { Validator } from '@/application/validation'
import { TokenHandler } from '@/infra/gateways'

type HttpRequest = { authorization?: string, ip?: string }
type AuthorizationRequest = { authorization?: string, ip?: string }
type Model = Error | { apiName: string }


export class AuthenticationMiddleware implements Middleware {
  constructor (private readonly tokenHandler: TokenHandler, private readonly validator: Validator) {}

  async handle ({ authorization, ip }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const checkIpAuthorization = env.checkIpAuthorization
      if(checkIpAuthorization && !this.validateIp({ ip })) return forbidden()
      if (!this.validateAuthorization({ authorization })) return forbidden()
        const authorize = this.tokenHandler.validate.bind(this.tokenHandler)
        const apiName = await authorize({ token: authorization! })
        return ok({ apiName })
    } catch (error) {
      logger.warn(error instanceof Error ? error.message : 'unknown error')
      return forbidden()
    }
  }

  private async validateAuthorization ({ authorization }: AuthorizationRequest): Promise<boolean> {
    const auth = this.tokenHandler.authorization()
    auth.token = authorization ?? ''
    const errors = await this.validator.validate(auth)
    if (errors.length === 0) return true
    return false
  }

  private validateIp ({ ip }: HttpRequest): boolean {
    const whitelist = env.whitelistIps?.split(',') ?? []
    const valid = whitelist.includes(ip!)
    if (!valid) throw new Error(`Ip not allowed: ${ip}`)
    return valid
  }
}