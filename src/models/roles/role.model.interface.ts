import { IPerminssion } from '@models/permissions/permission.model.interface'
import { Date, Document } from 'mongoose'

export interface IRole extends Document {
  code: string
  name: string
  permissions: IPerminssion['_id'][]
  createdAt: Date
  updatedAt: Date
}
