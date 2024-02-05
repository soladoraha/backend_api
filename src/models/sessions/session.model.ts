import { Schema, model, Document } from 'mongoose'
import { ISession } from '@models/sessions/session.model.interface'

export interface SessionDocument extends ISession, Document {}

const sessionSchema = new Schema<SessionDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  valid: { type: Boolean, default: true },
  userAgent: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const SessionModel = model<SessionDocument>('Session', sessionSchema)
