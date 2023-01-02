/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import {
  FieldPolicy,
  FieldReadFunction,
  TypePolicies,
  TypePolicy,
} from "@apollo/client/cache";
import { DocumentNode } from "graphql";
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
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
}

export interface Account {
  __typename?: "Account";
  id: Scalars["ID"];
  identity: Identity;
  identityId: Scalars["ID"];
  username: Scalars["String"];
}

export interface BaseError {
  message: Scalars["String"];
}

export type CommunitiesResponse = CommunityList | InvalidArgumentError;

export interface Community {
  __typename?: "Community";
  id: Scalars["ID"];
  name: Scalars["String"];
}

export interface CommunityCreateInput {
  name: Scalars["String"];
}

export interface CommunityFilters {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
}

export interface CommunityList {
  __typename?: "CommunityList";
  list: Array<Community>;
}

export type CommunityResponse =
  | Community
  | InvalidArgumentError
  | NotFoundError;

export type CreateCommunityResponse =
  | Community
  | DuplicateError
  | InvalidArgumentError;

export interface Critter {
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
}

export interface CritterCreateInput {
  name: Scalars["String"];
  speciesId: Scalars["String"];
}

export interface CritterIntTrait extends CritterTrait {
  __typename?: "CritterIntTrait";
  critterId: Scalars["ID"];
  displayValue?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  trait: Trait;
  traitId: Scalars["ID"];
  valueInt?: Maybe<Scalars["Float"]>;
  valueType: CritterTraitValueType;
}

export interface CritterStringTrait extends CritterTrait {
  __typename?: "CritterStringTrait";
  critterId: Scalars["ID"];
  displayValue?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  trait: Trait;
  traitId: Scalars["ID"];
  valueString?: Maybe<Scalars["String"]>;
  valueType: CritterTraitValueType;
}

export interface CritterTimestampTrait extends CritterTrait {
  __typename?: "CritterTimestampTrait";
  critterId: Scalars["ID"];
  displayValue?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  trait: Trait;
  traitId: Scalars["ID"];
  valueTimestamp?: Maybe<Scalars["DateTime"]>;
  valueType: CritterTraitValueType;
}

export interface CritterTrait {
  critterId: Scalars["ID"];
  displayValue?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  trait: Trait;
  traitId: Scalars["ID"];
  valueType: CritterTraitValueType;
}

export interface CritterTraitCreateInput {
  critterId: Scalars["ID"];
  traitId: Scalars["ID"];
  valueBool?: InputMaybe<Scalars["Boolean"]>;
  valueDate?: InputMaybe<Scalars["DateTime"]>;
  valueInt?: InputMaybe<Scalars["Int"]>;
  valueString?: InputMaybe<Scalars["String"]>;
}

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

export interface DuplicateError extends BaseError {
  __typename?: "DuplicateError";
  duplicateKeys: Array<Scalars["String"]>;
  message: Scalars["String"];
}

export interface EnumValue {
  __typename?: "EnumValue";
  id: Scalars["ID"];
  name: Scalars["String"];
  order: Scalars["Int"];
  trait: Trait;
  traitId: Scalars["ID"];
}

export interface Identity {
  __typename?: "Identity";
  displayName: Scalars["String"];
  email: Scalars["String"];
  id: Scalars["ID"];
}

export interface InvalidArgumentError extends BaseError {
  __typename?: "InvalidArgumentError";
  message: Scalars["String"];
  validationErrors: Array<ValidationError>;
}

export interface LoginArgs {
  password?: InputMaybe<Scalars["String"]>;
  username?: InputMaybe<Scalars["String"]>;
}

export interface LoginResponse {
  __typename?: "LoginResponse";
  account: Account;
  identity: Identity;
  token: Scalars["String"];
}

export interface Mutation {
  __typename?: "Mutation";
  /** Create a new community */
  createCommunity: CreateCommunityResponse;
  createCritter: Critter;
  createCritterTrait: CritterTraitUnion;
  createSpecies: SpeciesCreateResponse;
  createTrait: Trait;
  createTraitList: TraitList;
  createTraitListEntry: TraitListEntry;
  deleteTrait: Scalars["String"];
  deleteTraitListEntry: Scalars["String"];
  /** Log in using local credentials and receive an auth token */
  login: LoginResponse;
  modifyTrait: Trait;
  /** Create a new account and receive an auth token */
  register: LoginResponse;
}

export interface MutationCreateCommunityArgs {
  input: CommunityCreateInput;
}

export interface MutationCreateCritterArgs {
  input: CritterCreateInput;
}

export interface MutationCreateCritterTraitArgs {
  input: CritterTraitCreateInput;
}

export interface MutationCreateSpeciesArgs {
  input: SpeciesCreateInput;
}

export interface MutationCreateTraitArgs {
  input: TraitCreateInput;
}

export interface MutationCreateTraitListArgs {
  input: TraitListCreateInput;
}

export interface MutationCreateTraitListEntryArgs {
  input: TraitListEntryCreateInput;
}

