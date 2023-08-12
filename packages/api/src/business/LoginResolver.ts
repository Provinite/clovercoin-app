import { IsEmail, IsStrongPassword, Matches, MinLength } from "class-validator";
import {
  Arg,
  createUnionType,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import { DuplicateError } from "../errors/DuplicateError.js";
import { InvalidArgumentError } from "../errors/InvalidArgumentError.js";
import type { AppGraphqlContext } from "../graphql/AppGraphqlContext.js";
import { Account } from "../models/Account/Account.js";
import { Identity } from "../models/Identity/Identity.js";

@ObjectType()
export class LoginSuccessResponse {
  constructor(partial: Partial<LoginSuccessResponse> = {}) {
    const copy = <T, K extends keyof T>(key: K, from: Partial<T>, to: T) => {
      if (from[key]) {
        to[key] = from[key]!;
      }
    };
    for (const key of ["token", "identity", "account"] as const) {
      copy(key, partial, this);
    }
  }
  @Field(() => String)
  token: string = "";

  @Field(() => Identity)
  identity!: Identity;

  @Field(() => Account)
  account!: Account;
}

@ObjectType()
export class LoginFailureResponse {
  @Field(() => String)
  message: string = "Invalid username or password";
}

@InputType()
export class RegisterArgs {
  @Field(() => String)
  @MinLength(1)
  username: string = "";

  @Field(() => String)
  @IsStrongPassword(
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
  )
  password: string = "";

  @Field(() => String, { nullable: false })
  @IsEmail({
    allow_display_name: false,
    allow_ip_domain: true,
    require_tld: true,
  })
  email!: string;

  @Field(() => String, { nullable: false })
  @Matches(/^[a-zA-Z0-9_-]+$/, { message: "Invalid invite code" })
  inviteCodeId!: string;
}

@InputType()
export class LoginArgs {
  @Field(() => String)
  @MinLength(1)
  username: string = "";

  @Field(() => String)
  @MinLength(1)
  password: string = "";
}

const LoginResponse = createUnionType({
  name: "LoginResponse",
  types: () => [
    LoginSuccessResponse,
    LoginFailureResponse,
    InvalidArgumentError,
  ],
});

const RegisterResponse = createUnionType({
  name: "RegisterResponse",
  types: () => [LoginSuccessResponse, InvalidArgumentError, DuplicateError],
});

@Resolver()
export class LoginResolver {
  @Mutation(() => RegisterResponse, {
    description: "Create a new account and receive an auth token",
  })
  async register(
    @Arg("input", { nullable: false })
    { username, password, email, inviteCodeId }: RegisterArgs,
    @Ctx() { loginController }: AppGraphqlContext
  ): Promise<LoginSuccessResponse | LoginFailureResponse> {
    const result = await loginController.register(
      username,
      password,
      email,
      inviteCodeId
    );
    if (!result.success) {
      return new LoginFailureResponse();
    }
    return new LoginSuccessResponse(result);
  }

  @Mutation(() => LoginResponse, {
    description: "Log in using local credentials and receive an auth token",
  })
  async login(
    @Arg("input", { nullable: false }) { username, password }: LoginArgs,
    @Ctx() { loginController }: AppGraphqlContext
  ): Promise<LoginSuccessResponse | LoginFailureResponse> {
    const result = await loginController.login(username, password);
    if (!result.success) {
      return new LoginFailureResponse();
    }
    return new LoginSuccessResponse(result);
  }
}
