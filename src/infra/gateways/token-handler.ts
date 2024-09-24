import { TokenValidator } from '@/domain/contracts/gateways'
import { Authorization } from '@/infra/gateways'

import { JwtPayload, sign, verify } from 'jsonwebtoken'
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export class TokenHandler implements TokenValidator {
  constructor (private readonly secret?: string) {}

  async validate ({ token }: TokenValidator.Input): Promise<TokenValidator.Output> {
    const payload = verify(token, this.secret ?? 'any_secret') as JwtPayload
    return payload.apiName
  }


  async encrypt(data: string): Promise<string> {
    return await bcrypt.hash(data, await bcrypt.genSalt());
  }

  generateUuid = () => uuidv4()


  authorization = () => {
    return new Authorization()
  }
}