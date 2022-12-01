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
  order: Scalars["Int"];
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
  deleteTrait: Scalars["String"];
  /** Log in using local credentials and receive an auth token */
  login: LoginResponse;
  modifyTrait: Trait;
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

export type MutationDeleteTraitArgs = {
  id: Scalars["ID"];
};

export type MutationLoginArgs = {
  input: LoginArgs;
};

export type MutationModifyTraitArgs = {
  input: TraitModifyInput;
};

export type MutationRegisterArgs = {
  input: RegisterArgs;
};

export type Query = {
  __typename?: "Query";
  communities: Array<Community>;
  community: Community;
  critters: Array<Critter>;
  species: Array<Species>;
  traits: Array<Trait>;
};

export type QueryCommunitiesArgs = {
  filters: CommunityFilters;
};

export type QueryCommunityArgs = {
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
  order: Scalars["Float"];
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

export type TraitModifyEnumValueInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name: Scalars["String"];
  order: Scalars["Float"];
};

export type TraitModifyInput = {
  enumValues?: InputMaybe<Array<TraitModifyEnumValueInput>>;
  id: Scalars["ID"];
  name: Scalars["String"];
  valueType: CritterTraitValueType;
};

export type CreateCommunityMutationVariables = Exact<{
  input: CommunityCreateInput;
}>;

export type CreateCommunityMutation = {
  __typename?: "Mutation";
  createCommunity: { __typename?: "Community"; id: string; name: string };
};

export type GetCommunityQueryVariables = Exact<{
  filters: CommunityFilters;
}>;

export type GetCommunityQuery = {
  __typename?: "Query";
  community: { __typename?: "Community"; id: string; name: string };
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

export type DeleteTraitMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteTraitMutation = {
  __typename?: "Mutation";
  deleteTrait: string;
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
  login?: FieldPolicy<any> | FieldReadFunction<any>;
  modifyTrait?: FieldPolicy<any> | FieldReadFunction<any>;
  register?: FieldPolicy<any> | FieldReadFunction<any>;
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

export const CreateCommunityDocument = gql`
  mutation createCommunity($input: CommunityCreateInput!) {
    createCommunity(input: $input) {
      id
      name
    }
  }
`;
export const GetCommunityDocument = gql`
  query getCommunity($filters: CommunityFilters!) {
    community(filters: $filters) {
      id
      name
    }
  }
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
    import("@apollo/client/core").SingleExecutionResult<CreateCommunityMutation>
  > {
    const finalOptions = {
      ...options,
      mutation: CreateCommunityDocument,
    };
    return this.client.mutate<
      CreateCommunityMutation,
      CreateCommunityMutationVariables
    >(finalOptions);
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
    return this.client.query<GetCommunityQuery, GetCommunityQueryVariables>(
      finalOptions
    );
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
  ): Promise<
    import("@apollo/client/core").SingleExecutionResult<GetCrittersQuery>
  > {
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
    import("@apollo/client/core").SingleExecutionResult<CreateSpeciesTraitMutation>
  > {
    const finalOptions = {
      ...options,
      mutation: CreateSpeciesTraitDocument,
    };
    return this.client.mutate<
      CreateSpeciesTraitMutation,
      CreateSpeciesTraitMutationVariables
    >(finalOptions);
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
    import("@apollo/client/core").SingleExecutionResult<DeleteTraitMutation>
  > {
    const finalOptions = {
      ...options,
      mutation: DeleteTraitDocument,
    };
    return this.client.mutate<
      DeleteTraitMutation,
      DeleteTraitMutationVariables
    >(finalOptions);
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
  ): Promise<
    import("@apollo/client/core").SingleExecutionResult<GetSpeciesDetailQuery>
  > {
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
        import("@apollo/client/core").QueryOptions<
          GetSpeciesTraitsQueryVariables,
          GetSpeciesTraitsQuery
        >
      >,
      "variables" | "query"
    > & {
      variables: GetSpeciesTraitsQueryVariables;
    }
  ): Promise<
    import("@apollo/client/core").SingleExecutionResult<GetSpeciesTraitsQuery>
  > {
    const finalOptions = {
      ...options,
      query: GetSpeciesTraitsDocument,
    };
    return this.client.query<
      GetSpeciesTraitsQuery,
      GetSpeciesTraitsQueryVariables
    >(finalOptions);
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
    import("@apollo/client/core").SingleExecutionResult<ModifySpeciesTraitMutation>
  > {
    const finalOptions = {
      ...options,
      mutation: ModifySpeciesTraitDocument,
    };
    return this.client.mutate<
      ModifySpeciesTraitMutation,
      ModifySpeciesTraitMutationVariables
    >(finalOptions);
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
    import("@apollo/client/core").SingleExecutionResult<CreateSpeciesMutation>
  > {
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
        import("@apollo/client/core").QueryOptions<
          GetSpeciesListViewQueryVariables,
          GetSpeciesListViewQuery
        >
      >,
      "variables" | "query"
    > & {
      variables: GetSpeciesListViewQueryVariables;
    }
  ): Promise<
    import("@apollo/client/core").SingleExecutionResult<GetSpeciesListViewQuery>
  > {
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
