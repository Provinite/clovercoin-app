export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type PickAndFlatten<T, K extends keyof T> = UnionToIntersection<T[K]>;

export type Prefix<T, P extends string> = {
  [key in keyof T as key extends string | number ? `${P}${key}` : key]: T[key];
};

type ObjectKeys<T> = {
  [key in keyof T]: T[key] extends object ? key : never;
}[keyof T];

type PrefixChildObjectKeys<T, P extends string = "."> = Omit<T, ObjectKeys<T>> &
  {
    [key in Exclude<ObjectKeys<T>, Symbol>]: {
      [babyKey in Exclude<
        keyof T[key],
        Symbol
      > as `${key}${P}${babyKey}`]: T[key][babyKey];
    };
  };

export type Flatten<T, P extends string = "."> = Omit<T, ObjectKeys<T>> &
  UnionToIntersection<
    Pick<
      PrefixChildObjectKeys<T, P>,
      ObjectKeys<PrefixChildObjectKeys<T>>
    >[ObjectKeys<PrefixChildObjectKeys<T>>]
  >;
