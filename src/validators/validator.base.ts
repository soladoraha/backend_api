import { Model, Document, ObjectId } from 'mongoose'
import { injectable, unmanaged } from 'inversify'
import { ObjectSchema } from 'joi'
import { Request, request } from 'express'

@injectable()
export abstract class BaseValidator<T extends Document> {
  protected schema: ObjectSchema
  protected abortEarly: boolean
  protected allowUnknown: boolean
  protected stripUnknown: boolean

  constructor(
    @unmanaged() protected readonly model: Model<T>,
    schema: ObjectSchema,
    abortEarly: boolean = false,
    allowUnknown: boolean = true,
    stripUnknown: boolean = true
  ) {
    this.schema = schema
    this.abortEarly = abortEarly
    this.allowUnknown = allowUnknown
    this.stripUnknown = stripUnknown
  }

  async validateRequest(req: Request): Promise<any> {
    const options = {
      abortEarly: this.abortEarly,
      allowUnknown: this.allowUnknown,
      stripUnknown: this.stripUnknown,
    }
    const { error, value } = await this.schema.validate(req.body, options)
    if (error) {
      const validationError: any = new Error(`Validation error: ${error.details.map((x: any) => x.message).join(', ')}`);
      validationError.status = 400
      throw validationError
    }
    return value
  }

  async validateUniqueByModel(field: string, value: any): Promise<any> {
    const checkField = await this.model.findOne({field: value})
    if(checkField) {
      const validationError: any = new Error(`Validation error: ${field} is already exist`);
      validationError.status = 400
      throw validationError
    }
    return true
  }
}