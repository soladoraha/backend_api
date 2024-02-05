import { Serializer } from 'jsonapi-serializer'
import { injectable } from 'inversify'
import { UserDocument } from '@models/users/user.model'

interface UserRefreshTokenDocument extends UserDocument {
  accessToken?: string
}

@injectable()
export class UserNormalRefreshTokenSerializer {
  private serializer: Serializer

  constructor() {
    this.serializer = new Serializer('users', {
      attributes: ['_id', 'userName', 'email', 'fullName', 'accessToken', 'refreshToken'],
      keyForAttribute: 'snake_case'
    })
  }

  public serialize(data: UserRefreshTokenDocument | boolean): Record<string, any> {
    return this.serializer.serialize(data)
  }
}
