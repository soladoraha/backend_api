import { Schema, model, Document } from 'mongoose'
import { IPerminssionGroup } from '@models/permission_groups/permission_group.model.interface'

export interface PermissionGroupDocument extends IPerminssionGroup, Document {}

const permissionGroupSchema = new Schema<PermissionGroupDocument>({
  code: { type: String, require: true },
  name: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const PermissionGroupModel = model<PermissionGroupDocument>('PermissionGroup', permissionGroupSchema)
