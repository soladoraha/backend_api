import { Serializer } from 'jsonapi-serializer'
import { injectable } from "inversify"
import { PermissionDocument } from '@models/permissions/permission'

@injectable()
export class PermissionAuthCreateSerializer{
  private serializer: Serializer

  constructor() {
    this.serializer = new Serializer('permissions', {
      attributes: ['_id' ,'code' ,'name', 'permission_group'],
      keyForAttribute: 'snake_case',
    })
  }

  public serialize(data: PermissionDocument | null): Record<string, any> {
    return this.serializer.serialize(data)
  }
}
