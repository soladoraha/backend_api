
import { IRoleDocument } from '@models/roles/role.model'
import { Date, Document } from 'mongoose'

export interface IUser extends Document {
  userName: string
  roles: IRoleDocument['_id']
  email: string
  password: string
  firstName: string
  lastName: string
  fullName: string
  isActive: number
  createdAt?: Date
  updatedAt?: Date
}