import { Schema, model, Document, HookNextFunction } from 'mongoose'
import { IUser } from '@models/users/user.model.interface'
import config from 'config'
import bcrypt from 'bcrypt'

export interface UserDocument extends IUser, Document {}

const userSchema = new Schema<UserDocument>({
  userName: { type: String, required: true },
  roles: { type: Schema.Types.ObjectId, ref: 'Role' },
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fullName: { type: String },
  isActive: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

userSchema.pre('save', async function (next: HookNextFunction) {
  let user = this as UserDocument

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  // Random additional data
  const salt = await bcrypt.genSalt(config.get('salt_work_factor'))

  const hash = await bcrypt.hashSync(user.password, salt)

  // Replace the password with the hash
  user.password = hash

  return next()
})

export const UserModel = model<UserDocument>('User', userSchema)
