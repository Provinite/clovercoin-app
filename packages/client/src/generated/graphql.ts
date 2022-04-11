import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Critter = {
  __typename?: "Critter";
  id: Scalars["ID"];
  name: Scalars["String"];
  species: Species;
  speciesId: Scalars["ID"];
  traits: Array<CritterTraitUnion>;
};

export type CritterCreateInput = {
  name: Scalars["String"];
  speciesId: Scalars["String"];
};

export type CritterIntTrait = CritterTrait & {
  __typename?: "CritterIntTrait";
  critterId: Scalars["ID"];
  displayValue?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  trait: Trait;
  traitId: Scalars["ID"];
  valueInt?: Maybe<Scalars["Float"]>;
  valueType: CritterTraitValueType;
};

export type CritterStringTrait = CritterTrait & {
  __typename?: "CritterStringTrait";
  critterId: Scalars["ID"];
  displayValue?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  trait: Trait;
  traitId: Scalars["ID"];
  valueString?: Maybe<Scalars["String"]>;
  valueType: CritterTraitValueType;
};

export type CritterTimestampTrait = CritterTrait & {
  __typename?: "CritterTimestampTrait";
  critterId: Scalars["ID"];
  displayValue?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  trait: Trait;
  traitId: Scalars["ID"];
  valueTimestamp?: Maybe<Scalars["DateTime"]>;
  valueType: CritterTraitValueType;
};

export type CritterTrait = {
  critterId: Scalars["ID"];
  displayValue?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  trait: Trait;
  traitId: Scalars["ID"];
  valueType: CritterTraitValueType;
};

export type CritterTraitCreateInput = {
  critterId: Scalars["ID"];
  traitId: Scalars["ID"];
  valueBool?: InputMaybe<Scalars["Boolean"]>;
  valueDate?: InputMaybe<Scalars["DateTime"]>;
  valueInt?: InputMaybe<Scalars["Int"]>;
  valueString?: InputMaybe<Scalars["String"]>;
};

export type CritterTraitUnion =
  | CritterIntTrait
  | CritterStringTrait
  | CritterTimestampTrait;

export enum CritterTraitValueType {
  Integer = "Integer",
  String = "String",
  Timestamp = "Timestamp",
}

export type Mutation = {
  __typename?: "Mutation";
  createCritter: Critter;
  createCritterTrait: CritterTraitUnion;
  createSpecies: Species;
  createSpeciesTrait: SpeciesTrait;
  createTrait: Trait;
};

export type MutationCreateCritterArgs = {
  input: CritterCreateInput;
};

export type MutationCreateCritterTraitArgs = {
  input: CritterTraitCreateInput;
};

export type MutationCreateSpeciesArgs = {
  input: SpeciesCreateInput;
};

export type MutationCreateSpeciesTraitArgs = {
  input: SpeciesTraitCreateInput;
};

export type MutationCreateTraitArgs = {
  input: TraitCreateInput;
};

export type Query = {
  __typename?: "Query";
  critters: Array<Critter>;
  species: Array<Species>;
};

export type QuerySpeciesArgs = {
  filters?: InputMaybe<SpeciesFilters>;
};

export type Species = {
  __typename?: "Species";
  id: Scalars["ID"];
  name: Scalars["String"];
  traits: Array<Trait>;
};

export type SpeciesCreateInput = {
  name: Scalars["String"];
};

export type SpeciesFilters = {
  name?: InputMaybe<Scalars["String"]>;
};

export type SpeciesTrait = {
  __typename?: "SpeciesTrait";
  id: Scalars["ID"];
  speciesId: Scalars["ID"];
  traitId: Scalars["ID"];
};

export type SpeciesTraitCreateInput = {
  speciesId: Scalars["ID"];
  traitId: Scalars["ID"];
};

export type Trait = {
  __typename?: "Trait";
  id: Scalars["ID"];
  name: Scalars["String"];
  valueType: CritterTraitValueType;
};

export type TraitCreateInput = {
  name: Scalars["String"];
  valueType: Scalars["String"];
};

export type GetCrittersQueryVariables = Exact<{ [key: string]: never }>;

export type GetCrittersQuery = {
  __typename?: "Query";
  critters: Array<{
    __typename?: "Critter";
    id: string;
    name: string;
    traits: Array<
      | {
          __typename?: "CritterIntTrait";
          displayValue?: string | null;
          trait: { __typename?: "Trait"; id: string };
        }
      | {
          __typename?: "CritterStringTrait";
          displayValue?: string | null;
          trait: { __typename?: "Trait"; id: string };
        }
      | {
          __typename?: "CritterTimestampTrait";
          displayValue?: string | null;
          trait: { __typename?: "Trait"; id: string };
        }
    >;
    species: {
      __typename?: "Species";
      id: string;
      name: string;
      traits: Array<{
        __typename?: "Trait";
        id: string;
        name: string;
        valueType: CritterTraitValueType;
      }>;
    };
  }>;
};

export type GetSpeciesListViewQueryVariables = Exact<{
  name?: InputMaybe<Scalars["String"]>;
}>;

export type GetSpeciesListViewQuery = {
  __typename?: "Query";
  species: Array<{ __typename?: "Species"; id: string; name: string }>;
};

export const GetCrittersDocument = gql`
  query getCritters {
    critters {
      id
      name
      traits {
        ... on CritterTrait {
          trait {
            id
          }
          displayValue
        }
      }
      species {
        id
        name
        traits {
          id
          name
          valueType
        }
      }
    }
  }
`;

/**
 * __useGetCrittersQuery__
 *
 * To run a query within a React component, call `useGetCrittersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCrittersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCrittersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCrittersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCrittersQuery,
    GetCrittersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCrittersQuery, GetCrittersQueryVariables>(
    GetCrittersDocument,
    options
  );
}
export function useGetCrittersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCrittersQuery,
    GetCrittersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCrittersQuery, GetCrittersQueryVariables>(
    GetCrittersDocument,
    options
  );
}
export type GetCrittersQueryHookResult = ReturnType<typeof useGetCrittersQuery>;
export type GetCrittersLazyQueryHookResult = ReturnType<
  typeof useGetCrittersLazyQuery
>;
export type GetCrittersQueryResult = Apollo.QueryResult<
  GetCrittersQuery,
  GetCrittersQueryVariables
>;
export const GetSpeciesListViewDocument = gql`
  query getSpeciesListView($name: String) {
    species(filters: { name: $name }) {
      id
      name
    }
  }
`;

/**
 * __useGetSpeciesListViewQuery__
 *
 * To run a query within a React component, call `useGetSpeciesListViewQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpeciesListViewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpeciesListViewQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetSpeciesListViewQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetSpeciesListViewQuery,
    GetSpeciesListViewQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetSpeciesListViewQuery,
    GetSpeciesListViewQueryVariables
  >(GetSpeciesListViewDocument, options);
}
export function useGetSpeciesListViewLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSpeciesListViewQuery,
    GetSpeciesListViewQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetSpeciesListViewQuery,
    GetSpeciesListViewQueryVariables
  >(GetSpeciesListViewDocument, options);
}
export type GetSpeciesListViewQueryHookResult = ReturnType<
  typeof useGetSpeciesListViewQuery
>;
export type GetSpeciesListViewLazyQueryHookResult = ReturnType<
  typeof useGetSpeciesListViewLazyQuery
>;
export type GetSpeciesListViewQueryResult = Apollo.QueryResult<
  GetSpeciesListViewQuery,
  GetSpeciesListViewQueryVariables
>;
