import { injectable } from 'inversify'
import { BaseRepository } from '@repositories/base.repository'
import { IPermissionGroupRepository } from './permission_group.repository.interface'
import { PermissionGroupDocument, PermissionGroupModel } from '@models/permission_groups/permission_group.model'

@injectable()
export class PermissionGroupRepository extends BaseRepository<PermissionGroupDocument> implements IPermissionGroupRepository {
  constructor() {
    super(PermissionGroupModel)
  }
}
