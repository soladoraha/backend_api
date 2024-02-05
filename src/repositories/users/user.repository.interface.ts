import { IBaseRepository } from '@repositories/base.repository'
import { UserDocument } from '@models/users/user.model'
import { Types } from 'mongoose'

export interface IUserRepository extends IBaseRepository<UserDocument> {
  getPermission(id: Types.ObjectId): Promise<UserDocument | null>
}