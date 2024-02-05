import { injectable } from "inversify"
import Joi, { ObjectSchema } from 'joi'
import { UserDocument, UserModel } from '@models/users/user.model'
import { BaseValidator } from "@validators/validator.base"

@injectable()
export class UserValidate extends BaseValidator<UserDocument> {
  constructor() {
    const schema: ObjectSchema = Joi.object({
        userName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    })
    super(UserModel, schema)
  }

  async validateDatabase() {
    
  }
}