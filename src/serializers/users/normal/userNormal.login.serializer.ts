import { Serializer } from 'jsonapi-serializer'
import { injectable } from 'inversify'
import { UserDocument } from '@models/users/user.model'
import { Types } from 'mongoose'

interface UserLoginDocument extends UserDocument {
  accessToken?: string
  refreshToken?: string
}

@injectable()
export class UserNormalLoginSerializer {
  private serializer: Serializer

  constructor() {
    this.serializer = new Serializer('users', {
      attributes: ['_id', 'userName', 'email', 'fullName', 'accessToken', 'refreshToken'],
      keyForAttribute: 'snake_case'
    })
  }

  public serialize(data: UserLoginDocument | boolean): Record<string, any> {
    return this.serializer.serialize(data)
  }
}