export interface MutationDeleteTraitArgs {
  id: Scalars["ID"];
}

export interface MutationDeleteTraitListEntryArgs {
  id: Scalars["ID"];
}

export interface MutationLoginArgs {
  input: LoginArgs;
}

export interface MutationModifyTraitArgs {
  input: TraitModifyInput;
}

export interface MutationRegisterArgs {
  input: RegisterArgs;
}

export interface NotFoundError extends BaseError {
  __typename?: "NotFoundError";
  message: Scalars["String"];
}

export interface Query {
  __typename?: "Query";
  /** Fetch a list of communities with filtering */
  communities: CommunitiesResponse;
  /** Fetch a community by id and/or name */
  community: CommunityResponse;
  critters: Array<Critter>;
  species: SpeciesResponse;
  traits: Array<Trait>;
}

export interface QueryCommunitiesArgs {
  filters: CommunityFilters;
}

export interface QueryCommunityArgs {
  filters: CommunityFilters;
}

export interface QuerySpeciesArgs {
  filters?: InputMaybe<SpeciesFilters>;
}

export interface QueryTraitsArgs {
  filters: TraitFilters;
}

export interface RegisterArgs {
  email?: InputMaybe<Scalars["String"]>;
  password?: InputMaybe<Scalars["String"]>;
  username?: InputMaybe<Scalars["String"]>;
}

/** Model representing an arbitrarily broad class of characters that use common variants and administration. */
export interface Species {
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
}

export interface SpeciesCreateInput {
  communityId: Scalars["ID"];
  iconUrl: Scalars["String"];
  name: Scalars["String"];
}

export type SpeciesCreateResponse =
  | DuplicateError
  | InvalidArgumentError
  | Species;

export interface SpeciesFilters {
  communityId: Scalars["ID"];
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
}

export interface SpeciesList {
  __typename?: "SpeciesList";
  list: Array<Species>;
}

export type SpeciesResponse = InvalidArgumentError | SpeciesList;

export interface Trait {
  __typename?: "Trait";
  enumValues: Array<EnumValue>;
  id: Scalars["ID"];
  name: Scalars["String"];
  species: Species;
  valueType: CritterTraitValueType;
}

export interface TraitCreateEnumValueInput {
  name: Scalars["String"];
  order: Scalars["Float"];
}

export interface TraitCreateInput {
  enumValues: Array<TraitCreateEnumValueInput>;
  name: Scalars["String"];
  speciesId: Scalars["ID"];
  valueType: CritterTraitValueType;
}

export interface TraitFilters {
  speciesId: Scalars["ID"];
}

export interface TraitList {
  __typename?: "TraitList";
  id: Scalars["ID"];
  name: Scalars["String"];
  species: Species;
  speciesId: Scalars["ID"];
  traitListEntries: Array<TraitListEntry>;
}

export interface TraitListCreateInput {
  name: Scalars["String"];
  speciesId: Scalars["ID"];
}

export interface TraitListEntry {
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
}

export interface TraitListEntryCreateInput {
  order: Scalars["Int"];
  required?: InputMaybe<Scalars["Boolean"]>;
  traitId: Scalars["ID"];
  traitListId: Scalars["ID"];
}

export interface TraitModifyEnumValueInput {
  id?: InputMaybe<Scalars["ID"]>;
  name: Scalars["String"];
  order: Scalars["Float"];
}

export interface TraitModifyInput {
  enumValues?: InputMaybe<Array<TraitModifyEnumValueInput>>;
  id: Scalars["ID"];
  name: Scalars["String"];
  valueType: CritterTraitValueType;
}

export interface ValidationConstraint {
  __typename?: "ValidationConstraint";
  description: Scalars["String"];
  key: Scalars["String"];
}

export interface ValidationError {
  __typename?: "ValidationError";
  constraints: Array<ValidationConstraint>;
  field: Scalars["String"];
}

export type CreateCommunityMutationVariables = Exact<{
  input: CommunityCreateInput;
}>;

export type CreateCommunityMutation = {
  __typename?: "Mutation";
  createCommunity:
    | { __typename: "Community"; name: string; id: string }
    | {
        __typename: "DuplicateError";
        duplicateKeys: Array<string>;
        message: string;
      }
    | {
        __typename: "InvalidArgumentError";
        message: string;
        validationErrors: Array<{
          __typename?: "ValidationError";
          field: string;
          constraints: Array<{
            __typename?: "ValidationConstraint";
            key: string;
            description: string;
          }>;
        }>;
      };
};

export type GetCommunityQueryVariables = Exact<{
  filters: CommunityFilters;
}>;

