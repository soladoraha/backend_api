import { injectable } from 'inversify'
import { BaseRepository } from '@repositories/base.repository'
import { RoleDocument, RoleModel } from '@models/roles/role.model'
import { IRoleRepository } from './role.repository.interface'

@injectable()
export class RoleRepository extends BaseRepository<RoleDocument> implements IRoleRepository {
  constructor() {
    super(RoleModel)
  }
}
