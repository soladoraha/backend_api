import { Serializer } from 'jsonapi-serializer'
import { injectable } from "inversify"
import { UserDocument } from '@models/users/user.model'

@injectable()
export class UserAuthUpdateSerializer{
  private serializer: Serializer

  constructor() {
    this.serializer = new Serializer('users', {
      attributes: ['_id', 'code', 'name', 'roles'],
      keyForAttribute: 'snake_case'
    })
  }

  public serialize(data: UserDocument | null): Record<string, any> {
    return this.serializer.serialize(data)
  }
}