export type GetCommunityQuery = {
  __typename?: "Query";
  community:
    | { __typename: "Community"; id: string; name: string }
    | { __typename: "InvalidArgumentError"; message: string }
    | { __typename: "NotFoundError"; message: string };
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

export type GetCommunityListViewQueryVariables = Exact<{
  filters: CommunityFilters;
}>;

export type GetCommunityListViewQuery = {
  __typename?: "Query";
  communities:
    | {
        __typename: "CommunityList";
        list: Array<{ __typename?: "Community"; id: string; name: string }>;
      }
    | {
        __typename: "InvalidArgumentError";
        message: string;
        validationErrors: Array<{
          __typename?: "ValidationError";
          field: string;
          constraints: Array<{
            __typename?: "ValidationConstraint";
            key: string;
            description: string;
          }>;
        }>;
      };
};

export type CreateTraitListEntryMutationVariables = Exact<{
  input: TraitListEntryCreateInput;
}>;

export type CreateTraitListEntryMutation = {
  __typename?: "Mutation";
  createTraitListEntry: {
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
      enumValues: Array<{ __typename?: "EnumValue"; id: string; name: string }>;
    };
  };
};

export type CreateSpeciesTraitMutationVariables = Exact<{
  input: TraitCreateInput;
}>;

export type CreateSpeciesTraitMutation = {
  __typename?: "Mutation";
  createTrait: { __typename?: "Trait"; id: string };
};

export type DeleteTraitMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteTraitMutation = {
  __typename?: "Mutation";
  deleteTrait: string;
};

export type DeleteTraitListEntryMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteTraitListEntryMutation = {
  __typename?: "Mutation";
  deleteTraitListEntry: string;
};

export type GetSpeciesDetailQueryVariables = Exact<{
  filters?: InputMaybe<SpeciesFilters>;
}>;

