import { injectable, inject } from 'inversify'
import { BaseService } from '@services/base.service'
import { IRoleService } from '@services/roles/role.service.interface'
import { IRoleRepository } from '@repositories/roles/role.repository.interface'
import { RoleDocument } from '@models/roles/role.model'
import { IPermissionRepository } from '@repositories/permissions/permission.repository.interface'
import Message from '@configs/message'

@injectable()
export class RoleService extends BaseService implements IRoleService {
  private roleRepository: IRoleRepository
  private permissionRepository: IPermissionRepository

  constructor(
    @inject('RoleRepository') roleRepository: IRoleRepository,
    @inject('PermissionRepository') permissionRepository: IPermissionRepository,
  ) {
    super()
    this.roleRepository = roleRepository
    this.permissionRepository = permissionRepository
  }

  async create(params: RoleDocument): Promise<RoleDocument> {
    // check permission exist
    const { code, name, permissions } = params
    if (code) {
      const checkCode = await this.roleRepository.findOne({code: code})
      if(checkCode) {
        const error = new Error(await Message.get('variable_unique', 'code'))
        throw error
      }
    }
    if(permissions) {
      await Promise.all(
        permissions.map(async(value) => {
          let checkPermission = await this.permissionRepository.findOne({_id: value})
          if(!checkPermission) {
            const error = new Error(await Message.get('variable_exist', 'Permission value: ', 'value'))
            throw error
          }
        })
      )
    }
    const data = {
      code: code,
      name: name,
      permissions: permissions
    } as RoleDocument
    return this.roleRepository.create(data)
  }
}
