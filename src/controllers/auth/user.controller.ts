import { injectable, inject } from 'inversify'
import { IUserService } from '@services/users/user.service.interface'
import { Request, Response } from 'express'
import { IUserRepository } from '@repositories/users/user.repository.interface'
import { BaseController } from '@controllers/base.controller'
import { UserDocument } from '@models/users/user.model'
import { UserAuthSearchSerializer } from '@serializers/users/auth/userAuth.search.serializer'
import { UserAuthDetailSerializer } from '@serializers/users/auth/userAuth.detail.serializer'
import { UserAuthCreateSerializer } from '@serializers/users/auth/userAuth.create.serializer'
import { UserAuthUpdateSerializer } from '@serializers/users/auth/userAuth.update.serializer'

// Customize Request to get user info
interface UserRequest extends Request {
  user?: UserDocument
}

@injectable()
class UserAuthController extends BaseController {
  private userService: IUserService
  private userRepository: IUserRepository

  // Service and repository to get from container inversify
  constructor(
    @inject('UserService') userService: IUserService,
    @inject('UserRepository') userRepository: IUserRepository
  ) {
    super()
    this.userService = userService
    this.userRepository = userRepository
  }

  async search(req: UserRequest, res: Response) {
    try {
      const roles = await this.userRepository.paginate(req, {
        populate: [
          {
            path: 'roles',
            select: '_id code name',
            model: 'Role',
            populate: {
              path: 'permissions',
              select: '_id code name',
              model: 'Permission'
            }
          },
        ],
      })
      const serialized = new UserAuthSearchSerializer().serialize(
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

  async getUserInfo(req: UserRequest, res: Response) {
    try {
      const userId = req.user?._id;
      const user = await this.userRepository.findById(userId)
      const serializedUser = new UserAuthDetailSerializer().serialize(user)
      return res.status(200).json(serializedUser)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  async detail(req: Request, res: Response) {
    try {
      req.body._id = req.params.userId || null
      const user = await this.userRepository.findById(req.body)
      const serializedUser = new UserAuthDetailSerializer().serialize(user)
      return res.status(200).json(serializedUser)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  async create(req: Request, res: Response) {
    try {
      const user = await this.userRepository.create(req.body)
      const serializedUser = new UserAuthCreateSerializer().serialize(user)
      return res.status(200).json(serializedUser)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  async update(req: Request, res: Response) {
    try {
      req.body._id = req.params.userId || null
      const user = await this.userRepository.update(req.body._id, req.body)
      const serializedUser = new UserAuthUpdateSerializer().serialize(user)
      return res.status(200).json(serializedUser)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  async deleted(req: Request, res: Response) {
    try {
      req.body._id = req.params.userId || null
      const user = await this.userRepository.delete(req.body._id)
      if (typeof user === 'undefined') {
        return res.status(200).json({ message: 'Id not exist' })
      }
      return res.status(200).json({ message: 'Complete deleted' })
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }
}

export default UserAuthController
