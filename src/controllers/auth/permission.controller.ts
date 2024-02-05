import { injectable, inject } from 'inversify'
import { BaseController } from '@controllers/base.controller'
import { NextFunction, Request, Response } from 'express'
import { IPermissionRepository } from '@repositories/permissions/permission.repository.interface'
import { PermissionAuthCreateSerializer } from '@serializers/permissions/auth/permissionAuth.create.serializer'
import { PermissionCreateValidate } from '@validators/auth/permissions/permission.create.validator'
import { PermissionAuthDetailSerializer } from '@serializers/permissions/auth/permissionAuth.detail.serializer'
import { PermissionAuthSearchSerializer } from '@serializers/permissions/auth/permissionAuth.search.serializer'
import { PermissionAuthUpdateSerializer } from '@serializers/permissions/auth/permissionAuth.update.serializer'

@injectable()
class PermissionAuthController extends BaseController {
  private permissionRepository: IPermissionRepository

  constructor(@inject('PermissionRepository') permissionRepository: IPermissionRepository) {
    super()
    this.permissionRepository = permissionRepository
  }

  async search(req: Request, res: Response) {
    try {
      const permissions = await this.permissionRepository.paginate(req, {
        populate: {
          path: 'permission_group',
          select: '_id code name',
          model: 'PermissionGroup',
        },
      })
      const serialized = new PermissionAuthSearchSerializer().serialize(
        permissions['data'],
        permissions['total'],
        permissions['limit'],
        permissions['page']
      )
      return res.status(200).json(serialized)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  async detail(req: Request, res: Response) {
    try {
      req.body._id = req.params.permissionId || null
      const permission = await this.permissionRepository.findById(req.body, {
        populate: {
          path: 'permission_group',
          select: '_id code name',
          model: 'PermissionGroup',
        }
      })
      const serialized = new PermissionAuthDetailSerializer().serialize(permission)
      return res.status(200).json(serialized)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  async create(req: Request, res: Response) {
    try {
      const checkValidate = await new PermissionCreateValidate().validateRequest(req)
      const permission = await this.permissionRepository.create(req.body)
      const permissionResult = await this.permissionRepository.findOne(
        { _id: permission._id },
        {
          populate: {
            path: 'permission_group',
            select: '_id code name',
            model: 'PermissionGroup',
          },
        }
      )
      const serialized = new PermissionAuthCreateSerializer().serialize(permissionResult)
      return res.status(200).json(serialized)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  async update(req: Request, res: Response) {
    try {
      req.body._id = req.params.permissionId || null
      // check code là duy nhất
      const permission = await this.permissionRepository.update(req.body._id, req.body)
      const permissionResult = await this.permissionRepository.findOne(
        { _id: req.body._id },
        {
          populate: {
            path: 'permission_group',
            select: '_id code name',
            model: 'PermissionGroup',
          },
        }
      )
      const serialized = new PermissionAuthUpdateSerializer().serialize(permissionResult)
      return res.status(200).json(serialized)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  async deleted(req: Request, res: Response) {
    try {
      req.body._id = req.params.permissionId || null
      const permission = await this.permissionRepository.delete(req.body._id)
      console.log('permission')
      console.log(permission)
      if (typeof permission === 'undefined' || !permission) {
        return res.status(200).json({ message: 'Id not exist' })
      }
      return res.status(200).json({ message: 'Complete deleted' })
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }
}

export default PermissionAuthController
