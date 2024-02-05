import { Serializer } from 'jsonapi-serializer'
import { injectable } from "inversify"
import { UserDocument } from '@models/users/user.model'

@injectable()
export class UserAuthSearchSerializer{
  private serializer: Serializer

  constructor() {
    this.serializer = new Serializer('users', {
      attributes: ['_id', 'userName', 'email', 'roles'],
      keyForAttribute: 'snake_case'
    })
  }

  public serialize(data: UserDocument[] | null, total: number, limit: number, page: number): Record<string, any> {
    const datas = this.serializer.serialize(data)
    return {
      ...datas,
      meta: {
        total: total,
        limit: limit,
        page: page
      },
    }
  }
}
