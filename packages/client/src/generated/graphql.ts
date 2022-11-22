import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
import {
  FieldPolicy,
  FieldReadFunction,
  TypePolicies,
  TypePolicy,
} from "@apollo/client/cache";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
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

export type Account = {
  __typename?: "Account";
  id: Scalars["ID"];
  identity: Identity;
  identityId: Scalars["ID"];
  username: Scalars["String"];
};

export type Community = {
  __typename?: "Community";
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type CommunityCreateInput = {
  name: Scalars["String"];
};

export type CommunityFilters = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type Critter = {
  __typename?: "Critter";
  id: Scalars["ID"];
  name: Scalars["String"];
  owner: Identity;
  ownerId: Scalars["ID"];
  species: Species;
  speciesId: Scalars["ID"];
  traitList: TraitList;
  traitListId: Scalars["ID"];
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
  Enum = "Enum",
  Integer = "Integer",
  String = "String",
  Timestamp = "Timestamp",
}

export type EnumValue = {
  __typename?: "EnumValue";
  id: Scalars["ID"];
  name: Scalars["String"];
  trait: Trait;
  traitId: Scalars["ID"];
};

export type Identity = {
  __typename?: "Identity";
  displayName: Scalars["String"];
  email: Scalars["String"];
  id: Scalars["ID"];
};

export type LoginArgs = {
  password?: InputMaybe<Scalars["String"]>;
  username?: InputMaybe<Scalars["String"]>;
};

export type LoginResponse = {
  __typename?: "LoginResponse";
  account: Account;
  identity: Identity;
  token: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createCommunity: Community;
  createCritter: Critter;
  createCritterTrait: CritterTraitUnion;
  createSpecies: Species;
  createTrait: Trait;
  createTraitList: TraitList;
  createTraitListEntry: TraitListEntry;
  /** Log in using local credentials and receive an auth token */
  login: LoginResponse;
  /** Create a new account and receive an auth token */
  register: LoginResponse;
};

export type MutationCreateCommunityArgs = {
  input: CommunityCreateInput;
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

export type MutationCreateTraitArgs = {
  input: TraitCreateInput;
};

export type MutationCreateTraitListArgs = {
  input: TraitListCreateInput;
};

export type MutationCreateTraitListEntryArgs = {
  input: TraitListEntryCreateInput;
};

export type MutationLoginArgs = {
  input: LoginArgs;
};

export type MutationRegisterArgs = {
  input: RegisterArgs;
};

export type Query = {
  __typename?: "Query";
  communities: Array<Community>;
  critters: Array<Critter>;
  species: Array<Species>;
  traits: Array<Trait>;
};

export type QueryCommunitiesArgs = {
  filters: CommunityFilters;
};

export type QuerySpeciesArgs = {
  filters?: InputMaybe<SpeciesFilters>;
};

export type QueryTraitsArgs = {
  filters: TraitFilters;
};

export type RegisterArgs = {
  email?: InputMaybe<Scalars["String"]>;
  password?: InputMaybe<Scalars["String"]>;
  username?: InputMaybe<Scalars["String"]>;
};

/** Model representing an arbitrarily broad class of charcters that use common trait lists and administration. */
export type Species = {
  __typename?: "Species";
  /** Community that owns this species */
  community: Community;
  /** ID of the community that owns this species */
  communityId: Scalars["ID"];
  critters: Array<Critter>;
  /** Icon URL for this species */
  iconUrl: Scalars["String"];
  id: Scalars["ID"];
  /** Name of the species */
  name: Scalars["String"];
  traitLists: Array<TraitList>;
};

export type SpeciesCreateInput = {
  communityId: Scalars["ID"];
  iconUrl: Scalars["String"];
  name: Scalars["String"];
};

export type SpeciesFilters = {
  communityId: Scalars["ID"];
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type Trait = {
  __typename?: "Trait";
  enumValues: Array<EnumValue>;
  id: Scalars["ID"];
  name: Scalars["String"];
  species: Species;
  valueType: CritterTraitValueType;
};

export type TraitCreateEnumValueInput = {
  name: Scalars["String"];
};

export type TraitCreateInput = {
  enumValues: Array<TraitCreateEnumValueInput>;
  name: Scalars["String"];
  speciesId: Scalars["ID"];
  valueType: CritterTraitValueType;
};

export type TraitFilters = {
  speciesId: Scalars["ID"];
};

export type TraitList = {
  __typename?: "TraitList";
  id: Scalars["ID"];
  name: Scalars["String"];
  species: Species;
  speciesId: Scalars["ID"];
  traitListEntries: Array<TraitListEntry>;
};

export type TraitListCreateInput = {
  name: Scalars["String"];
  speciesId: Scalars["ID"];
};

export type TraitListEntry = {
  __typename?: "TraitListEntry";
  defaultDisplayValue?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  order: Scalars["Int"];
  required: Scalars["Boolean"];
  trait: Trait;
  traitId: Scalars["ID"];
  traitList: TraitList;
  traitListId: Scalars["ID"];
  valueType: CritterTraitValueType;
};

export type TraitListEntryCreateInput = {
  order: Scalars["Int"];
  required?: InputMaybe<Scalars["Boolean"]>;
  traitId: Scalars["ID"];
  traitListId: Scalars["ID"];
};

export type GetCommunityQueryVariables = Exact<{
  filters: CommunityFilters;
}>;

export type GetCommunityQuery = {
  __typename?: "Query";
  communities: Array<{ __typename?: "Community"; id: string; name: string }>;
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
          trait: {
            __typename?: "Trait";
            id: string;
            valueType: CritterTraitValueType;
          };
        }
      | {
          __typename?: "CritterStringTrait";
          displayValue?: string | null;
          trait: {
            __typename?: "Trait";
            id: string;
            valueType: CritterTraitValueType;
          };
        }
      | {
          __typename?: "CritterTimestampTrait";
          displayValue?: string | null;
          trait: {
            __typename?: "Trait";
            id: string;
            valueType: CritterTraitValueType;
          };
        }
    >;
    species: {
      __typename?: "Species";
      id: string;
      name: string;
      traitLists: Array<{ __typename?: "TraitList"; id: string; name: string }>;
    };
  }>;
};

export type CreateSpeciesTraitMutationVariables = Exact<{
  input: TraitCreateInput;
}>;

export type CreateSpeciesTraitMutation = {
  __typename?: "Mutation";
  createTrait: { __typename?: "Trait"; id: string };
};

export type GetSpeciesDetailQueryVariables = Exact<{
  filters?: InputMaybe<SpeciesFilters>;
}>;

export type GetSpeciesDetailQuery = {
  __typename?: "Query";
  species: Array<{
    __typename?: "Species";
    id: string;
    name: string;
    traitLists: Array<{
      __typename?: "TraitList";
      id: string;
      name: string;
      traitListEntries: Array<{
        __typename?: "TraitListEntry";
        id: string;
        defaultDisplayValue?: string | null;
        order: number;
        required: boolean;
        trait: {
          __typename?: "Trait";
          id: string;
          name: string;
          valueType: CritterTraitValueType;
          enumValues: Array<{
            __typename?: "EnumValue";
            id: string;
            name: string;
          }>;
        };
      }>;
    }>;
  }>;
};

export type GetSpeciesTraitsQueryVariables = Exact<{
  filters: TraitFilters;
}>;

export type GetSpeciesTraitsQuery = {
  __typename?: "Query";
  traits: Array<{
    __typename?: "Trait";
    id: string;
    name: string;
    valueType: CritterTraitValueType;
    enumValues: Array<{ __typename?: "EnumValue"; id: string; name: string }>;
  }>;
};

export type CreateSpeciesMutationVariables = Exact<{
  input: SpeciesCreateInput;
}>;

export type CreateSpeciesMutation = {
  __typename?: "Mutation";
  createSpecies: {
    __typename?: "Species";
    id: string;
    name: string;
    iconUrl: string;
    traitLists: Array<{
      __typename?: "TraitList";
      id: string;
      name: string;
      traitListEntries: Array<{
        __typename?: "TraitListEntry";
        id: string;
        order: number;
        required: boolean;
        defaultDisplayValue?: string | null;
        trait: {
          __typename?: "Trait";
          name: string;
          valueType: CritterTraitValueType;
        };
      }>;
    }>;
  };
};

export type GetSpeciesListViewQueryVariables = Exact<{
  name?: InputMaybe<Scalars["String"]>;
  communityId: Scalars["ID"];
}>;

export type GetSpeciesListViewQuery = {
  __typename?: "Query";
  species: Array<{
    __typename?: "Species";
    id: string;
    name: string;
    iconUrl: string;
    traitLists: Array<{
      __typename?: "TraitList";
      id: string;
      name: string;
      traitListEntries: Array<{
        __typename?: "TraitListEntry";
        id: string;
        order: number;
        required: boolean;
        defaultDisplayValue?: string | null;
        trait: {
          __typename?: "Trait";
          name: string;
          valueType: CritterTraitValueType;
        };
      }>;
    }>;
  }>;
};

export const GetCommunityDocument = gql`
  query getCommunity($filters: CommunityFilters!) {
    communities(filters: $filters) {
      id
      name
    }
  }
`;

/**
 * __useGetCommunityQuery__
 *
 * To run a query within a React component, call `useGetCommunityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommunityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommunityQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetCommunityQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCommunityQuery,
    GetCommunityQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCommunityQuery, GetCommunityQueryVariables>(
    GetCommunityDocument,
    options
  );
}
export function useGetCommunityLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCommunityQuery,
    GetCommunityQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCommunityQuery, GetCommunityQueryVariables>(
    GetCommunityDocument,
    options
  );
}
export type GetCommunityQueryHookResult = ReturnType<
  typeof useGetCommunityQuery
>;
export type GetCommunityLazyQueryHookResult = ReturnType<
  typeof useGetCommunityLazyQuery
>;
export type GetCommunityQueryResult = Apollo.QueryResult<
  GetCommunityQuery,
  GetCommunityQueryVariables
>;
export const GetCrittersDocument = gql`
  query getCritters {
    critters {
      id
      name
      traits {
        ... on CritterTrait {
          trait {
            id
            valueType
          }
          displayValue
        }
      }
      species {
        id
        name
        traitLists {
          id
          name
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
export const CreateSpeciesTraitDocument = gql`
  mutation createSpeciesTrait($input: TraitCreateInput!) {
    createTrait(input: $input) {
      id
    }
  }
`;
export type CreateSpeciesTraitMutationFn = Apollo.MutationFunction<
  CreateSpeciesTraitMutation,
  CreateSpeciesTraitMutationVariables
>;

/**
 * __useCreateSpeciesTraitMutation__
 *
 * To run a mutation, you first call `useCreateSpeciesTraitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSpeciesTraitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSpeciesTraitMutation, { data, loading, error }] = useCreateSpeciesTraitMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSpeciesTraitMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateSpeciesTraitMutation,
    CreateSpeciesTraitMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateSpeciesTraitMutation,
    CreateSpeciesTraitMutationVariables
  >(CreateSpeciesTraitDocument, options);
}
export type CreateSpeciesTraitMutationHookResult = ReturnType<
  typeof useCreateSpeciesTraitMutation
>;
export type CreateSpeciesTraitMutationResult =
  Apollo.MutationResult<CreateSpeciesTraitMutation>;
export type CreateSpeciesTraitMutationOptions = Apollo.BaseMutationOptions<
  CreateSpeciesTraitMutation,
  CreateSpeciesTraitMutationVariables
>;
export const GetSpeciesDetailDocument = gql`
  query getSpeciesDetail($filters: SpeciesFilters) {
    species(filters: $filters) {
      id
      name
      traitLists {
        id
        name
        traitListEntries {
          id
          defaultDisplayValue
          order
          required
          trait {
            id
            name
            valueType
            enumValues {
              id
              name
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetSpeciesDetailQuery__
 *
 * To run a query within a React component, call `useGetSpeciesDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpeciesDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpeciesDetailQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetSpeciesDetailQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetSpeciesDetailQuery,
    GetSpeciesDetailQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSpeciesDetailQuery, GetSpeciesDetailQueryVariables>(
    GetSpeciesDetailDocument,
    options
  );
}
export function useGetSpeciesDetailLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSpeciesDetailQuery,
    GetSpeciesDetailQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetSpeciesDetailQuery,
    GetSpeciesDetailQueryVariables
  >(GetSpeciesDetailDocument, options);
}
export type GetSpeciesDetailQueryHookResult = ReturnType<
  typeof useGetSpeciesDetailQuery
>;
export type GetSpeciesDetailLazyQueryHookResult = ReturnType<
  typeof useGetSpeciesDetailLazyQuery
>;
export type GetSpeciesDetailQueryResult = Apollo.QueryResult<
  GetSpeciesDetailQuery,
  GetSpeciesDetailQueryVariables
>;
export const GetSpeciesTraitsDocument = gql`
  query getSpeciesTraits($filters: TraitFilters!) {
    traits(filters: $filters) {
      id
      name
      enumValues {
        id
        name
      }
      valueType
    }
  }
`;

/**
 * __useGetSpeciesTraitsQuery__
 *
 * To run a query within a React component, call `useGetSpeciesTraitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpeciesTraitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpeciesTraitsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetSpeciesTraitsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetSpeciesTraitsQuery,
    GetSpeciesTraitsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSpeciesTraitsQuery, GetSpeciesTraitsQueryVariables>(
    GetSpeciesTraitsDocument,
    options
  );
}
export function useGetSpeciesTraitsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSpeciesTraitsQuery,
    GetSpeciesTraitsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetSpeciesTraitsQuery,
    GetSpeciesTraitsQueryVariables
  >(GetSpeciesTraitsDocument, options);
}
export type GetSpeciesTraitsQueryHookResult = ReturnType<
  typeof useGetSpeciesTraitsQuery
>;
export type GetSpeciesTraitsLazyQueryHookResult = ReturnType<
  typeof useGetSpeciesTraitsLazyQuery
>;
export type GetSpeciesTraitsQueryResult = Apollo.QueryResult<
  GetSpeciesTraitsQuery,
  GetSpeciesTraitsQueryVariables
>;
export const CreateSpeciesDocument = gql`
  mutation createSpecies($input: SpeciesCreateInput!) {
    createSpecies(input: $input) {
      id
      name
      iconUrl
      traitLists {
        id
        name
        traitListEntries {
          id
          trait {
            name
            valueType
          }
          order
          required
          defaultDisplayValue
        }
      }
    }
  }
`;
export type CreateSpeciesMutationFn = Apollo.MutationFunction<
  CreateSpeciesMutation,
  CreateSpeciesMutationVariables
>;

/**
 * __useCreateSpeciesMutation__
 *
 * To run a mutation, you first call `useCreateSpeciesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSpeciesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSpeciesMutation, { data, loading, error }] = useCreateSpeciesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSpeciesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateSpeciesMutation,
    CreateSpeciesMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateSpeciesMutation,
    CreateSpeciesMutationVariables
  >(CreateSpeciesDocument, options);
}
export type CreateSpeciesMutationHookResult = ReturnType<
  typeof useCreateSpeciesMutation
>;
export type CreateSpeciesMutationResult =
  Apollo.MutationResult<CreateSpeciesMutation>;
export type CreateSpeciesMutationOptions = Apollo.BaseMutationOptions<
  CreateSpeciesMutation,
  CreateSpeciesMutationVariables
>;
export const GetSpeciesListViewDocument = gql`
  query getSpeciesListView($name: String, $communityId: ID!) {
    species(filters: { name: $name, communityId: $communityId }) {
      id
      name
      iconUrl
      traitLists {
        id
        name
        traitListEntries {
          id
          trait {
            name
            valueType
          }
          order
          required
          defaultDisplayValue
        }
      }
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
 *      communityId: // value for 'communityId'
 *   },
 * });
 */
export function useGetSpeciesListViewQuery(
  baseOptions: Apollo.QueryHookOptions<
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
export type AccountKeySpecifier = (
  | "id"
  | "identity"
  | "identityId"
  | "username"
  | AccountKeySpecifier
)[];
export type AccountFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  identity?: FieldPolicy<any> | FieldReadFunction<any>;
  identityId?: FieldPolicy<any> | FieldReadFunction<any>;
  username?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CommunityKeySpecifier = ("id" | "name" | CommunityKeySpecifier)[];
export type CommunityFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CritterKeySpecifier = (
  | "id"
  | "name"
  | "owner"
  | "ownerId"
  | "species"
  | "speciesId"
  | "traitList"
  | "traitListId"
  | "traits"
  | CritterKeySpecifier
)[];
export type CritterFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  owner?: FieldPolicy<any> | FieldReadFunction<any>;
  ownerId?: FieldPolicy<any> | FieldReadFunction<any>;
  species?: FieldPolicy<any> | FieldReadFunction<any>;
  speciesId?: FieldPolicy<any> | FieldReadFunction<any>;
  traitList?: FieldPolicy<any> | FieldReadFunction<any>;
  traitListId?: FieldPolicy<any> | FieldReadFunction<any>;
  traits?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CritterIntTraitKeySpecifier = (
  | "critterId"
  | "displayValue"
  | "id"
  | "trait"
  | "traitId"
  | "valueInt"
  | "valueType"
  | CritterIntTraitKeySpecifier
)[];
export type CritterIntTraitFieldPolicy = {
  critterId?: FieldPolicy<any> | FieldReadFunction<any>;
  displayValue?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  trait?: FieldPolicy<any> | FieldReadFunction<any>;
  traitId?: FieldPolicy<any> | FieldReadFunction<any>;
  valueInt?: FieldPolicy<any> | FieldReadFunction<any>;
  valueType?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CritterStringTraitKeySpecifier = (
  | "critterId"
  | "displayValue"
  | "id"
  | "trait"
  | "traitId"
  | "valueString"
  | "valueType"
  | CritterStringTraitKeySpecifier
)[];
export type CritterStringTraitFieldPolicy = {
  critterId?: FieldPolicy<any> | FieldReadFunction<any>;
  displayValue?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  trait?: FieldPolicy<any> | FieldReadFunction<any>;
  traitId?: FieldPolicy<any> | FieldReadFunction<any>;
  valueString?: FieldPolicy<any> | FieldReadFunction<any>;
  valueType?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CritterTimestampTraitKeySpecifier = (
  | "critterId"
  | "displayValue"
  | "id"
  | "trait"
  | "traitId"
  | "valueTimestamp"
  | "valueType"
  | CritterTimestampTraitKeySpecifier
)[];
export type CritterTimestampTraitFieldPolicy = {
  critterId?: FieldPolicy<any> | FieldReadFunction<any>;
  displayValue?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  trait?: FieldPolicy<any> | FieldReadFunction<any>;
  traitId?: FieldPolicy<any> | FieldReadFunction<any>;
  valueTimestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  valueType?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CritterTraitKeySpecifier = (
  | "critterId"
  | "displayValue"
  | "id"
  | "trait"
  | "traitId"
  | "valueType"
  | CritterTraitKeySpecifier
)[];
export type CritterTraitFieldPolicy = {
  critterId?: FieldPolicy<any> | FieldReadFunction<any>;
  displayValue?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  trait?: FieldPolicy<any> | FieldReadFunction<any>;
  traitId?: FieldPolicy<any> | FieldReadFunction<any>;
  valueType?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EnumValueKeySpecifier = (
  | "id"
  | "name"
  | "trait"
  | "traitId"
  | EnumValueKeySpecifier
)[];
export type EnumValueFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  trait?: FieldPolicy<any> | FieldReadFunction<any>;
  traitId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IdentityKeySpecifier = (
  | "displayName"
  | "email"
  | "id"
  | IdentityKeySpecifier
)[];
export type IdentityFieldPolicy = {
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LoginResponseKeySpecifier = (
  | "account"
  | "identity"
  | "token"
  | LoginResponseKeySpecifier
)[];
export type LoginResponseFieldPolicy = {
  account?: FieldPolicy<any> | FieldReadFunction<any>;
  identity?: FieldPolicy<any> | FieldReadFunction<any>;
  token?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MutationKeySpecifier = (
  | "createCommunity"
  | "createCritter"
  | "createCritterTrait"
  | "createSpecies"
  | "createTrait"
  | "createTraitList"
  | "createTraitListEntry"
  | "login"
  | "register"
  | MutationKeySpecifier
)[];
export type MutationFieldPolicy = {
  createCommunity?: FieldPolicy<any> | FieldReadFunction<any>;
  createCritter?: FieldPolicy<any> | FieldReadFunction<any>;
  createCritterTrait?: FieldPolicy<any> | FieldReadFunction<any>;
  createSpecies?: FieldPolicy<any> | FieldReadFunction<any>;
  createTrait?: FieldPolicy<any> | FieldReadFunction<any>;
  createTraitList?: FieldPolicy<any> | FieldReadFunction<any>;
  createTraitListEntry?: FieldPolicy<any> | FieldReadFunction<any>;
  login?: FieldPolicy<any> | FieldReadFunction<any>;
  register?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type QueryKeySpecifier = (
  | "communities"
  | "critters"
  | "species"
  | "traits"
  | QueryKeySpecifier
)[];
export type QueryFieldPolicy = {
  communities?: FieldPolicy<any> | FieldReadFunction<any>;
  critters?: FieldPolicy<any> | FieldReadFunction<any>;
  species?: FieldPolicy<any> | FieldReadFunction<any>;
  traits?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SpeciesKeySpecifier = (
  | "community"
  | "communityId"
  | "critters"
  | "iconUrl"
  | "id"
  | "name"
  | "traitLists"
  | SpeciesKeySpecifier
)[];
export type SpeciesFieldPolicy = {
  community?: FieldPolicy<any> | FieldReadFunction<any>;
  communityId?: FieldPolicy<any> | FieldReadFunction<any>;
  critters?: FieldPolicy<any> | FieldReadFunction<any>;
  iconUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  traitLists?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TraitKeySpecifier = (
  | "enumValues"
  | "id"
  | "name"
  | "species"
  | "valueType"
  | TraitKeySpecifier
)[];
export type TraitFieldPolicy = {
  enumValues?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  species?: FieldPolicy<any> | FieldReadFunction<any>;
  valueType?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TraitListKeySpecifier = (
  | "id"
  | "name"
  | "species"
  | "speciesId"
  | "traitListEntries"
  | TraitListKeySpecifier
)[];
export type TraitListFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  species?: FieldPolicy<any> | FieldReadFunction<any>;
  speciesId?: FieldPolicy<any> | FieldReadFunction<any>;
  traitListEntries?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TraitListEntryKeySpecifier = (
  | "defaultDisplayValue"
  | "id"
  | "order"
  | "required"
  | "trait"
  | "traitId"
  | "traitList"
  | "traitListId"
  | "valueType"
  | TraitListEntryKeySpecifier
)[];
export type TraitListEntryFieldPolicy = {
  defaultDisplayValue?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  order?: FieldPolicy<any> | FieldReadFunction<any>;
  required?: FieldPolicy<any> | FieldReadFunction<any>;
  trait?: FieldPolicy<any> | FieldReadFunction<any>;
  traitId?: FieldPolicy<any> | FieldReadFunction<any>;
  traitList?: FieldPolicy<any> | FieldReadFunction<any>;
  traitListId?: FieldPolicy<any> | FieldReadFunction<any>;
  valueType?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type StrictTypedTypePolicies = {
  Account?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | AccountKeySpecifier
      | (() => undefined | AccountKeySpecifier);
    fields?: AccountFieldPolicy;
  };
  Community?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CommunityKeySpecifier
      | (() => undefined | CommunityKeySpecifier);
    fields?: CommunityFieldPolicy;
  };
  Critter?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CritterKeySpecifier
      | (() => undefined | CritterKeySpecifier);
    fields?: CritterFieldPolicy;
  };
  CritterIntTrait?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CritterIntTraitKeySpecifier
      | (() => undefined | CritterIntTraitKeySpecifier);
    fields?: CritterIntTraitFieldPolicy;
  };
  CritterStringTrait?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CritterStringTraitKeySpecifier
      | (() => undefined | CritterStringTraitKeySpecifier);
    fields?: CritterStringTraitFieldPolicy;
  };
  CritterTimestampTrait?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CritterTimestampTraitKeySpecifier
      | (() => undefined | CritterTimestampTraitKeySpecifier);
    fields?: CritterTimestampTraitFieldPolicy;
  };
  CritterTrait?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CritterTraitKeySpecifier
      | (() => undefined | CritterTraitKeySpecifier);
    fields?: CritterTraitFieldPolicy;
  };
  EnumValue?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | EnumValueKeySpecifier
      | (() => undefined | EnumValueKeySpecifier);
    fields?: EnumValueFieldPolicy;
  };
  Identity?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | IdentityKeySpecifier
      | (() => undefined | IdentityKeySpecifier);
    fields?: IdentityFieldPolicy;
  };
  LoginResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | LoginResponseKeySpecifier
      | (() => undefined | LoginResponseKeySpecifier);
    fields?: LoginResponseFieldPolicy;
  };
  Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | MutationKeySpecifier
      | (() => undefined | MutationKeySpecifier);
    fields?: MutationFieldPolicy;
  };
  Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | QueryKeySpecifier
      | (() => undefined | QueryKeySpecifier);
    fields?: QueryFieldPolicy;
  };
  Species?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | SpeciesKeySpecifier
      | (() => undefined | SpeciesKeySpecifier);
    fields?: SpeciesFieldPolicy;
  };
  Trait?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | TraitKeySpecifier
      | (() => undefined | TraitKeySpecifier);
    fields?: TraitFieldPolicy;
  };
  TraitList?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | TraitListKeySpecifier
      | (() => undefined | TraitListKeySpecifier);
    fields?: TraitListFieldPolicy;
  };
  TraitListEntry?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | TraitListEntryKeySpecifier
      | (() => undefined | TraitListEntryKeySpecifier);
    fields?: TraitListEntryFieldPolicy;
  };
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;

