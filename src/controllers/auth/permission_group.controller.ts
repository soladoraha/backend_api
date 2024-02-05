import { injectable, inject } from 'inversify'
import { BaseController } from '@controllers/base.controller'
import { Request, Response } from 'express'
import { IPermissionGroupRepository } from '@repositories/permission_groups/permission_group.repository.interface'
import { PermissionGroupAuthSearchSerializer } from '@serializers/permissionGroups/auth/permissionGroupAuth.search.serializer'
import { PermissionGroupAuthDetailSerializer } from '@serializers/permissionGroups/auth/permissionGroupAuth.detail.serializer'
import { PermissionGroupCreateValidate } from '@validators/auth/permissionGroups/permissionGroup.create.validator'
import { PermissionGroupAuthCreateSerializer } from '@serializers/permissionGroups/auth/permissionGroupAuth.create.serializer'
import { PermissionGroupAuthUpdateSerializer } from '@serializers/permissionGroups/auth/permissionGroupAuth.update.serializer'

@injectable()
class PermissionGroupAuthController extends BaseController {
  private permissionGroupRepository: IPermissionGroupRepository

  constructor(@inject('PermissionGroupRepository') permissionGroupRepository: IPermissionGroupRepository) {
    super()
    this.permissionGroupRepository = permissionGroupRepository
  }

  async search(req: Request, res: Response) {
    try {
      const permissionGroups = await this.permissionGroupRepository.paginate(req, {})
      const serialized = new PermissionGroupAuthSearchSerializer().serialize(
        permissionGroups['data'], 
        permissionGroups['total'], 
        permissionGroups['limit'], 
        permissionGroups['page']
      )
      return res.status(200).json(serialized)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  async detail(req: Request, res: Response) {
    try {
      req.body._id = req.params.permissionGroupId || null
      const permissionGroup = await this.permissionGroupRepository.findById(req.body)
      const serialized = new PermissionGroupAuthDetailSerializer().serialize(permissionGroup)
      return res.status(200).json(serialized)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  async create(req: Request, res: Response) {
    try {
      const checkValidate = await new PermissionGroupCreateValidate().validateRequest(req)
      const permissionGroup = await this.permissionGroupRepository.create(req.body)
      const serialized = new PermissionGroupAuthCreateSerializer().serialize(permissionGroup)
      return res.status(200).json(serialized)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  async update(req: Request, res: Response) {
    try {
      req.body._id = req.params.permissionGroupId || null
      // check code là duy nhất 
      const permissionGroup = await this.permissionGroupRepository.update(req.body._id, req.body)
      const serialized = new PermissionGroupAuthUpdateSerializer().serialize(permissionGroup)
      return res.status(200).json(serialized)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  async deleted(req: Request, res: Response) {
    try {
      req.body._id = req.params.permissionGroupId || null
      const permissionGroup = await this.permissionGroupRepository.delete(req.body._id)
      if (typeof permissionGroup === 'undefined' || !permissionGroup) {
        return res.status(200).json({ message: 'Id not exist' })
      }
      return res.status(200).json({ message: 'Complete deleted' })
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }
}

export default PermissionGroupAuthController
