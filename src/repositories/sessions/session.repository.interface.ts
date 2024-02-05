import { IBaseRepository } from '@repositories/base.repository'
import { SessionDocument } from '@models/sessions/session.model'

export interface ISessionRepository extends IBaseRepository<SessionDocument> {
}