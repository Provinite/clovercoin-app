import {
  DeepPartial,
  DeleteResult,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from "typeorm";
import { ensureArray } from "../util/ensureArray.js";

export class EntityController<
  Model extends ObjectLiteral,
  R extends Repository<Model>,
  CreateBody,
  UpdateBody = any
> {
  constructor(protected repository: R) {}

  create(createBody: CreateBody): Promise<Model>;
  create(createBody: CreateBody[]): Promise<Model[]>;
  async create(
    createBody: CreateBody | CreateBody[]
  ): Promise<Model | Model[]> {
    const unwrap = !Array.isArray(createBody);
    const createModel = this.createBodyToModel.bind(this);
    const models = await Promise.all(ensureArray(createBody).map(createModel));
    const result = this.repository.save(models);
    if (unwrap) {
      return (await result)[0];
    }
    return result;
  }

  /**
   * Instantiate a model from a create body. Can be used to override
   * behavior on create calls.
   * @param createBody
   * @returns
   */
  async createBodyToModel(createBody: CreateBody): Promise<Model> {
    return this.repository.create(createBody as unknown as DeepPartial<Model>);
  }

  async findOneById(id: Model["id"]) {
    return this.repository.findOneBy({
      id,
    });
  }

  async delete(where: FindOptionsWhere<Model>): Promise<DeleteResult> {
    return this.repository.delete(where);
  }

  async deleteOneById(id: Model["id"]) {
    return this.repository.delete({ id });
  }

  async updateOneById(id: Model["id"], updateBody: UpdateBody): Promise<Model> {
    await this.repository.save({ id, ...(updateBody as DeepPartial<Model>) });
    return this.repository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async find(where: FindOptionsWhere<Model>): Promise<Model[]> {
    return this.repository.findBy(where);
  }
}
