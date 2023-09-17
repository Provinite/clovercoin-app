import {
  DeepPartial,
  DeleteResult,
  FindOptionsWhere,
  In,
  ObjectLiteral,
  Repository,
} from "typeorm";
import { NotFoundError } from "../errors/NotFoundError.js";
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
  create(createBody: CreateBody | CreateBody[]): Promise<Model | Model[]>;
  async create(
    createBody: CreateBody | CreateBody[]
  ): Promise<Model | Model[]> {
    const unwrap = !Array.isArray(createBody);
    const createModel = this.createBodyToModel.bind(this);
    const models = await Promise.all(ensureArray(createBody).map(createModel));
    const result = this.insert(models);
    if (unwrap) {
      return (await result)[0];
    }
    return result;
  }

  /**
   * Insert new models into the database.
   * @param models
   * @returns The created models
   */
  async insert(models: Model[]): Promise<Model[]> {
    const result = await this.repository.insert(models);
    const createdModelResults: Model[] = result.identifiers as any;
    return this.repository.find({
      where: {
        id: In(createdModelResults.map((model) => model.id)),
      } as any,
    });
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
    return this.repository.findOne({
      where: await this.augmentFindWhere({ id }),
    });
  }

  async findOneByIdOrFail(id: Model["id"]) {
    const result = await this.findOneById(id);
    if (!result) {
      throw new NotFoundError();
    }
    return result;
  }

  async delete(where: FindOptionsWhere<Model>): Promise<DeleteResult> {
    return this.repository.delete(await this.augmentFindWhere(where));
  }

  async deleteOneById(id: Model["id"]) {
    return this.repository.delete(await this.augmentFindWhere({ id }));
  }

  async updateOneById(id: Model["id"], updateBody: UpdateBody): Promise<Model> {
    await this.repository.update(
      { id },
      { ...(updateBody as DeepPartial<Model>) }
    );
    return this.repository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async find(where: FindOptionsWhere<Model> = {}): Promise<Model[]> {
    where = await this.augmentFindWhere(where);
    return this.repository.findBy(where);
  }

  /**
   * Add filters to `findWhere` conditions here to have them added to every find*
   * query. This is useful for adding authorization-based limits such as filtering
   * for communities a user is a member of.
   * @param findWhere
   * @returns
   */
  async augmentFindWhere(
    findWhere: FindOptionsWhere<Model>
  ): Promise<FindOptionsWhere<Model>> {
    return findWhere;
  }
}
