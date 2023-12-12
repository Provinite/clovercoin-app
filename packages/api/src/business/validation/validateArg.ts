import { validate } from "class-validator";
import { ArgumentValidationError } from "type-graphql";

export const validateArg = async (val: any) => {
  const errors = await validate(val);
  if (errors.length) {
    throw new ArgumentValidationError(errors);
  }
};
