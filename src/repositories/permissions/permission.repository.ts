import { injectable } from 'inversify'
import { BaseRepository } from '@repositories/base.repository'
import { PermissionDocument, PermissionModel } from '@models/permissions/permission'
import { IPermissionRepository } from './permission.repository.interface'

@injectable()
export class PermissionRepository extends BaseRepository<PermissionDocument> implements IPermissionRepository {
  constructor() {
    super(PermissionModel)
  }
}
