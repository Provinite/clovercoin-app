import {
  ApolloLink,
  DocumentNode,
  FetchResult,
  Observable,
  Operation,
} from "@apollo/client";
import { ArgTypes } from "@storybook/react";
import flatten from "flat";
import type { PartialDeep } from "type-fest";
import type { Flatten } from "../src/typing/types";
export function flattenArgs<T>(args: PartialDeep<T>): Flatten<T> {
  return flatten<PartialDeep<T>, Flatten<T>>(args, {
    delimiter: ".",
    safe: true,
  });
}

export function flatArgTypes<T>(
  argTypes: Partial<ArgTypes<Flatten<T>>>
): Partial<ArgTypes<Flatten<T>>> {
  return argTypes;
}

export function queryDocToKey(doc: DocumentNode) {
  return JSON.stringify({
    query: doc.definitions[0].kind,
    loc: doc.loc,
  });
}

export interface MockSetup<T = Record<string, any>, V = Record<string, any>> {
  link: ApolloLink;
  mocks: MockDefinition<T, V>[];
}

export interface MockDefinition<
  T = Record<string, any>,
  V = Record<string, any>
> {
  delay?: number;
  request: {
    query: DocumentNode;
    variables?: {
      [variable in keyof V]?: V[variable] | ((val: V[variable]) => boolean);
    };
  };
  result:
    | FetchResult<T>
    | ((op: Omit<Operation, "variables"> & { variables: V }) => FetchResult<T>);
}

export function link(mocks: MockDefinition<any, any>[]): MockSetup<any, any> {
  return {
    link: createApolloLink(mocks),
    mocks,
  };
}

export function createApolloLink(
  mocks: MockDefinition<any, any>[]
): ApolloLink {
  return new ApolloLink((op) => {
    for (const mock of mocks) {
      if (matches(op, mock)) {
        return new Observable((observer) => {
          observer.next(
            typeof mock.result === "function"
              ? mock.result(op)
              : { ...mock.result }
          );
          observer.complete();
        });
      }
    }

    return new Observable((o) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      o.next(undefined!);
      o.complete();
    });
  });
}

export function matches(op: Operation, mock: MockDefinition<any, any>) {
  const opKey = queryDocToKey(op.query);
  const mockKey = queryDocToKey(mock.request.query);

  if (opKey !== mockKey) {
    return false;
  }

  const {
    request: { variables: variableMatchers },
  } = mock;

  if (variableMatchers) {
    return Object.entries(op.variables).every(([varName, value]) =>
      variableMatches(value, variableMatchers[varName])
    );
  }
}

function variableMatches(value: any, matcher: any) {
  if (typeof matcher === "function") {
    return matcher(value);
  } else {
    return matcher === value;
  }
}
