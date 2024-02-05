import { get } from "lodash"
import { Request, Response, NextFunction } from "express"
import { decode } from "@utils/jwt.utils"
import Message from "@configs/message"


const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/,"")

  if (!accessToken) {
    let error = new Error(await Message.get('auth_no_permission'))
    return res.status(500).json({ success: false, error: error.message })
  }
  const { decoded, expired } = decode(accessToken)

  if (decoded) {
    // @ts-ignore
    req.user = decoded
    return next()
  }

  if (expired) {
    let error = new Error(await Message.get('auth_token_expired'))
    return res.status(200).json({ success: false, status: 88888, error: error.message })
  }

  let error = new Error(await Message.get('auth_no_permission'))
  return res.status(500).json({ success: false, error: error.message })
}

export default deserializeUser
