import { IsStrongPassword } from "class-validator";

export const IsValidPassword = () =>
  IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 0,
      minSymbols: 0,
    },
    {
      message:
        "Password is not strong enough. Must be mixed case and at least 8 characters long.",
    }
  );
