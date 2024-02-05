import { UserDocument } from '@models/users/user.model'
import { Date, Document } from 'mongoose'

export interface ISession extends Document {
  user: UserDocument['_id']
  valid?: boolean
  userAgent?: string
  createdAt: Date
  updatedAt: Date
}
