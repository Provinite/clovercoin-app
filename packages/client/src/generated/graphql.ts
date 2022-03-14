import { GraphQLClient } from "graphql-request";
import * as Dom from "graphql-request/dist/types.dom";
import gql from "graphql-tag";
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

export type GetSpeciesListViewQueryVariables = Exact<{ [key: string]: never }>;

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
export const GetSpeciesListViewDocument = gql`
  query getSpeciesListView {
    species {
      id
      name
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    getCritters(
      variables?: GetCrittersQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetCrittersQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetCrittersQuery>(GetCrittersDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "getCritters"
      );
    },
    getSpeciesListView(
      variables?: GetSpeciesListViewQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetSpeciesListViewQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetSpeciesListViewQuery>(
            GetSpeciesListViewDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "getSpeciesListView"
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
