import { Schema, model, Document } from 'mongoose'
import { IRole } from '@models/roles/role.model.interface'

export interface RoleDocument extends IRole, Document {}

const roleSchema = new Schema<RoleDocument>({
  code: { type: String, require: true },
  name: { type: String, require: true },
  permissions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Permission',
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const RoleModel = model<RoleDocument>('Role', roleSchema)
