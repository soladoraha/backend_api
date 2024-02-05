import { Model, Document, Types, FilterQuery } from 'mongoose'
import { injectable, unmanaged } from 'inversify'
import { Request } from 'express'

export interface IBaseRepository<T extends Document> {
  search(query: any, populateOption: PopulatedWith, options?: PaginateOptions): Promise<{ data: T[], total: number, limit: number, page: number }>
  findAll(): Promise<T[]>
  findOne(query: FilterQuery<T>, populateOption?: PopulatedWith): Promise<T | null>
  findById(id: Types.ObjectId, populateOption?: PopulatedWith): Promise<T | null>
  create(item: T): Promise<T>
  update(id: Types.ObjectId, item: T): Promise<T | null>
  delete(id: Types.ObjectId): Promise<T | null>
  paginate(req: Request, populateOption: PopulatedWith, query?: any): Promise<{ data: T[], total: number, limit: number, page: number }>
}
interface PopulatedWith {
  populate?: []|any
}
interface PaginateOptions {
  limit?: number;
  page?: number;
}
@injectable()
export abstract class BaseRepository<T extends Document> implements IBaseRepository<T> {
  constructor(@unmanaged() protected readonly model: Model<T>) {}

  async search(query: any, populateOption: PopulatedWith, options?: PaginateOptions): Promise<{ data: T[], total: number, limit: number, page: number }> {
    // Panigation
    const { limit = 10, page = 1 } = options || {}
    const skip = (page - 1) * limit
    const [data, total] = await Promise.all([
      this.model.find(query).populate(populateOption.populate).skip(skip).limit(limit).lean().exec(),
      this.model.countDocuments(query).exec(),
    ])
    return { data: data as T[], total, limit, page }
  }

  async findAll(): Promise<T[]> {
    return this.model.find().lean()
  }

  async findOne(query: FilterQuery<T>, populateOption?: PopulatedWith): Promise<T | null> {
    return this.model.findOne(query).populate(populateOption?.populate).lean()
  }

  async findById(id: Types.ObjectId, populateOption?: PopulatedWith): Promise<T | null> {
    return this.model.findById(id).populate(populateOption?.populate).lean()
  }

  async create(item: T): Promise<T> {
    return this.model.create(item)
  }

  async update(id: Types.ObjectId, item: any): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, item, { new: true }).exec()
  }

  async delete(id: Types.ObjectId): Promise<T | null> {
    return await this.model.findByIdAndDelete(id).exec()
  }

  async paginate(req: Request, populateOption: PopulatedWith, query?: any): Promise<{ data: T[], total: number, limit: number, page: number }> {
    const { limit, page } = req.query 
    const options: PaginateOptions = {}
    if (limit) {
      options.limit = parseInt(limit as string, 10)
    }
    if (page) {
      options.page = parseInt(page as string, 10)
    }
    return this.search(query, populateOption, options)
  }
}
