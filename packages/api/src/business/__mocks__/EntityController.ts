import { UnmockedMethodError } from "../../test/UnmockedMethodError.js";

export class EntityController {
  create() {
    throw new UnmockedMethodError(
      this.constructor.name ?? EntityController.name,
      "create"
    );
  }

  insert() {
    throw new UnmockedMethodError(
      this.constructor.name ?? EntityController.name,
      "insert"
    );
  }

  createBodyToModel() {
    throw new UnmockedMethodError(
      this.constructor.name ?? EntityController.name,
      "createBodyToModel"
    );
  }

  findOneById() {
    throw new UnmockedMethodError(
      this.constructor.name ?? EntityController.name,
      "findOneById"
    );
  }

  findOneByIdOrFail() {
    throw new UnmockedMethodError(
      this.constructor.name ?? EntityController.name,
      "findOneByIdOrFail"
    );
  }

  delete() {
    throw new UnmockedMethodError(
      this.constructor.name ?? EntityController.name,
      "delete"
    );
  }

  deleteOneById() {
    throw new UnmockedMethodError(
      this.constructor.name ?? EntityController.name,
      "deleteOneById"
    );
  }

  updateOneById() {
    throw new UnmockedMethodError(
      this.constructor.name ?? EntityController.name,
      "updateOneById"
    );
  }

  find() {
    throw new UnmockedMethodError(
      this.constructor.name ?? EntityController.name,
      "find"
    );
  }

  advancedFind() {
    throw new UnmockedMethodError(
      this.constructor.name ?? EntityController.name,
      "advancedFind"
    );
  }

  augmentFindWhere() {
    throw new UnmockedMethodError(
      this.constructor.name ?? EntityController.name,
      "augmentFindWhere"
    );
  }
}
export const MockEntityController = EntityController;
