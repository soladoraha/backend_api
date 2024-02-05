import { Serializer } from 'jsonapi-serializer'
import { injectable } from "inversify"
import { PermissionGroupDocument } from '@models/permission_groups/permission_group.model'

@injectable()
export class PermissionGroupAuthSearchSerializer{
  private serializer: Serializer

  constructor() {
    this.serializer = new Serializer('permission_groups', {
      attributes: ['_id', 'code', 'name', 'permission_group'],
      keyForAttribute: 'snake_case',
    })
  }

  public serialize(data: PermissionGroupDocument[] | null, total: number, limit: number, page: number): Record<string, any> {
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
