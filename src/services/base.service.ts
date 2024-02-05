import { Response } from 'express'
import { injectable } from 'inversify'

@injectable()
export abstract class BaseService {
  protected sendSuccess(res: Response, data: any) {
    return true
  }
}
