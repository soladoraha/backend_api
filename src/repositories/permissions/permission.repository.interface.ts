import { IBaseRepository } from '@repositories/base.repository'
import { PermissionDocument } from '@models/permissions/permission'

export interface IPermissionRepository extends IBaseRepository<PermissionDocument> {
}