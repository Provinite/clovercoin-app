/**
 * Convert a union type to an intersection type.
 * I stole this from the internet and read multiple
 * articles on how it works, but ultimately I'm not
 * really 100% sure. Oh well.
 */
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

/**
 * Flatten the child keys of specific fields on a type to the root type.
 *
 * @example
 * ```ts
 * interface Child {
 *   parent: {
 *     "parent.name": string;
 *   },
 *   favoriteToy: {
 *     "favoriteToy.kind": string;
 *   }
 *   name: string,
 * }
 * const flatChild: Pick<Child, "name"> &
 * PickAndFlatten<Child, "parent" | "favoriteToy"> = {
 *   "parent.name": "Gwynevere",
 *   "favoriteToy.kind": "Sword",
 *   name: "Lorian",
 * };
 * ```
 */
export type PickAndFlatten<T, K extends keyof T> = UnionToIntersection<T[K]>;

/**
 * Prefix all keys of an object with a specified prefix.
 */
export type Prefix<T, P extends string> = {
  [key in keyof T as key extends string | number ? `${P}${key}` : key]: T[key];
};

/**
 * Get a union of the keys of an object whose values are objects.
 */
export type ObjectKeys<T> = Exclude<
  {
    [key in keyof T]: T[key] extends object ? key : never;
  }[keyof T],
  undefined
>;

/**
 * Used to prefix all child object keys of an object type with the key
 * of that object.
 *
 * @example
 * ```ts
 * interface Child {
 *   parent: {
 *     name: string;
 *   },
 *   favoriteToy: {
 *     kind: string;
 *   }
 *   name: string,
 * }
 *
 * const prefixedChild: PrefixChildObjectKeys<Child> = {
 *   parent: {
 *     "parent.name": "Gwyn"
 *   },
 *   favoriteToy: {
 *     "favoriteToy.kind": "Dragon"
 *   },
 *   name: "Nameless King"
 * }
 * ```
 * @see ObjectKeys
 * @see PickAndFlatten
 */
export type PrefixChildObjectKeys<T, P extends string = "."> = Omit<
  T,
  ObjectKeys<T>
> & {
  [key in Exclude<ObjectKeys<T>, symbol>]: {
    [babyKey in Exclude<
      keyof T[key],
      symbol
    > as `${key}${P}${babyKey}`]: T[key][babyKey];
  };
};

type A<T> = ObjectKeys<T>;
type B<T> = PrefixChildObjectKeys<T, ".">;

/**
 * Flatten an object's children onto its root with the keys prefixed with `parentKey.`.
 */
export type Flatten<P extends { [key: string | symbol]: any }> = Omit<P, A<P>> &
  PickAndFlatten<B<P>, A<B<P>>>;

// type Car<T extends string> = T extends `${infer U}.${string}` ? U : T;
// type Cdr<T extends string> = T extends `${string}.${infer U}` ? U : T;

// export type DeepPick<T, K extends string> = K extends keyof T
//   ? { [x in K]: T[x] }
//   : Car<K> extends keyof T
//   ? {
//       [x in Car<K>]: T[x] extends any[]
//         ? DeepPick<T[x][number], Cdr<K>>[]
//         : DeepPick<T[x], Cdr<K>>;
//     }
//   : never;

type Head<T extends string> = T extends `${infer First}.${string}` ? First : T;
// type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
//   k: infer I
// ) => void
//   ? I
//   : never;
type Tail<T extends string> = T extends `${string}.${infer Rest}`
  ? Rest
  : never;

export type DeepPick<TObject, TKey extends string> = UnionToIntersection<
  TObject extends object
    ? TKey extends `${string}.${string}`
      ? {
          [P in Head<TKey> & keyof TObject]: DeepPick<
            TObject[P],
            Tail<Extract<TKey, `${P}.${string}`>>
          >;
        }
      : TKey extends keyof TObject
      ? Pick<TObject, TKey>
      : never
    : TObject
>;
