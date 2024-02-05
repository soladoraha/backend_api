import { injectable } from "inversify"
import Joi, { ObjectSchema } from 'joi'
import { BaseValidator } from "@validators/validator.base"
import { RoleDocument, RoleModel } from "@models/roles/role.model"

@injectable()
export class RoleCreateValidate extends BaseValidator<RoleDocument> {
  constructor() {
    const schema: ObjectSchema = Joi.object({
        code: Joi.string().required(),
        name: Joi.string().required(),
        permissions: Joi.array().required()
    })
    super(RoleModel, schema)
  }
}