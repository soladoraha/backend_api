import { Response } from 'express'
import { injectable } from "inversify"

@injectable()
export abstract class BaseController {
  
  protected sendSuccessResponse(res: Response, data: any) {
    return res.status(200).json({ success: true, data })
  }

  protected sendErrorResponse(res: Response, error: any) {
    return res.status(500).json({ success: false, error: error.message })
  }
}