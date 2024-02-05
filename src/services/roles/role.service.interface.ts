import { RoleDocument } from '@models/roles/role.model'

export interface IRoleService {
  create(params: RoleDocument): Promise<RoleDocument>
}