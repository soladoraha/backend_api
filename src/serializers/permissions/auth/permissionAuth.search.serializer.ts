import { Serializer } from 'jsonapi-serializer'
import { injectable } from "inversify"
import { PermissionDocument } from '@models/permissions/permission'

@injectable()
export class PermissionAuthSearchSerializer{
  private serializer: Serializer

  constructor() {
    this.serializer = new Serializer('users', {
      attributes: ['_id' ,'name', 'email', 'permission_group'],
      keyForAttribute: 'snake_case',
    })
  }

  public serialize(data: PermissionDocument[] | null, total: number, limit: number, page: number): Record<string, any> {
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
