import { UserDocument } from '@models/users/user.model'
import { injectable, inject } from 'inversify'
import { Request, Response, NextFunction, RequestHandler } from 'express'
import { IUserRepository } from '@repositories/users/user.repository.interface'
import { get } from 'lodash'
import Message from '@configs/message'

interface AuthenticateRequest extends Request {
  user?: UserDocument
}

@injectable()
export class Auth {
  protected userRepository: IUserRepository
  constructor(@inject('UserRepository') userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  isAllow = (routerAs: string): RequestHandler => {
    return async (req: AuthenticateRequest, res: Response, next: NextFunction) => {
      // Get all permissions by User
      const user = await this.userRepository.getPermission(get(req, 'user._id'))
      const permissions = (await get(user, 'roles.permissions')) as any

      if (typeof permissions !== 'undefined') {
        if (permissions.some((permission: any) => permission.code === routerAs)) {
          return next()
        }
      }

      let error = new Error(await Message.get('auth_no_permission'))
      return res.status(500).json({ success: false, error: error.message })
    }
  }
}

export default Auth
