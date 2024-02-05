import { Date, Document } from 'mongoose'

export interface IPerminssionGroup extends Document {
  code: string
  name: string
  createdAt: Date
  updatedAt: Date
}
