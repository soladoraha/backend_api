import { injectable, inject } from 'inversify'
import { IUserService } from '@services/users/user.service.interface'
import { Request, Response } from 'express'
import { IUserRepository } from '@repositories/users/user.repository.interface'
import { BaseController } from '@controllers/base.controller'
import { UserNormalRegisterSerializer } from '@serializers/users/normal/userNormal.register.serializer'
import { UserNormalLoginSerializer } from '@serializers/users/normal/userNormal.login.serializer'
import { UserNormalRefreshTokenSerializer } from '@serializers/users/normal/userNormal.refreshToken.serializer'
import { UserValidate } from '@validators/normal/users/user.validator'
import Message from '@configs/message'

@injectable()
class UserNormalController extends BaseController {
  private userService: IUserService
  private userRepository: IUserRepository

  constructor(
    @inject('UserService') userService: IUserService,
    @inject('UserRepository') userRepository: IUserRepository
  ) {
    super()
    this.userService = userService
    this.userRepository = userRepository
  }

  async login(req: Request, res: Response) {
    try {
      const user = await this.userService.login(req.body)
      if (!user) {
        let error = new Error(await Message.get('auth_email_or_password_invalid'));
        return this.sendErrorResponse(res, error)
      }
      const serializedUserLogin = new UserNormalLoginSerializer().serialize(user)
      return res.status(200).json(serializedUserLogin)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }
  
  async register(req: Request, res: Response) {
    try {
      new UserValidate().validateRequest(req)
      const userRegister = await this.userService.register(req.body)
      if(!userRegister) {
        let error = new Error(await Message.get('auth_account_exists'))
        return this.sendErrorResponse(res, error)
      }
      const serializedUser = new UserNormalRegisterSerializer().serialize(userRegister)
      return res.status(200).json(serializedUser)
    } catch (error: any) {
      return this.sendErrorResponse(res, error)
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const user = await this.userService.refreshToken(req)
      if (!user) {
        let error = new Error(await Message.get('auth_refresh_token_invalid'));
        return this.sendErrorResponse(res, error)
      }
      const serializedUserRefresh = new UserNormalRefreshTokenSerializer().serialize(user)
      return res.status(200).json(serializedUserRefresh)
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }
}

export default UserNormalController
