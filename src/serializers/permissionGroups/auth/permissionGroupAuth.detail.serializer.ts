import { Serializer } from 'jsonapi-serializer'
import { injectable } from "inversify"
import { PermissionGroupDocument } from '@models/permission_groups/permission_group.model'

@injectable()
export class PermissionGroupAuthDetailSerializer{
  private serializer: Serializer

  constructor() {
    this.serializer = new Serializer('permission_groups', {
      attributes: ['_id' ,'code' ,'name', 'permission_group'],
      keyForAttribute: 'snake_case',
    })
  }

  public serialize(data: PermissionGroupDocument | null): Record<string, any> {
    return this.serializer.serialize(data)
  }
}
