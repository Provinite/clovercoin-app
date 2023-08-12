import { ObjectType, Field } from "type-graphql";
import { QueryFailedError } from "typeorm/error/QueryFailedError.js";
import { BaseError } from "./BaseError.js";
import { PostgresErrorCodes } from "./PostgresErrorCodes.js";

@ObjectType({
  implements: BaseError,
})
export class CheckConstraintError extends BaseError {
  constructor(constraintName: string) {
    super(`Constraint violated`);
    this.constraintName = constraintName;
  }

  static fromPostgresError(err: any) {
    if (err instanceof QueryFailedError) {
      if (
        err.driverError?.code?.toString() ===
        PostgresErrorCodes.CheckConstraintViolation
      ) {
        const constraint: string = err.driverError?.constraint ?? "unknown";
        return new CheckConstraintError(constraint);
      }
    }
  }

  @Field(() => String)
  constraintName!: string;
}
