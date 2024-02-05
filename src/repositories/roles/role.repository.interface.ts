import { RoleDocument } from '@models/roles/role.model'
import { IBaseRepository } from '@repositories/base.repository'

export interface IRoleRepository extends IBaseRepository<RoleDocument> {
}