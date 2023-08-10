import {
  ApolloCache,
  ApolloClient,
  createHttpLink,
  DefaultContext,
  FetchResult,
  InMemoryCache,
  MutationOptions,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  Exact,
  GraphqlService,
  isLoginSuccessResponse,
  LoginArgs,
  LoginMutation,
  RegisterArgs,
  RegisterMutation,
} from "@clovercoin/api-client";
import jwtDecode from "jwt-decode";

export interface TokenPayload {
  iat: number;
  identity: {
    id: string;
    displayName: string;
  };
}

export class ClientGraphqlService extends GraphqlService {
  #token: string = "";
  protected listeners: Record<string, () => void> = {};
  protected id = 0;

  constructor(uri: string) {
    const httpLink = createHttpLink({ uri });
    const authLink = setContext((_, { headers }) => {
      return this.#token
        ? {
            headers: {
              ...headers,
              authorization: `Bearer ${this.#token}`,
            },
          }
        : { headers };
    });
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      uri,
      link: authLink.concat(httpLink),
    });
    super(client);
  }

  /**
   * Get the underlying apollo client used by this service
   * @returns An apollo client
   */
  public getApolloClient() {
    return this.client;
  }

  // #region Authentication
  public setClientAuthToken(token: string, persist = true) {
    this.#token = token;
    persist && this.persistClientAuthToken();
    for (const listener of Object.values(this.listeners)) {
      listener();
    }
  }

  /**
   * Persist the current client auth token to local storage
   */
  public persistClientAuthToken() {
    localStorage.setItem("clientToken", this.#token ?? "");
  }

  /**
   * Load the last persisted token from local storage
   */
  public loadClientAuthToken() {
    this.setClientAuthToken(localStorage.getItem("clientToken") ?? "", false);
  }

  /**
   * Determine if this service is authenticated or not.
   * @returns true if the client has a token set
   */
  public isClientAuthenticated() {
    return Boolean(this.#token);
  }

  public getTokenPayload() {
    return jwtDecode<TokenPayload>(this.#token);
  }

  /**
   * Registers an authentication event listener. The callback is invoked
   * each time the client is authenticated with new credentials. The callback
   * is also invoked once immediately after registration if the service is
   * already authenticated.
   * @param listener Callback function
   * @returns A function to clean up the subscription.
   */
  public addAuthenticationListener(listener: () => void) {
    const id = this.id++;
    this.listeners[id] = listener;
    if (this.isClientAuthenticated()) {
      setTimeout(() => {
        if (this.listeners[id]) {
          this.listeners[id]();
        }
      }, 0);
    }
    return () => {
      delete this.listeners[id];
    };
  }
  // #endregion
  // #region Operation Overrides

  /**
   * Executes the register mutation, and then uses the result to authenticate
   * the client for further requests (on a successful registration).
   * @param options Register mutation options
   * @returns
   */
  async register(
    options: Omit<
      Partial<
        MutationOptions<
          RegisterMutation,
          Exact<{ input: RegisterArgs }>,
          DefaultContext,
          ApolloCache<any>
        >
      >,
      "variables" | "mutation"
    > & { variables: Exact<{ input: RegisterArgs }> }
  ): Promise<
    Omit<
      FetchResult<RegisterMutation, Record<string, any>, Record<string, any>>,
      "data"
    > & { data: RegisterMutation }
  > {
    const result = await super.register(options);
    const {
      data: { register },
    } = result;
    if (isLoginSuccessResponse(register)) {
      this.setClientAuthToken(register.token);
    }
    return result;
  }

  /**
   * Executes the login mutation, and then uses the result to authenticate
   * the client for further requests (on a successful login).
   * @param options Login mutation options
   * @returns
   */
  async login(
    options: Omit<
      Partial<
        MutationOptions<
          LoginMutation,
          Exact<{ input: LoginArgs }>,
          DefaultContext,
          ApolloCache<any>
        >
      >,
      "variables" | "mutation"
    > & { variables: Exact<{ input: LoginArgs }> }
  ): Promise<
    Omit<
      FetchResult<LoginMutation, Record<string, any>, Record<string, any>>,
      "data"
    > & { data: LoginMutation }
  > {
    const result = await super.login(options);
    const {
      data: { login },
    } = result;
    if (isLoginSuccessResponse(login)) {
      this.setClientAuthToken(login.token);
    }
    return result;
  }

  // #endregion
}
