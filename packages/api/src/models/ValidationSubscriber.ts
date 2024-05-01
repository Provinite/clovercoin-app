import { validateOrReject } from "class-validator";
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from "typeorm";
import { ModelsArray } from "./index.js";
import { ValidationGroup } from "./ValidationGroup.js";
/**
 * TypeORM event subscriber. Triggers pre-save class-validator validation.
 */
@EventSubscriber()
export class ValidationSubscriber implements EntitySubscriberInterface {
  async beforeInsert(event: InsertEvent<any>): Promise<void> {
    if (event.entity) {
      await validateOrReject(event.entity, {
        groups: [ValidationGroup.Insert],
      });
    }
  }

  async beforeUpdate(event: UpdateEvent<any>): Promise<void> {
    if (
      event.entity &&
      ModelsArray.some((ModelClass) => event.entity instanceof ModelClass)
    ) {
      await validateOrReject(event.entity, {
        groups: [ValidationGroup.Update],
      });
    }
  }
}
