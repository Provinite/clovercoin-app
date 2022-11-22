import { DeepPartial, ObjectLiteral, Repository } from "typeorm";
import { ensureArray } from "../util/ensureArray";

export class EntityController<
  Model extends ObjectLiteral,
  R extends Repository<Model>,
  CreateBody
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
}
