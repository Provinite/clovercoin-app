import { AuthInfo, AuthScope } from "./AuthInfo.js";
import { AuthorizerRegistry } from "./AuthorizerRegistry.js";
/**
 * Authorizers are responsible for authorizing operations in a particular
 * {@link AuthScope}. All authorizers must be loaded into the authorizers list
 * in `Authorizers.ts` to be registered with the {@link AuthorizerRegistry}
 * properly.
 *
 * Authorizers are dependency-injected but not registered into the container.
 */
export abstract class Authorizer<T extends AuthScope> {
  constructor(public readonly scope: T) {}
  abstract authorize(authInfo: { scope: T } & AuthInfo): Promise<void> | void;
  register(registry: AuthorizerRegistry) {
    registry.registerAuthorizer(this.scope, this);
  }
}
