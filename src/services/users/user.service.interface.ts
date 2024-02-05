import { SessionDocument } from '@models/sessions/session.model'
import { UserDocument } from '@models/users/user.model'
import { Request } from 'express'

export interface IUserService {
  getUsers(): Promise<UserDocument[]>
  getUserById(id: string): Promise<UserDocument>
  register(input: UserDocument): Promise<UserDocument | boolean>
  login(input: UserDocument): Promise<string | boolean | any>
  refreshToken(req: Request): Promise<string | boolean | any>
  validatePassword(input: UserDocument): Promise<UserDocument | boolean>
  createAccessToken(user: UserDocument, session: SessionDocument): Promise<string>
  createRefreshToken(session: SessionDocument): Promise<string>
}
