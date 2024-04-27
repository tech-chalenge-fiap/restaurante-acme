import { UserEntity } from '@/infra/repos/mysql/entities'
import { MySQLRepository } from '@/infra/repos/mysql/repository'
import { User } from '@/domain/contracts/repos'
import { EntityError } from '@/infra/errors'

export class UserRepository extends MySQLRepository implements User {
  async findOne ({ userId }: User.FindInput): Promise<User.FindOutput> {
    const userRepo = this.getRepository(UserEntity)
    const user = await userRepo.findOne({ where: { userId } })
    
    if (user !== null) return user
  }

  async insert (userData: User.InsertInput): Promise<User.InsertOutput> {
    try{
      const userRepo = this.getRepository(UserEntity)
      const user = await userRepo.insert(userData)
      if (user !== null) {
        return {
          userId: userData.userId
        }
      }
    }catch(error: any) {
      throw new EntityError(error.message)
    }
    
  }

  userEntity = () => new UserEntity()
}
