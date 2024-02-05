import { injectable } from "inversify"
import Joi, { ObjectSchema } from 'joi'
import { BaseValidator } from "@validators/validator.base"
import { PermissionGroupDocument, PermissionGroupModel } from "@models/permission_groups/permission_group.model"

@injectable()
export class PermissionGroupCreateValidate extends BaseValidator<PermissionGroupDocument> {
  constructor() {
    const schema: ObjectSchema = Joi.object({
        code: Joi.string().required(),
        name: Joi.string().required()
    })
    super(PermissionGroupModel, schema)
  }
}