import { ObjectType, Field } from "type-graphql";
import { QueryFailedError } from "typeorm";
import { BaseError } from "./BaseError";

const pattern = /\((?<field>.*?)\)=\((?<value>.*?)\)/g;

@ObjectType({
  implements: BaseError,
})
export class DuplicateError extends BaseError {
  constructor(keys: string[] = []) {
    super("Duplicate error");
    this.duplicateKeys = [...keys];
  }

  static fromPostgresError(err: any) {
    if (err instanceof QueryFailedError) {
      if (err.driverError?.code?.toString() === "23505") {
        const errorDetail: string = err.driverError.detail ?? "";

        const keys: string[] = [];
        for (const match of errorDetail.matchAll(pattern)) {
          const { field } = match.groups!;
          keys.push(field);
        }

        return new DuplicateError(keys.length ? keys : ["unknown"]);
      }
    }
  }

  @Field(() => [String])
  duplicateKeys!: string[];
}
