import { IPerminssionGroup } from '@models/permission_groups/permission_group.model.interface'
import { Date, Document } from 'mongoose'

export interface IPerminssion extends Document {
  code: string
  name: string
  permission_group: IPerminssionGroup['_id']
  createdAt: Date
  updatedAt: Date
}
