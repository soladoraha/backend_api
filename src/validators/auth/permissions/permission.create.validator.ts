import { injectable } from "inversify"
import Joi, { ObjectSchema } from 'joi'
import { BaseValidator } from "@validators/validator.base"
import { PermissionDocument, PermissionModel } from "@models/permissions/permission"

@injectable()
export class PermissionCreateValidate extends BaseValidator<PermissionDocument> {
  constructor() {
    const schema: ObjectSchema = Joi.object({
        code: Joi.string().required(),
        name: Joi.string().required(),
        permission_group: Joi.string().allow(null, '')
    })
    super(PermissionModel, schema)
  }
}