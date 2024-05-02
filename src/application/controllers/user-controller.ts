import { UserRepository } from '@/infra/repos/mysql'
import { badRequest, HttpResponse, notFound, ok, serverError } from '@/application/helpers'
import { User } from '@/domain/contracts/repos'
import { TokenHandler } from '@/infra/gateways'
import { EntityError } from '@/infra/errors'
import { Validator } from '@/application/validation'

export class UserController {
  constructor(
    private readonly validator: Validator,
    private readonly tokenHandler: TokenHandler,
    readonly userRepo: UserRepository
  ) { }

  async handleGetUser(httpRequest: any): Promise<HttpResponse> {
    try {
      return await this.getUser(httpRequest)
    } catch (error) {
      return serverError(error)
    }
  }

  async handleCreateUser(httpRequest: User.InsertInput): Promise<HttpResponse> {
    const userEntity = this.userRepo.userEntity();
    const errors = await this.validator.validate(Object.assign(userEntity, httpRequest))
    if (errors.length !== 0) return badRequest(new Error(JSON.stringify(errors)))
    try {
      return await this.createUser(userEntity)
    } catch (error) {
      if (error instanceof EntityError) return badRequest(new Error(error.message))
      return serverError(error)
    }
  }

  async getUser({ userId }: User.FindInput): Promise<HttpResponse<User.FindOutput | Error>> {
    const user = await this.userRepo.findOne({ userId })
    if (user === undefined) return notFound()
    return ok(user)
  }

  async createUser(userData: User.InsertInput): Promise<HttpResponse<User.InsertOutput | Error>> {
    if (userData.password) {
      userData.password = await this.tokenHandler.encrypt(userData.password)
    }

    if(!userData.userId) userData.userId = this.tokenHandler.generateUuid()
    
    const user = await this.userRepo.insert(userData)
    if (user === undefined) return badRequest(new Error('Cant insert user'))
    return ok({ userId: user.userId, name: user.name })
  }
}
