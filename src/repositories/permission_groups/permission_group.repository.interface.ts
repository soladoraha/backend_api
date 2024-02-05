import { IBaseRepository } from '@repositories/base.repository'
import { PermissionGroupDocument } from '@models/permission_groups/permission_group.model'

export interface IPermissionGroupRepository extends IBaseRepository<PermissionGroupDocument> {
}