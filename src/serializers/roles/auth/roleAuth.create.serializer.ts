import { Serializer } from 'jsonapi-serializer'
import { injectable } from "inversify"
import { RoleDocument } from '@models/roles/role.model'

@injectable()
export class RoleAuthCreateSerializer{
  private serializer: Serializer

  constructor() {
    this.serializer = new Serializer('roles', {
      attributes: ['_id' ,'code' ,'name', 'permissions'],
      keyForAttribute: 'snake_case',
    })
  }

  public serialize(data: RoleDocument | any): Record<string, any> {
    return this.serializer.serialize(data)
  }
}
