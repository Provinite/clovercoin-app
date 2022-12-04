import { ValidationError } from "class-validator";
import { ArgumentValidationError, Field, ObjectType } from "type-graphql";
import { BaseError } from "./BaseError";

@ObjectType({ implements: BaseError })
export class InvalidArgumentError extends BaseError {
  static fromTypegraphqlValidationError(err: unknown) {
    if (err instanceof ArgumentValidationError) {
      const result = new InvalidArgumentError(err.message);
      result.validationErrors = err.validationErrors.map(
        (ve) => new ValidationErrorObject(ve)
      );

      const message = result.validationErrors.map((ve) => ve.field).join(", ");
      result.message = `Invalid ${message}`;
      return result;
    }
  }
  constructor(message?: string) {
    super(message || "Invalid argument");
  }

  @Field(() => [ValidationErrorObject])
  validationErrors!: ValidationErrorObject[];
}

@ObjectType("ValidationError")
class ValidationErrorObject {
  constructor(validationError: ValidationError) {
    this.field = validationError.property;
    this.constraints = [];
    for (const [key, description] of Object.entries(
      validationError.constraints || {}
    )) {
      this.constraints.push(new ValidationConstraint(key, description));
    }
  }
  @Field()
  field!: string;

  @Field(() => [ValidationConstraint])
  constraints: ValidationConstraint[];
}

@ObjectType()
class ValidationConstraint {
  constructor(key: string, description: string) {
    this.key = key;
    this.description = description;
  }

  @Field()
  key: string;

  @Field()
  description: string;
}