export class GraphqlService {
  constructor(protected client: Apollo.ApolloClient<any>) {}

  async getCommunity(
    options: Omit<
      Partial<
        Apollo.QueryOptions<GetCommunityQueryVariables, GetCommunityQuery>
      >,
      "variables" | "query"
    > & {
      variables: GetCommunityQueryVariables;
    }
  ) {
    const finalOptions = {
      ...options,
      query: GetCommunityDocument,
    };
    return this.client.query<GetCommunityQuery, GetCommunityQueryVariables>(
      finalOptions
    );
  }

  async getCritters(
    options: Omit<
      Partial<Apollo.QueryOptions<GetCrittersQueryVariables, GetCrittersQuery>>,
      "variables" | "query"
    > & {
      variables: GetCrittersQueryVariables;
    }
  ) {
    const finalOptions = {
      ...options,
      query: GetCrittersDocument,
    };
    return this.client.query<GetCrittersQuery, GetCrittersQueryVariables>(
      finalOptions
    );
  }

  async createSpeciesTrait(
    options: Omit<
      Partial<
        Apollo.MutationOptions<
          CreateSpeciesTraitMutation,
          CreateSpeciesTraitMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: CreateSpeciesTraitMutationVariables;
    }
  ) {
    const finalOptions = {
      ...options,
      mutation: CreateSpeciesTraitDocument,
    };
    return this.client.mutate<
      CreateSpeciesTraitMutation,
      CreateSpeciesTraitMutationVariables
    >(finalOptions);
  }

  async getSpeciesDetail(
    options: Omit<
      Partial<
        Apollo.QueryOptions<
          GetSpeciesDetailQueryVariables,
          GetSpeciesDetailQuery
        >
      >,
      "variables" | "query"
    > & {
      variables: GetSpeciesDetailQueryVariables;
    }
  ) {
    const finalOptions = {
      ...options,
      query: GetSpeciesDetailDocument,
    };
    return this.client.query<
      GetSpeciesDetailQuery,
      GetSpeciesDetailQueryVariables
    >(finalOptions);
  }

  async getSpeciesTraits(
    options: Omit<
      Partial<
        Apollo.QueryOptions<
          GetSpeciesTraitsQueryVariables,
          GetSpeciesTraitsQuery
        >
      >,
      "variables" | "query"
    > & {
      variables: GetSpeciesTraitsQueryVariables;
    }
  ) {
    const finalOptions = {
      ...options,
      query: GetSpeciesTraitsDocument,
    };
    return this.client.query<
      GetSpeciesTraitsQuery,
      GetSpeciesTraitsQueryVariables
    >(finalOptions);
  }

  async createSpecies(
    options: Omit<
      Partial<
        Apollo.MutationOptions<
          CreateSpeciesMutation,
          CreateSpeciesMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: CreateSpeciesMutationVariables;
    }
  ) {
    const finalOptions = {
      ...options,
      mutation: CreateSpeciesDocument,
    };
    return this.client.mutate<
      CreateSpeciesMutation,
      CreateSpeciesMutationVariables
    >(finalOptions);
  }

  async getSpeciesListView(
    options: Omit<
      Partial<
        Apollo.QueryOptions<
          GetSpeciesListViewQueryVariables,
          GetSpeciesListViewQuery
        >
      >,
      "variables" | "query"
    > & {
      variables: GetSpeciesListViewQueryVariables;
    }
  ) {
    const finalOptions = {
      ...options,
      query: GetSpeciesListViewDocument,
    };
    return this.client.query<
      GetSpeciesListViewQuery,
      GetSpeciesListViewQueryVariables
    >(finalOptions);
  }
}
