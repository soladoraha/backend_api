import { Serializer } from 'jsonapi-serializer'
import { injectable } from "inversify"
import { RoleDocument } from '@models/roles/role.model'

@injectable()
export class RoleAuthSearchSerializer{
  private serializer: Serializer

  constructor() {
    this.serializer = new Serializer('roles', {
      attributes: ['_id', 'code', 'name', 'permissions'],
      keyForAttribute: 'snake_case'
    })
  }

  public serialize(data: RoleDocument[] | null, total: number, limit: number, page: number): Record<string, any> {
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
