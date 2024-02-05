import bcrypt from 'bcrypt'
import config from 'config'
import { IUserService } from '@services/users/user.service.interface'
import { injectable, inject } from 'inversify'
import { UserDocument, UserModel } from '@models/users/user.model'
import { BaseService } from '@services/base.service'
import { IUserRepository } from '@repositories/users/user.repository.interface'
import { ISessionRepository } from '@repositories/sessions/session.repository.interface'
import { SessionDocument } from '@models/sessions/session.model'
import { decode, sign } from '@utils/jwt.utils'
import { get } from 'lodash'
import { Request } from 'express'

@injectable()
export class UserService extends BaseService implements IUserService {
  private userRepository: IUserRepository
  private sessionRepository: ISessionRepository
  private accessTokenTl: string
  private refreshTokenTl: string

  constructor(
    @inject('UserRepository') userRepository: IUserRepository,
    @inject('SessionRepository') sessionRepository: ISessionRepository
  ) {
    super()
    this.userRepository = userRepository
    this.sessionRepository = sessionRepository

    // Env setting
    this.accessTokenTl = config.get('access_token_tl') as string
    this.refreshTokenTl = config.get('refresh_token_tl') as string
  }

  async getUsers(): Promise<any> {
    return UserModel.find({})
  }

  async getUserById(id: string): Promise<any> {
    // return user from database by id
  }

  async register(input: UserDocument): Promise<UserDocument | boolean> {
    const checkEmail = await this.userRepository.findOne({ email: input.email })
    if (checkEmail) {
      return false
    }
    const data = {
      userName: get(input, 'userName'),
      roles: get(input, 'roles'),
      email: get(input, 'email'),
      password: get(input, 'password'),
      firstName: get(input, 'firstName'),
      lastName: get(input, 'lastName'),
      fullName: get(input, 'firstName', '') + ' ' + get(input, 'lastName', ''),
      isActive: get(input, 'is_active', 1),
    } as UserDocument
    return this.userRepository.create(data)
  }

  async login(params: UserDocument): Promise<string | boolean | any> {
    try {
      // validate the email and password
      const user = await this.validatePassword(params)
      if (user) {
        // Create a session
        const sessionParam = {
          user: get(user, '_id'),
        } as SessionDocument
        const session = await this.sessionRepository.create(sessionParam)

        // Create Access Token
        const accessToken = await this.createAccessToken(user as UserDocument, session)

        // Create refresh Token
        const refreshToken = await this.createRefreshToken(session)

        return {...user as UserDocument, accessToken, refreshToken }
      } else {
        return false
      }
    } catch (error: any) {
      throw error
    }
  }

  async refreshToken(req: Request): Promise<string | boolean | any> {
    try {
      const refreshToken = get(req, "headers.authorization", "").replace(/^Bearer\s/,"")
      // Decode the refresh token
      const { decoded } = decode(refreshToken)
      if (!decoded || !get(decoded, 'session')) {
        return false
      }
      // Get the session
      const session = await this.sessionRepository.findById({_id: get(decoded, 'session')})

      // Make sure the session is still valid
      if (!session || !session?.valid) return false

      const user = await this.userRepository.findOne({_id: get(session, 'user')})

      if (!user) return false
      
      // Create Access Token
      const accessToken = await this.createAccessToken(user, session)

      return {...user, accessToken }
    } catch (error: any) {
      return false
    }
  }

  async validatePassword({ email, password }: UserDocument): Promise<UserDocument | boolean> {
    // Check Email
    const user = await this.userRepository.findOne({ email: email })
    if (!user) {
      return false
    } else {
      // Check Password
      const checkPassword = await bcrypt.compare(password, user.password)
      if (checkPassword) {
        return user
      } else {
        return false
      }
    }
  }

  async createAccessToken(user: UserDocument, session: SessionDocument): Promise<string> {
    // Build and return the new access token
    const accessToken = sign(
      { ...user, session: session._id },
      { expiresIn: this.accessTokenTl } // 15 minutes
    )
    return accessToken
  }

  async createRefreshToken(session: SessionDocument): Promise<string> {
     // Build and return the new refresh token
     const refreshToken = sign(
      { session: session._id },
      { expiresIn: this.refreshTokenTl } // 15 minutes
    )
    return refreshToken
  }
}
