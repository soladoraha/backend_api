import { Schema, model, Document } from 'mongoose'
import { IPerminssion } from '@models/permissions/permission.model.interface'

export interface PermissionDocument extends IPerminssion, Document {}

const permissionSchema = new Schema<PermissionDocument>({
  code: { type: String, require: true },
  name: { type: String, require: true },
  permission_group: {
    type: Schema.Types.ObjectId,
    ref: 'PermissionGroup',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const PermissionModel = model<PermissionDocument>('Permission', permissionSchema)
