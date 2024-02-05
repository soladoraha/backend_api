import { injectable, inject } from 'inversify'
import { BaseController } from '@controllers/base.controller'
import { IRoleRepository } from '@repositories/roles/role.repository.interface'
import { NextFunction, Request, Response } from 'express'
import { RoleAuthSearchSerializer } from '@serializers/roles/auth/roleAuth.search.serializer'
import { RoleAuthDetailSerializer } from '@serializers/roles/auth/roleAuth.detail.serializer'
import { IRoleService } from '@services/roles/role.service.interface'
import { RoleAuthCreateSerializer } from '@serializers/roles/auth/roleAuth.create.serializer'
import { RoleAuthUpdateSerializer } from '@serializers/roles/auth/roleAuth.update.serializer'
import { RoleCreateValidate } from '@validators/auth/roles/role.create.validator'

@injectable()
class RoleAuthController extends BaseController {
  private roleRepository: IRoleRepository
  private roleService: IRoleService

  constructor(
    @inject('RoleRepository') roleRepository: IRoleRepository,
    @inject('RoleService') roleService: IRoleService
  ) {
    super()
    this.roleRepository = roleRepository
    this.roleService = roleService
  }

  async search(req: Request, res: Response) {
    try {
      const roles = await this.roleRepository.paginate(req, {
        populate: [
          {
            path: 'permissions',
            select: '_id code name',
            model: 'Permission',
          },
        ],
      })
      const serialized = new RoleAuthSearchSerializer().serialize(
        roles['data'],
        roles['total'],
        roles['limit'],
        roles['page']
      )
      return res.status(200).json(serialized)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  async detail(req: Request, res: Response) {
    try {
      req.body._id = req.params.roleId || null
      const role = await this.roleRepository.findById(req.body, {
        populate: [
          {
            path: 'permissions',
            select: '_id code name',
            model: 'Permission',
          },
        ],
      })
      const serialized = new RoleAuthDetailSerializer().serialize(role)
      return res.status(200).json(serialized)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      await new RoleCreateValidate().validateRequest(req)
      const role = await this.roleService.create(req.body)
      const roleResult = await this.roleRepository.findOne(
        { _id: role._id },
        {
          populate: {
            path: 'permissions',
            select: '_id code name',
            model: 'Permission',
          },
        }
      )
      const serialized = new RoleAuthCreateSerializer().serialize(roleResult)
      return res.status(200).json(serialized)
    } catch (error: any) {
      return this.sendErrorResponse(res, error)
    }
  }

  async update(req: Request, res: Response) {
    try {
      req.body._id = req.params.roleId || null
      // check code là duy nhất
      const role = await this.roleRepository.update(req.body._id, req.body)
      const roleResult = await this.roleRepository.findOne(
        { _id: req.body._id },
        {
          populate: {
            path: 'permissions',
            select: '_id code name',
            model: 'Permission',
          },
        }
      )
      const serialized = new RoleAuthUpdateSerializer().serialize(roleResult)
      return res.status(200).json(serialized)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  async deleted(req: Request, res: Response) {
    try {
      req.body._id = req.params.roleId || null
      const role = await this.roleRepository.delete(req.body._id)
      console.log('role')
      console.log(role)
      if (typeof role === 'undefined' || !role) {
        return res.status(200).json({ message: 'Id not exist' })
      }
      return res.status(200).json({ message: 'Complete deleted' })
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }
}

export default RoleAuthController