export type GetSpeciesDetailQuery = {
  __typename?: "Query";
  species:
    | {
        __typename?: "InvalidArgumentError";
        message: string;
        validationErrors: Array<{
          __typename?: "ValidationError";
          field: string;
          constraints: Array<{
            __typename?: "ValidationConstraint";
            key: string;
            description: string;
          }>;
        }>;
      }
    | {
        __typename?: "SpeciesList";
        list: Array<{
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

export type ModifySpeciesTraitMutationVariables = Exact<{
  input: TraitModifyInput;
}>;

export type ModifySpeciesTraitMutation = {
  __typename?: "Mutation";
  modifyTrait: {
    __typename?: "Trait";
    id: string;
    name: string;
    valueType: CritterTraitValueType;
    enumValues: Array<{ __typename?: "EnumValue"; id: string; name: string }>;
  };
};

export type CreateSpeciesMutationVariables = Exact<{
  input: SpeciesCreateInput;
}>;

export type CreateSpeciesMutation = {
  __typename: "Mutation";
  createSpecies:
    | {
        __typename?: "DuplicateError";
        duplicateKeys: Array<string>;
        message: string;
      }
    | {
        __typename?: "InvalidArgumentError";
        message: string;
        validationErrors: Array<{
          __typename?: "ValidationError";
          constraints: Array<{
            __typename?: "ValidationConstraint";
            description: string;
            key: string;
          }>;
        }>;
      }
    | {
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
  species:
    | {
        __typename: "InvalidArgumentError";
        message: string;
        validationErrors: Array<{
          __typename?: "ValidationError";
          field: string;
          constraints: Array<{
            __typename?: "ValidationConstraint";
            key: string;
            description: string;
          }>;
        }>;
      }
    | {
        __typename: "SpeciesList";
        list: Array<{
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
};

export type BaseErrorFragment_DuplicateError_Fragment = {
  __typename?: "DuplicateError";
  message: string;
};

export type BaseErrorFragment_InvalidArgumentError_Fragment = {
  __typename?: "InvalidArgumentError";
  message: string;
};

export type BaseErrorFragment_NotFoundError_Fragment = {
  __typename?: "NotFoundError";
  message: string;
};

export type BaseErrorFragmentFragment =
  | BaseErrorFragment_DuplicateError_Fragment
  | BaseErrorFragment_InvalidArgumentError_Fragment
  | BaseErrorFragment_NotFoundError_Fragment;

export type DuplicateErrorFragmentFragment = {
  __typename: "DuplicateError";
  duplicateKeys: Array<string>;
  message: string;
};

export type InvalidArgumentErrorFragmentFragment = {
  __typename?: "InvalidArgumentError";
  message: string;
  validationErrors: Array<{
    __typename?: "ValidationError";
    field: string;
    constraints: Array<{
      __typename?: "ValidationConstraint";
      key: string;
      description: string;
    }>;
  }>;
};

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
export type BaseErrorKeySpecifier = ("message" | BaseErrorKeySpecifier)[];
export type BaseErrorFieldPolicy = {
  message?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CommunityKeySpecifier = ("id" | "name" | CommunityKeySpecifier)[];
export type CommunityFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CommunityListKeySpecifier = ("list" | CommunityListKeySpecifier)[];
export type CommunityListFieldPolicy = {
  list?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type DuplicateErrorKeySpecifier = (
  | "duplicateKeys"
  | "message"
  | DuplicateErrorKeySpecifier
)[];
export type DuplicateErrorFieldPolicy = {
  duplicateKeys?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EnumValueKeySpecifier = (
  | "id"
  | "name"
  | "order"
  | "trait"
  | "traitId"
  | EnumValueKeySpecifier
)[];
export type EnumValueFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  order?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type InvalidArgumentErrorKeySpecifier = (
  | "message"
  | "validationErrors"
  | InvalidArgumentErrorKeySpecifier
)[];
export type InvalidArgumentErrorFieldPolicy = {
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  validationErrors?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | "deleteTrait"
  | "deleteTraitListEntry"
  | "login"
  | "modifyTrait"
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
  deleteTrait?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteTraitListEntry?: FieldPolicy<any> | FieldReadFunction<any>;
  login?: FieldPolicy<any> | FieldReadFunction<any>;
  modifyTrait?: FieldPolicy<any> | FieldReadFunction<any>;
  register?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NotFoundErrorKeySpecifier = (
  | "message"
  | NotFoundErrorKeySpecifier
)[];
export type NotFoundErrorFieldPolicy = {
  message?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type QueryKeySpecifier = (
  | "communities"
  | "community"
  | "critters"
  | "species"
  | "traits"
  | QueryKeySpecifier
)[];
export type QueryFieldPolicy = {
  communities?: FieldPolicy<any> | FieldReadFunction<any>;
  community?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type SpeciesListKeySpecifier = ("list" | SpeciesListKeySpecifier)[];
export type SpeciesListFieldPolicy = {
  list?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type ValidationConstraintKeySpecifier = (
  | "description"
  | "key"
  | ValidationConstraintKeySpecifier
)[];
export type ValidationConstraintFieldPolicy = {
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ValidationErrorKeySpecifier = (
  | "constraints"
  | "field"
  | ValidationErrorKeySpecifier
)[];
export type ValidationErrorFieldPolicy = {
  constraints?: FieldPolicy<any> | FieldReadFunction<any>;
  field?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type StrictTypedTypePolicies = {
  Account?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | AccountKeySpecifier
      | (() => undefined | AccountKeySpecifier);
    fields?: AccountFieldPolicy;
  };
  BaseError?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | BaseErrorKeySpecifier
      | (() => undefined | BaseErrorKeySpecifier);
    fields?: BaseErrorFieldPolicy;
  };
  Community?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CommunityKeySpecifier
      | (() => undefined | CommunityKeySpecifier);
    fields?: CommunityFieldPolicy;
  };
  CommunityList?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CommunityListKeySpecifier
      | (() => undefined | CommunityListKeySpecifier);
    fields?: CommunityListFieldPolicy;
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
  DuplicateError?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | DuplicateErrorKeySpecifier
      | (() => undefined | DuplicateErrorKeySpecifier);
    fields?: DuplicateErrorFieldPolicy;
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
  InvalidArgumentError?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | InvalidArgumentErrorKeySpecifier
      | (() => undefined | InvalidArgumentErrorKeySpecifier);
    fields?: InvalidArgumentErrorFieldPolicy;
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
  NotFoundError?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | NotFoundErrorKeySpecifier
      | (() => undefined | NotFoundErrorKeySpecifier);
    fields?: NotFoundErrorFieldPolicy;
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
  SpeciesList?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | SpeciesListKeySpecifier
      | (() => undefined | SpeciesListKeySpecifier);
    fields?: SpeciesListFieldPolicy;
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
  ValidationConstraint?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | ValidationConstraintKeySpecifier
      | (() => undefined | ValidationConstraintKeySpecifier);
    fields?: ValidationConstraintFieldPolicy;
  };
  ValidationError?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | ValidationErrorKeySpecifier
      | (() => undefined | ValidationErrorKeySpecifier);
    fields?: ValidationErrorFieldPolicy;
  };
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;
export const BaseErrorFragmentFragmentDoc = gql`
  fragment BaseErrorFragment on BaseError {
    message
  }
`;
export const DuplicateErrorFragmentFragmentDoc = gql`
  fragment DuplicateErrorFragment on DuplicateError {
    __typename
    duplicateKeys
    message
  }
`;
export const InvalidArgumentErrorFragmentFragmentDoc = gql`
  fragment InvalidArgumentErrorFragment on InvalidArgumentError {
    message
    validationErrors {
      constraints {
        key
        description
      }
      field
    }
  }
`;
export const CreateCommunityDocument = gql`
  mutation createCommunity($input: CommunityCreateInput!) {
    createCommunity(input: $input) {
      __typename
      ... on Community {
        name
        id
      }
      ... on DuplicateError {
        ...DuplicateErrorFragment
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
    }
  }
  ${DuplicateErrorFragmentFragmentDoc}
  ${InvalidArgumentErrorFragmentFragmentDoc}
  ${BaseErrorFragmentFragmentDoc}
`;
export const GetCommunityDocument = gql`
  query getCommunity($filters: CommunityFilters!) {
    community(filters: $filters) {
      __typename
      ... on Community {
        id
        name
      }
      ... on NotFoundError {
        message
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
    }
  }
  ${BaseErrorFragmentFragmentDoc}
`;
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
export const GetCommunityListViewDocument = gql`
  query getCommunityListView($filters: CommunityFilters!) {
    communities(filters: $filters) {
      __typename
      ... on CommunityList {
        list {
          id
          name
        }
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
    }
  }
  ${BaseErrorFragmentFragmentDoc}
  ${InvalidArgumentErrorFragmentFragmentDoc}
`;
export const CreateTraitListEntryDocument = gql`
  mutation createTraitListEntry($input: TraitListEntryCreateInput!) {
    createTraitListEntry(input: $input) {
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
`;
export const CreateSpeciesTraitDocument = gql`
  mutation createSpeciesTrait($input: TraitCreateInput!) {
    createTrait(input: $input) {
      id
    }
  }
`;
export const DeleteTraitDocument = gql`
  mutation deleteTrait($id: ID!) {
    deleteTrait(id: $id)
  }
`;
export const DeleteTraitListEntryDocument = gql`
  mutation deleteTraitListEntry($id: ID!) {
    deleteTraitListEntry(id: $id)
  }
`;
export const GetSpeciesDetailDocument = gql`
  query getSpeciesDetail($filters: SpeciesFilters) {
    species(filters: $filters) {
      ... on SpeciesList {
        list {
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
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
    }
  }
  ${InvalidArgumentErrorFragmentFragmentDoc}
`;
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
export const ModifySpeciesTraitDocument = gql`
  mutation modifySpeciesTrait($input: TraitModifyInput!) {
    modifyTrait(input: $input) {
      id
      name
      valueType
      enumValues {
        id
        name
      }
    }
  }
`;
export const CreateSpeciesDocument = gql`
  mutation createSpecies($input: SpeciesCreateInput!) {
    __typename
    createSpecies(input: $input) {
      ... on Species {
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
      ... on DuplicateError {
        duplicateKeys
        message
      }
      ... on InvalidArgumentError {
        message
        validationErrors {
          constraints {
            description
            key
          }
        }
      }
      ... on BaseError {
        message
      }
    }
  }
`;
export const GetSpeciesListViewDocument = gql`
  query getSpeciesListView($name: String, $communityId: ID!) {
    species(filters: { name: $name, communityId: $communityId }) {
      __typename
      ... on SpeciesList {
        list {
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
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
    }
  }
  ${InvalidArgumentErrorFragmentFragmentDoc}
  ${BaseErrorFragmentFragmentDoc}
`;
export type Requester<C = {}, E = unknown> = <R, V>(
  doc: DocumentNode,
  vars?: V,
  options?: C
) => Promise<R> | AsyncIterable<R>;
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    createCommunity(
      variables: CreateCommunityMutationVariables,
      options?: C
    ): Promise<CreateCommunityMutation> {
      return requester<
        CreateCommunityMutation,
        CreateCommunityMutationVariables
      >(
        CreateCommunityDocument,
        variables,
        options
      ) as Promise<CreateCommunityMutation>;
    },
    getCommunity(
      variables: GetCommunityQueryVariables,
      options?: C
    ): Promise<GetCommunityQuery> {
      return requester<GetCommunityQuery, GetCommunityQueryVariables>(
        GetCommunityDocument,
        variables,
        options
      ) as Promise<GetCommunityQuery>;
    },
    getCritters(
      variables?: GetCrittersQueryVariables,
      options?: C
    ): Promise<GetCrittersQuery> {
      return requester<GetCrittersQuery, GetCrittersQueryVariables>(
        GetCrittersDocument,
        variables,
        options
      ) as Promise<GetCrittersQuery>;
    },
    getCommunityListView(
      variables: GetCommunityListViewQueryVariables,
      options?: C
    ): Promise<GetCommunityListViewQuery> {
      return requester<
        GetCommunityListViewQuery,
        GetCommunityListViewQueryVariables
      >(
        GetCommunityListViewDocument,
        variables,
        options
      ) as Promise<GetCommunityListViewQuery>;
    },
    createTraitListEntry(
      variables: CreateTraitListEntryMutationVariables,
      options?: C
    ): Promise<CreateTraitListEntryMutation> {
      return requester<
        CreateTraitListEntryMutation,
        CreateTraitListEntryMutationVariables
      >(
        CreateTraitListEntryDocument,
        variables,
        options
      ) as Promise<CreateTraitListEntryMutation>;
    },
    createSpeciesTrait(
      variables: CreateSpeciesTraitMutationVariables,
      options?: C
    ): Promise<CreateSpeciesTraitMutation> {
      return requester<
        CreateSpeciesTraitMutation,
        CreateSpeciesTraitMutationVariables
      >(
        CreateSpeciesTraitDocument,
        variables,
        options
      ) as Promise<CreateSpeciesTraitMutation>;
    },
    deleteTrait(
      variables: DeleteTraitMutationVariables,
      options?: C
    ): Promise<DeleteTraitMutation> {
      return requester<DeleteTraitMutation, DeleteTraitMutationVariables>(
        DeleteTraitDocument,
        variables,
        options
      ) as Promise<DeleteTraitMutation>;
    },
    deleteTraitListEntry(
      variables: DeleteTraitListEntryMutationVariables,
      options?: C
    ): Promise<DeleteTraitListEntryMutation> {
      return requester<
        DeleteTraitListEntryMutation,
        DeleteTraitListEntryMutationVariables
      >(
        DeleteTraitListEntryDocument,
        variables,
        options
      ) as Promise<DeleteTraitListEntryMutation>;
    },
    getSpeciesDetail(
      variables?: GetSpeciesDetailQueryVariables,
      options?: C
    ): Promise<GetSpeciesDetailQuery> {
      return requester<GetSpeciesDetailQuery, GetSpeciesDetailQueryVariables>(
        GetSpeciesDetailDocument,
        variables,
        options
      ) as Promise<GetSpeciesDetailQuery>;
    },
    getSpeciesTraits(
      variables: GetSpeciesTraitsQueryVariables,
      options?: C
    ): Promise<GetSpeciesTraitsQuery> {
      return requester<GetSpeciesTraitsQuery, GetSpeciesTraitsQueryVariables>(
        GetSpeciesTraitsDocument,
        variables,
        options
      ) as Promise<GetSpeciesTraitsQuery>;
    },
    modifySpeciesTrait(
      variables: ModifySpeciesTraitMutationVariables,
      options?: C
    ): Promise<ModifySpeciesTraitMutation> {
      return requester<
        ModifySpeciesTraitMutation,
        ModifySpeciesTraitMutationVariables
      >(
        ModifySpeciesTraitDocument,
        variables,
        options
      ) as Promise<ModifySpeciesTraitMutation>;
    },
    createSpecies(
      variables: CreateSpeciesMutationVariables,
      options?: C
    ): Promise<CreateSpeciesMutation> {
      return requester<CreateSpeciesMutation, CreateSpeciesMutationVariables>(
        CreateSpeciesDocument,
        variables,
        options
      ) as Promise<CreateSpeciesMutation>;
    },
    getSpeciesListView(
      variables: GetSpeciesListViewQueryVariables,
      options?: C
    ): Promise<GetSpeciesListViewQuery> {
      return requester<
        GetSpeciesListViewQuery,
        GetSpeciesListViewQueryVariables
      >(
        GetSpeciesListViewDocument,
        variables,
        options
      ) as Promise<GetSpeciesListViewQuery>;
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;

export class GraphqlService {
  constructor(
    protected client: import("@apollo/client/core").ApolloClient<any>
  ) {}

  async createCommunity(
    options: Omit<
      Partial<
        import("@apollo/client/core").MutationOptions<
          CreateCommunityMutation,
          CreateCommunityMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: CreateCommunityMutationVariables;
    }
  ): Promise<
    Omit<
      import("@apollo/client/core").FetchResult<CreateCommunityMutation>,
      "data"
    > & { data: CreateCommunityMutation }
  > {
    const finalOptions = {
      ...options,
      mutation: CreateCommunityDocument,
    };
    const result = await this.client.mutate<
      CreateCommunityMutation,
      CreateCommunityMutationVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async getCommunity(
    options: Omit<
      Partial<
        import("@apollo/client/core").QueryOptions<
          GetCommunityQueryVariables,
          GetCommunityQuery
        >
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
    const result = await this.client.query<
      GetCommunityQuery,
      GetCommunityQueryVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async getCritters(
    options: Omit<
      Partial<
        import("@apollo/client/core").QueryOptions<
          GetCrittersQueryVariables,
          GetCrittersQuery
        >
      >,
      "variables" | "query"
    > & {
      variables: GetCrittersQueryVariables;
    }
  ) {
    const finalOptions = {
      ...options,
      query: GetCrittersDocument,
    };
    const result = await this.client.query<
      GetCrittersQuery,
      GetCrittersQueryVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async getCommunityListView(
    options: Omit<
      Partial<
        import("@apollo/client/core").QueryOptions<
          GetCommunityListViewQueryVariables,
          GetCommunityListViewQuery
        >
      >,
      "variables" | "query"
    > & {
      variables: GetCommunityListViewQueryVariables;
    }
  ) {
    const finalOptions = {
      ...options,
      query: GetCommunityListViewDocument,
    };
    const result = await this.client.query<
      GetCommunityListViewQuery,
      GetCommunityListViewQueryVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async createTraitListEntry(
    options: Omit<
      Partial<
        import("@apollo/client/core").MutationOptions<
          CreateTraitListEntryMutation,
          CreateTraitListEntryMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: CreateTraitListEntryMutationVariables;
    }
  ): Promise<
    Omit<
      import("@apollo/client/core").FetchResult<CreateTraitListEntryMutation>,
      "data"
    > & { data: CreateTraitListEntryMutation }
  > {
    const finalOptions = {
      ...options,
      mutation: CreateTraitListEntryDocument,
    };
    const result = await this.client.mutate<
      CreateTraitListEntryMutation,
      CreateTraitListEntryMutationVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async createSpeciesTrait(
    options: Omit<
      Partial<
        import("@apollo/client/core").MutationOptions<
          CreateSpeciesTraitMutation,
          CreateSpeciesTraitMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: CreateSpeciesTraitMutationVariables;
    }
  ): Promise<
    Omit<
      import("@apollo/client/core").FetchResult<CreateSpeciesTraitMutation>,
      "data"
    > & { data: CreateSpeciesTraitMutation }
  > {
    const finalOptions = {
      ...options,
      mutation: CreateSpeciesTraitDocument,
    };
    const result = await this.client.mutate<
      CreateSpeciesTraitMutation,
      CreateSpeciesTraitMutationVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async deleteTrait(
    options: Omit<
      Partial<
        import("@apollo/client/core").MutationOptions<
          DeleteTraitMutation,
          DeleteTraitMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: DeleteTraitMutationVariables;
    }
  ): Promise<
    Omit<
      import("@apollo/client/core").FetchResult<DeleteTraitMutation>,
      "data"
    > & { data: DeleteTraitMutation }
  > {
    const finalOptions = {
      ...options,
      mutation: DeleteTraitDocument,
    };
    const result = await this.client.mutate<
      DeleteTraitMutation,
      DeleteTraitMutationVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async deleteTraitListEntry(
    options: Omit<
      Partial<
        import("@apollo/client/core").MutationOptions<
          DeleteTraitListEntryMutation,
          DeleteTraitListEntryMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: DeleteTraitListEntryMutationVariables;
    }
  ): Promise<
    Omit<
      import("@apollo/client/core").FetchResult<DeleteTraitListEntryMutation>,
      "data"
    > & { data: DeleteTraitListEntryMutation }
  > {
    const finalOptions = {
      ...options,
      mutation: DeleteTraitListEntryDocument,
    };
    const result = await this.client.mutate<
      DeleteTraitListEntryMutation,
      DeleteTraitListEntryMutationVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async getSpeciesDetail(
    options: Omit<
      Partial<
        import("@apollo/client/core").QueryOptions<
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
    const result = await this.client.query<
      GetSpeciesDetailQuery,
      GetSpeciesDetailQueryVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async getSpeciesTraits(
    options: Omit<
      Partial<
        import("@apollo/client/core").QueryOptions<
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
    const result = await this.client.query<
      GetSpeciesTraitsQuery,
      GetSpeciesTraitsQueryVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async modifySpeciesTrait(
    options: Omit<
      Partial<
        import("@apollo/client/core").MutationOptions<
          ModifySpeciesTraitMutation,
          ModifySpeciesTraitMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: ModifySpeciesTraitMutationVariables;
    }
  ): Promise<
    Omit<
      import("@apollo/client/core").FetchResult<ModifySpeciesTraitMutation>,
      "data"
    > & { data: ModifySpeciesTraitMutation }
  > {
    const finalOptions = {
      ...options,
      mutation: ModifySpeciesTraitDocument,
    };
    const result = await this.client.mutate<
      ModifySpeciesTraitMutation,
      ModifySpeciesTraitMutationVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async createSpecies(
    options: Omit<
      Partial<
        import("@apollo/client/core").MutationOptions<
          CreateSpeciesMutation,
          CreateSpeciesMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: CreateSpeciesMutationVariables;
    }
  ): Promise<
    Omit<
      import("@apollo/client/core").FetchResult<CreateSpeciesMutation>,
      "data"
    > & { data: CreateSpeciesMutation }
  > {
    const finalOptions = {
      ...options,
      mutation: CreateSpeciesDocument,
    };
    const result = await this.client.mutate<
      CreateSpeciesMutation,
      CreateSpeciesMutationVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async getSpeciesListView(
    options: Omit<
      Partial<
        import("@apollo/client/core").QueryOptions<
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
    const result = await this.client.query<
      GetSpeciesListViewQuery,
      GetSpeciesListViewQueryVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }
}

function hasData(result: any): result is { data: {} } {
  return Boolean(result && result.data);
}

export function hasTypeName<T extends string>(
  val: any,
  typename: T
): val is { __typeName: T } {
  return val && typeof val === "object" && val.__typename === typename;
}

export function isAccount(val: unknown): val is { __typename: "Account" } {
  return hasTypeName(val, "Account");
}

export type NarrowToAccount<T> = T extends { __typename?: "Account" }
  ? T
  : never;

export function isCommunity(val: unknown): val is { __typename: "Community" } {
  return hasTypeName(val, "Community");
}

export type NarrowToCommunity<T> = T extends { __typename?: "Community" }
  ? T
  : never;

export function isCommunityList(
  val: unknown
): val is { __typename: "CommunityList" } {
  return hasTypeName(val, "CommunityList");
}

export type NarrowToCommunityList<T> = T extends {
  __typename?: "CommunityList";
}
  ? T
  : never;

export function isCritter(val: unknown): val is { __typename: "Critter" } {
  return hasTypeName(val, "Critter");
}

export type NarrowToCritter<T> = T extends { __typename?: "Critter" }
  ? T
  : never;

export function isCritterIntTrait(
  val: unknown
): val is { __typename: "CritterIntTrait" } {
  return hasTypeName(val, "CritterIntTrait");
}

export type NarrowToCritterIntTrait<T> = T extends {
  __typename?: "CritterIntTrait";
}
  ? T
  : never;

export function isCritterStringTrait(
  val: unknown
): val is { __typename: "CritterStringTrait" } {
  return hasTypeName(val, "CritterStringTrait");
}

export type NarrowToCritterStringTrait<T> = T extends {
  __typename?: "CritterStringTrait";
}
  ? T
  : never;

export function isCritterTimestampTrait(
  val: unknown
): val is { __typename: "CritterTimestampTrait" } {
  return hasTypeName(val, "CritterTimestampTrait");
}

export type NarrowToCritterTimestampTrait<T> = T extends {
  __typename?: "CritterTimestampTrait";
}
  ? T
  : never;

export function isDuplicateError(
  val: unknown
): val is { __typename: "DuplicateError" } {
  return hasTypeName(val, "DuplicateError");
}

export type NarrowToDuplicateError<T> = T extends {
  __typename?: "DuplicateError";
}
  ? T
  : never;

export function isEnumValue(val: unknown): val is { __typename: "EnumValue" } {
  return hasTypeName(val, "EnumValue");
}

export type NarrowToEnumValue<T> = T extends { __typename?: "EnumValue" }
  ? T
  : never;

export function isIdentity(val: unknown): val is { __typename: "Identity" } {
  return hasTypeName(val, "Identity");
}

export type NarrowToIdentity<T> = T extends { __typename?: "Identity" }
  ? T
  : never;

export function isInvalidArgumentError(
  val: unknown
): val is { __typename: "InvalidArgumentError" } {
  return hasTypeName(val, "InvalidArgumentError");
}

export type NarrowToInvalidArgumentError<T> = T extends {
  __typename?: "InvalidArgumentError";
}
  ? T
  : never;

export function isLoginResponse(
  val: unknown
): val is { __typename: "LoginResponse" } {
  return hasTypeName(val, "LoginResponse");
}

export type NarrowToLoginResponse<T> = T extends {
  __typename?: "LoginResponse";
}
  ? T
  : never;

export function isMutation(val: unknown): val is { __typename: "Mutation" } {
  return hasTypeName(val, "Mutation");
}

export type NarrowToMutation<T> = T extends { __typename?: "Mutation" }
  ? T
  : never;

export function isNotFoundError(
  val: unknown
): val is { __typename: "NotFoundError" } {
  return hasTypeName(val, "NotFoundError");
}

export type NarrowToNotFoundError<T> = T extends {
  __typename?: "NotFoundError";
}
  ? T
  : never;

export function isQuery(val: unknown): val is { __typename: "Query" } {
  return hasTypeName(val, "Query");
}

export type NarrowToQuery<T> = T extends { __typename?: "Query" } ? T : never;

export function isSpecies(val: unknown): val is { __typename: "Species" } {
  return hasTypeName(val, "Species");
}

export type NarrowToSpecies<T> = T extends { __typename?: "Species" }
  ? T
  : never;

export function isSpeciesList(
  val: unknown
): val is { __typename: "SpeciesList" } {
  return hasTypeName(val, "SpeciesList");
}

export type NarrowToSpeciesList<T> = T extends { __typename?: "SpeciesList" }
  ? T
  : never;

export function isTrait(val: unknown): val is { __typename: "Trait" } {
  return hasTypeName(val, "Trait");
}

export type NarrowToTrait<T> = T extends { __typename?: "Trait" } ? T : never;

export function isTraitList(val: unknown): val is { __typename: "TraitList" } {
  return hasTypeName(val, "TraitList");
}

export type NarrowToTraitList<T> = T extends { __typename?: "TraitList" }
  ? T
  : never;

export function isTraitListEntry(
  val: unknown
): val is { __typename: "TraitListEntry" } {
  return hasTypeName(val, "TraitListEntry");
}

export type NarrowToTraitListEntry<T> = T extends {
  __typename?: "TraitListEntry";
}
  ? T
  : never;

export function isValidationConstraint(
  val: unknown
): val is { __typename: "ValidationConstraint" } {
  return hasTypeName(val, "ValidationConstraint");
}

export type NarrowToValidationConstraint<T> = T extends {
  __typename?: "ValidationConstraint";
}
  ? T
  : never;

export function isValidationError(
  val: unknown
): val is { __typename: "ValidationError" } {
  return hasTypeName(val, "ValidationError");
}

export type NarrowToValidationError<T> = T extends {
  __typename?: "ValidationError";
}
  ? T
  : never;

export function isBaseError(val: any): val is {
  __typename?: "DuplicateError" | "InvalidArgumentError" | "NotFoundError";
} {
  return (
    val &&
    val.__typename &&
    (val.__typename === "DuplicateError" ||
      val.__typename === "InvalidArgumentError" ||
      val.__typename === "NotFoundError")
  );
}
