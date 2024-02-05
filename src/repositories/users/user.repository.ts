import { injectable } from "inversify"
import { BaseRepository } from '@repositories/base.repository'
import { UserDocument, UserModel } from '@models/users/user.model'
import { IUserRepository } from '@repositories/users/user.repository.interface'
import { Types } from "mongoose"

@injectable()
export class UserRepository extends BaseRepository<UserDocument> implements IUserRepository {
  constructor() {
    super(UserModel)
  }
  async getPermission(id: Types.ObjectId): Promise<UserDocument | null> {
    return await this.findOne(
      { _id: id },
      {
        populate: [
          {
            path: 'roles',
            select: '_id code name',
            model: 'Role',
            populate: {
              path: 'permissions',
              select: '_id code name',
              model: 'Permission',
            },
          },
        ],
      }
    )
  }
}