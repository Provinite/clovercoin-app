import { asClass, Constructor } from "awilix";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { AuthScope } from "./AuthInfo.js";
import { Authorizer } from "./Authorizer.js";
import { Authorizers } from "./Authorizers.js";

export class AuthorizerRegistry {
  protected authorizerMap = new Map<AuthScope, Authorizer<AuthScope>>();

  constructor({ container }: AppGraphqlContext) {
    for (const clazz of Object.values(Authorizers)) {
      const instance = container.build(
        asClass(clazz as Constructor<InstanceType<typeof clazz>>)
      );
      instance.register(this);
    }
  }

  registerAuthorizer<T extends AuthScope>(
    scope: AuthScope,
    authorizer: Authorizer<T>
  ) {
    if (this.authorizerMap.has(scope)) {
      throw new Error(
        `Duplicate authorizer registered for scope: ${scope}: ${AuthScope[scope]}`
      );
    }
    this.authorizerMap.set(scope, authorizer);
  }

  getAuthorizer<T extends AuthScope>(authScope: T): Authorizer<T> {
    const authorizer = this.authorizerMap.get(authScope);
    if (!authorizer) {
      throw new Error("Error during authorization");
    }
    return authorizer as Authorizer<T>;
  }
}
