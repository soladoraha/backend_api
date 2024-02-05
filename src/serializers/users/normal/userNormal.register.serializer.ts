import { Serializer } from 'jsonapi-serializer'
import { injectable } from 'inversify'
import { UserDocument } from '@models/users/user.model'

@injectable()
export class UserNormalRegisterSerializer {
  private serializer: Serializer

  constructor() {
    this.serializer = new Serializer('users', {
      attributes: ['_id','userName', 'email'],
      keyForAttribute: 'camelCase',
    })
  }

  public serialize(data: UserDocument | boolean): Record<string, any> {
    return this.serializer.serialize(data)
  }
}
