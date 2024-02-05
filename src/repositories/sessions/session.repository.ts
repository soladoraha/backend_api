import { injectable } from 'inversify'
import { BaseRepository } from '@repositories/base.repository'
import { ISessionRepository } from '@repositories/sessions/session.repository.interface'
import { SessionDocument, SessionModel } from '@models/sessions/session.model'

@injectable()
export class SessionRepository extends BaseRepository<SessionDocument> implements ISessionRepository {
  constructor() {
    super(SessionModel)
  }
}
