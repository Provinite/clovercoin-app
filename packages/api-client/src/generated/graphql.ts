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
  members: CommunityMembersResponse;
  name: Scalars["String"];
  roles: Array<Role>;
}

export interface CommunityCreateInput {
  name: Scalars["String"];
}

export interface CommunityFilters {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
}

export interface CommunityInvitation {
  __typename?: "CommunityInvitation";
  accepted: Scalars["Boolean"];
  declined: Scalars["Boolean"];
  id: Scalars["ID"];
  /** The identity of the user that is being invited */
  invitee: Identity;
  inviteeId: Scalars["ID"];
  /** The identity of the user that is extending the invitation */
  inviter: Identity;
  inviterId: Scalars["ID"];
  /** The role to grant when the invitation is accepted */
  role: Role;
  roleId: Scalars["ID"];
}

export interface CommunityInvitationAnswerInput {
  accept: Scalars["Boolean"];
  id: Scalars["ID"];
}

export type CommunityInvitationAnswerResponse =
  | CommunityInvitation
  | InvalidArgumentError
  | NotAuthenticatedError
  | NotAuthorizedError
  | NotFoundError;

export interface CommunityInvitationCreateInput {
  emailAddress: Scalars["String"];
  roleId: Scalars["ID"];
}

export type CommunityInvitationCreateResponse =
  | CommunityInvitation
  | DuplicateError
  | InvalidArgumentError
  | NotAuthenticatedError
  | NotAuthorizedError
  | NotFoundError
  | UserAlreadyHasRoleError;

export interface CommunityInvitationList {
  __typename?: "CommunityInvitationList";
  list: Array<CommunityInvitation>;
}

export interface CommunityList {
  __typename?: "CommunityList";
  list: Array<Community>;
}

export interface CommunityMember {
  __typename?: "CommunityMember";
  id: Scalars["ID"];
  identity: Identity;
  identityId: Scalars["ID"];
  role: Role;
  roleId: Scalars["ID"];
}

export interface CommunityMemberCreateInput {
  identityId: Scalars["ID"];
  roleId: Scalars["ID"];
}

export type CommunityMemberCreateResponse =
  | CommunityMember
  | DuplicateError
  | InvalidArgumentError
  | InvitationRequiredError
  | NotAuthenticatedError
  | NotAuthorizedError
  | NotFoundError;

export interface CommunityMemberDeleteInput {
  id?: InputMaybe<Scalars["ID"]>;
  identityId?: InputMaybe<Scalars["ID"]>;
  roleId?: InputMaybe<Scalars["ID"]>;
}

export type CommunityMemberDeleteResponse =
  | DeleteResponse
  | InvalidArgumentError
  | NotAuthenticatedError
  | NotAuthorizedError
  | NotFoundError;

export type CommunityMembersResponse = IdentityList | NotAuthorizedError;

export type CommunityResponse =
  | Community
  | InvalidArgumentError
  | NotAuthenticatedError
  | NotAuthorizedError
  | NotFoundError;

export type CreateCommunityResponse =
  | Community
  | DuplicateError
  | InvalidArgumentError
  | NotAuthenticatedError
  | NotAuthorizedError;

export type CreateCritterResponse =
  | Critter
  | DuplicateError
  | InvalidArgumentError
  | NotAuthenticatedError
  | NotAuthorizedError;

export type CreateSpeciesImageUploadUrlResponse =
  | NotAuthenticatedError
  | NotAuthorizedError
  | NotFoundError
  | UrlResponse;

export interface Critter {
  __typename?: "Critter";
  id: Scalars["ID"];
  name: Scalars["String"];
  owner: Identity;
  ownerId: Scalars["ID"];
  species: Species;
  speciesId: Scalars["ID"];
  traitValues: Array<CritterTraitValue>;
  variant: SpeciesVariant;
  variantId: Scalars["ID"];
}

export interface CritterCreateInput {
  name: Scalars["String"];
  ownerId?: InputMaybe<Scalars["ID"]>;
  speciesId: Scalars["ID"];
  traitValues: Array<CritterCreateTraitInput>;
  variantId: Scalars["ID"];
}

export interface CritterCreateTraitInput {
  traitId: Scalars["ID"];
  value: Scalars["String"];
}

export interface CritterFilters {
  id?: InputMaybe<Scalars["ID"]>;
  speciesId?: InputMaybe<Scalars["ID"]>;
}

export interface CritterList {
  __typename?: "CritterList";
  list: Array<Critter>;
}

export type CritterListResponse =
  | CritterList
  | InvalidArgumentError
  | NotAuthenticatedError;

export interface CritterModifyInput {
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
  traitValues?: InputMaybe<Array<CritterCreateTraitInput>>;
  variantId?: InputMaybe<Scalars["ID"]>;
}

export type CritterModifyResponse =
  | Critter
  | InvalidArgumentError
  | NotAuthenticatedError
  | NotAuthorizedError
  | NotFoundError;

export interface CritterTraitValue {
  __typename?: "CritterTraitValue";
  traitId: Scalars["ID"];
  value?: Maybe<Scalars["String"]>;
}

/** Critter trait value types */
export enum CritterTraitValueType {
  Enum = "Enum",
  Integer = "Integer",
  String = "String",
  Timestamp = "Timestamp",
}

export interface DeleteResponse {
  __typename?: "DeleteResponse";
  ok: Scalars["Boolean"];
}

export interface DuplicateError extends BaseError {
  __typename?: "DuplicateError";
  duplicateKeys: Array<Scalars["String"]>;
  message: Scalars["String"];
}

export interface EnumValue {
  __typename?: "EnumValue";
  enumValueSettings: Array<EnumValueSetting>;
  id: Scalars["ID"];
  name: Scalars["String"];
  order: Scalars["Int"];
  trait: Trait;
  traitId: Scalars["ID"];
}

export interface EnumValueDeleteInput {
  id: Scalars["ID"];
}

export interface EnumValueSetting {
  __typename?: "EnumValueSetting";
  enumValue: EnumValue;
  enumValueId: Scalars["ID"];
  id: Scalars["ID"];
  speciesVariant: Array<SpeciesVariant>;
  speciesVariantId: Scalars["ID"];
}

export interface EnumValueSettingCreateInput {
  enumValueId: Scalars["ID"];
  speciesVariantId: Scalars["ID"];
}

export type EnumValueSettingDeleteResponse =
  | DeleteResponse
  | InvalidArgumentError
  | NotAuthenticatedError
  | NotAuthorizedError
  | NotFoundError;

export interface Identity {
  __typename?: "Identity";
  canCreateCommunity: Scalars["Boolean"];
  canCreateInviteCode: Scalars["Boolean"];
  canGrantGlobalPermissions: Scalars["Boolean"];
  canListIdentities: Scalars["Boolean"];
  canListInviteCodes: Scalars["Boolean"];
  displayName: Scalars["String"];
  email: Scalars["String"];
  id: Scalars["ID"];
  pendingInvitations: PendingInvitationsResponse;
  roles: IdentityRolesResponse;
}

export interface IdentityRolesArgs {
  filters: IdentityRolesFilters;
}

export interface IdentityList {
  __typename?: "IdentityList";
  list: Array<Identity>;
}

export interface IdentityModifyInput {
  canCreateCommunity?: InputMaybe<Scalars["Boolean"]>;
  canCreateInviteCode?: InputMaybe<Scalars["Boolean"]>;
  canGrantGlobalPermissions?: InputMaybe<Scalars["Boolean"]>;
  canListIdentities?: InputMaybe<Scalars["Boolean"]>;
  canListInviteCodes?: InputMaybe<Scalars["Boolean"]>;
  id: Scalars["ID"];
}

export type IdentityModifyResponse =
  | Identity
  | InvalidArgumentError
  | NotAuthenticatedError
  | NotAuthorizedError
  | NotFoundError;

export interface IdentityRolesFilters {
  communityId: Scalars["ID"];
}

export type IdentityRolesResponse =
  | InvalidArgumentError
  | NotAuthorizedError
  | RoleList;

export type IdentitylistResponse =
  | IdentityList
  | NotAuthenticatedError
  | NotAuthorizedError;

/** Acceptable MIME types for images */
export enum ImageContentType {
  Gif = "Gif",
  Jpg = "Jpg",
  Png = "Png",
}

export interface InvalidArgumentError extends BaseError {
  __typename?: "InvalidArgumentError";
  message: Scalars["String"];
  validationErrors: Array<ValidationError>;
}

export interface InvitationRequiredError extends BaseError {
  __typename?: "InvitationRequiredError";
  message: Scalars["String"];
}

export interface InviteCode {
  __typename?: "InviteCode";
  claimCount: Scalars["Int"];
  creator: Identity;
  creatorId: Scalars["ID"];
  id: Scalars["ID"];
  maxClaims: Scalars["Int"];
  role?: Maybe<Role>;
  roleId?: Maybe<Scalars["ID"]>;
}

export interface InviteCodeCreateInput {
  id: Scalars["ID"];
  maxClaims: Scalars["Int"];
  roleId?: InputMaybe<Scalars["ID"]>;
}

export type InviteCodeCreateResponse =
  | DuplicateError
  | InvalidArgumentError
  | InviteCode
  | NotAuthenticatedError
  | NotAuthorizedError;

export interface InviteCodeFilters {
  communityId?: InputMaybe<Scalars["ID"]>;
}

export interface InviteCodeList {
  __typename?: "InviteCodeList";
  list: Array<InviteCode>;
}

export type InviteCodeResponse =
  | InviteCodeList
  | NotAuthenticatedError
  | NotAuthorizedError;

export interface LoginArgs {
  email?: InputMaybe<Scalars["String"]>;
  password?: InputMaybe<Scalars["String"]>;
}

export interface LoginFailureResponse {
  __typename?: "LoginFailureResponse";
  message: Scalars["String"];
}

export type LoginResponse =
  | InvalidArgumentError
  | LoginFailureResponse
  | LoginSuccessResponse;

export interface LoginSuccessResponse {
  __typename?: "LoginSuccessResponse";
  account: Account;
  identity: Identity;
  token: Scalars["String"];
}

export interface Mutation {
  __typename?: "Mutation";
  answerInvitation: CommunityInvitationAnswerResponse;
  /** Create a new community */
  createCommunity: CreateCommunityResponse;
  createCommunityInvitation: CommunityInvitationCreateResponse;
  createCommunityMember: CommunityMemberCreateResponse;
  createCritter: CreateCritterResponse;
  createEnumValueSetting: EnumValueSettingCreateResponse;
  createInviteCode: InviteCodeCreateResponse;
  createRole: RoleCreateResponse;
  createSpecies: SpeciesCreateResponse;
  createSpeciesImageUploadUrl: CreateSpeciesImageUploadUrlResponse;
  createSpeciesVariant: SpeciesVariantCreateResponse;
  createTrait: TraitCreateResponse;
  /** Add a trait to a variant's trait list */
  createTraitListEntry: TraitListEntryCreateResponse;
  /** Delete a community member, effectively removing a role from a user */
  deleteCommunityMember: CommunityMemberDeleteResponse;
  deleteEnumValueSetting: EnumValueSettingDeleteResponse;
  deleteTrait: TraitDeleteResponse;
  /** Remove a trait from a variant's traitlist. This will delete any values for this trait from all existing characters under the specified variant. */
  deleteTraitListEntry: TraitListEntryDeleteResponse;
  /** Log in using local credentials and receive an auth token */
  login: LoginResponse;
  modifyCritter: CritterModifyResponse;
  modifyIdentity: IdentityModifyResponse;
  modifyRole: RoleModifyResponse;
  modifyTrait: TraitModifyResponse;
  /** Update an entry on a variant's trait list */
  modifyTraitListEntry: TraitListEntryModifyResponse;
  /** Create a new account and receive an auth token */
  register: RegisterResponse;
  requestPasswordReset: RequestPasswordResetResponse;
  resetPassword: ResetPasswordResponse;
}

export interface MutationAnswerInvitationArgs {
  input: CommunityInvitationAnswerInput;
}

export interface MutationCreateCommunityArgs {
  input: CommunityCreateInput;
}

export interface MutationCreateCommunityInvitationArgs {
  input: CommunityInvitationCreateInput;
}

export interface MutationCreateCommunityMemberArgs {
  input: CommunityMemberCreateInput;
}

export interface MutationCreateCritterArgs {
  input: CritterCreateInput;
}

export interface MutationCreateEnumValueSettingArgs {
  input: EnumValueSettingCreateInput;
}

export interface MutationCreateInviteCodeArgs {
  input: InviteCodeCreateInput;
}

export interface MutationCreateRoleArgs {
  input: RoleCreateInput;
}

export interface MutationCreateSpeciesArgs {
  input: SpeciesCreateInput;
}

export interface MutationCreateSpeciesImageUploadUrlArgs {
  input: SpeciesImageUrlCreateInput;
}

export interface MutationCreateSpeciesVariantArgs {
  input: SpeciesVariantCreateInput;
}

export interface MutationCreateTraitArgs {
  input: TraitCreateInput;
}

export interface MutationCreateTraitListEntryArgs {
  input: TraitListEntryCreateInput;
}

export interface MutationDeleteCommunityMemberArgs {
  input: CommunityMemberDeleteInput;
}

export interface MutationDeleteEnumValueSettingArgs {
  input: EnumValueDeleteInput;
}

export interface MutationDeleteTraitArgs {
  input: TraitDeleteInput;
}

export interface MutationDeleteTraitListEntryArgs {
  id: Scalars["ID"];
}

export interface MutationLoginArgs {
  input: LoginArgs;
}

export interface MutationModifyCritterArgs {
  input: CritterModifyInput;
}

export interface MutationModifyIdentityArgs {
  input: IdentityModifyInput;
}

export interface MutationModifyRoleArgs {
  input: RoleModifyInput;
}

export interface MutationModifyTraitArgs {
  input: TraitModifyInput;
}

export interface MutationModifyTraitListEntryArgs {
  input: TraitListEntryModifyInput;
}

export interface MutationRegisterArgs {
  input: RegisterArgs;
}

export interface MutationRequestPasswordResetArgs {
  input: RequestPasswordResetInput;
}

export interface MutationResetPasswordArgs {
  input: ResetPasswordInput;
}

/** This error indicates that the associated field requires authentication and no valid authentication was provided. */
export interface NotAuthenticatedError extends BaseError {
  __typename?: "NotAuthenticatedError";
  message: Scalars["String"];
}

/** This error indicates the associated field requires permissions that the requestor does not posess. */
export interface NotAuthorizedError extends BaseError {
  __typename?: "NotAuthorizedError";
  message: Scalars["String"];
}

export interface NotFoundError extends BaseError {
  __typename?: "NotFoundError";
  message: Scalars["String"];
}

export type PendingInvitationsResponse =
  | CommunityInvitationList
  | NotAuthorizedError;

export interface Query {
  __typename?: "Query";
  /** Fetch a list of communities with filtering */
  communities: CommunitiesResponse;
  /** Fetch a community by id and/or name */
  community: CommunityResponse;
  critters: CritterListResponse;
  identities: IdentitylistResponse;
  /** Fetch invite codes */
  inviteCodes: InviteCodeResponse;
  me: Identity;
  species: SpeciesResponse;
  traits: TraitListResponse;
}

export interface QueryCommunitiesArgs {
  filters: CommunityFilters;
}

export interface QueryCommunityArgs {
  filters: CommunityFilters;
}

export interface QueryCrittersArgs {
  filters: CritterFilters;
}

export interface QueryInviteCodesArgs {
  filters: InviteCodeFilters;
}

export interface QuerySpeciesArgs {
  filters?: InputMaybe<SpeciesFilters>;
}

export interface QueryTraitsArgs {
  filters: TraitFilters;
}

export interface RegisterArgs {
  email: Scalars["String"];
  inviteCodeId: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
}

export type RegisterResponse =
  | DuplicateError
  | InvalidArgumentError
  | LoginSuccessResponse;

export interface RequestPasswordResetInput {
  email: Scalars["String"];
}

export interface RequestPasswordResetReceivedResponse {
  __typename?: "RequestPasswordResetReceivedResponse";
  message: Scalars["String"];
}

export type RequestPasswordResetResponse =
  | InvalidArgumentError
  | RequestPasswordResetReceivedResponse;

export interface ResetPasswordInput {
  password: Scalars["String"];
  token: Scalars["ID"];
}

export type ResetPasswordResponse =
  | InvalidArgumentError
  | ResetPasswordSuccessResponse;

export interface ResetPasswordSuccessResponse {
  __typename?: "ResetPasswordSuccessResponse";
  success: Scalars["Boolean"];
}

export interface Role {
  __typename?: "Role";
  canCreateCritter: Scalars["Boolean"];
  canCreateInviteCode: Scalars["Boolean"];
  canCreateRole: Scalars["Boolean"];
  canCreateSpecies: Scalars["Boolean"];
  canEditCritter: Scalars["Boolean"];
  canEditRole: Scalars["Boolean"];
  canEditSpecies: Scalars["Boolean"];
  canListInviteCodes: Scalars["Boolean"];
  community: Community;
  communityId: Scalars["ID"];
  id: Scalars["ID"];
  name: Scalars["String"];
}

export interface RoleCreateInput {
  canCreateCritter?: InputMaybe<Scalars["Boolean"]>;
  canCreateInviteCode?: InputMaybe<Scalars["Boolean"]>;
  canCreateRole?: InputMaybe<Scalars["Boolean"]>;
  canCreateSpecies?: InputMaybe<Scalars["Boolean"]>;
  canEditCritter?: InputMaybe<Scalars["Boolean"]>;
  canEditRole?: InputMaybe<Scalars["Boolean"]>;
  canEditSpecies?: InputMaybe<Scalars["Boolean"]>;
  canListInviteCodes?: InputMaybe<Scalars["Boolean"]>;
  communityId: Scalars["ID"];
  name: Scalars["String"];
}

export type RoleCreateResponse =
  | DuplicateError
  | InvalidArgumentError
  | NotAuthenticatedError
  | NotAuthorizedError
  | Role;

export interface RoleList {
  __typename?: "RoleList";
  list: Array<Role>;
}

export interface RoleModifyInput {
  canCreateCritter?: InputMaybe<Scalars["Boolean"]>;
  canCreateInviteCode?: InputMaybe<Scalars["Boolean"]>;
  canCreateRole?: InputMaybe<Scalars["Boolean"]>;
  canCreateSpecies?: InputMaybe<Scalars["Boolean"]>;
  canEditCritter?: InputMaybe<Scalars["Boolean"]>;
  canEditRole?: InputMaybe<Scalars["Boolean"]>;
  canEditSpecies?: InputMaybe<Scalars["Boolean"]>;
  canListInviteCodes?: InputMaybe<Scalars["Boolean"]>;
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
}

export type RoleModifyResponse =
  | DuplicateError
  | InvalidArgumentError
  | NotAuthenticatedError
  | NotAuthorizedError
  | Role;

/** Model representing an arbitrarily broad class of characters that use common variants and administration. */
export interface Species {
  __typename?: "Species";
  /** Community that owns this species */
  community: Community;
  /** ID of the community that owns this species */
  communityId: Scalars["ID"];
  critters: Array<Critter>;
  hasImage: Scalars["String"];
  /** Icon URL for this species */
  iconUrl?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  /** Name of the species */
  name: Scalars["String"];
  variants: Array<SpeciesVariant>;
}

export interface SpeciesCreateInput {
  communityId: Scalars["ID"];
  name: Scalars["String"];
}

export type SpeciesCreateResponse =
  | DuplicateError
  | InvalidArgumentError
  | NotAuthenticatedError
  | NotAuthorizedError
  | NotFoundError
  | Species;

export interface SpeciesFilters {
  communityId: Scalars["ID"];
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
}

export interface SpeciesImageUrlCreateInput {
  contentType: ImageContentType;
  speciesId: Scalars["ID"];
}

export interface SpeciesList {
  __typename?: "SpeciesList";
  list: Array<Species>;
}

export type SpeciesResponse =
  | InvalidArgumentError
  | NotAuthenticatedError
  | SpeciesList;

export interface SpeciesVariant {
  __typename?: "SpeciesVariant";
  enumValueSettings: Array<EnumValueSetting>;
  id: Scalars["ID"];
  name: Scalars["String"];
  species: Species;
  speciesId: Scalars["ID"];
  traitListEntries: Array<TraitListEntry>;
}

export interface SpeciesVariantCreateInput {
  name: Scalars["String"];
  speciesId: Scalars["ID"];
}

export type SpeciesVariantCreateResponse =
  | DuplicateError
  | InvalidArgumentError
  | NotAuthenticatedError
  | NotAuthorizedError
  | NotFoundError
  | SpeciesVariant;

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

export type TraitCreateResponse =
  | DuplicateError
  | InvalidArgumentError
  | NotAuthenticatedError
  | NotAuthorizedError
  | Trait;

export interface TraitDeleteInput {
  id: Scalars["ID"];
}

export type TraitDeleteResponse =
  | DeleteResponse
  | InvalidArgumentError
  | NotAuthenticatedError
  | NotAuthorizedError
  | NotFoundError;

export interface TraitFilters {
  speciesId: Scalars["ID"];
}

export interface TraitList {
  __typename?: "TraitList";
  list: Array<Trait>;
}

export interface TraitListEntry {
  __typename?: "TraitListEntry";
  defaultDisplayValue?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  order: Scalars["Int"];
  required: Scalars["Boolean"];
  speciesVariant: SpeciesVariant;
  speciesVariantId: Scalars["ID"];
  trait: Trait;
  traitId: Scalars["ID"];
  valueType: CritterTraitValueType;
}

/** Input object for creating a new TraitListEntry */
export interface TraitListEntryCreateInput {
  order: Scalars["Int"];
  required?: InputMaybe<Scalars["Boolean"]>;
  speciesVariantId: Scalars["ID"];
  traitId: Scalars["ID"];
}

export type TraitListEntryCreateResponse =
  | DuplicateError
  | InvalidArgumentError
  | NotAuthenticatedError
  | NotAuthorizedError
  | NotFoundError
  | TraitListEntry;

export type TraitListEntryDeleteResponse =
  | DeleteResponse
  | InvalidArgumentError
  | NotAuthenticatedError
  | NotAuthorizedError
  | NotFoundError;

/** Input object for modifying a TraitListEntry */
export interface TraitListEntryModifyInput {
  id: Scalars["ID"];
  order?: InputMaybe<Scalars["Int"]>;
  required?: InputMaybe<Scalars["Boolean"]>;
}

export type TraitListEntryModifyResponse =
  | InvalidArgumentError
  | NotAuthenticatedError
  | NotAuthorizedError
  | NotFoundError
  | TraitListEntry;

export type TraitListResponse =
  | NotAuthenticatedError
  | NotAuthorizedError
  | NotFoundError
  | TraitList;

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

export type TraitModifyResponse =
  | DuplicateError
  | InvalidArgumentError
  | NotAuthenticatedError
  | NotAuthorizedError
  | NotFoundError
  | Trait;

export interface UrlResponse {
  __typename?: "UrlResponse";
  url: Scalars["String"];
}

export interface UserAlreadyHasRoleError extends BaseError {
  __typename?: "UserAlreadyHasRoleError";
  message: Scalars["String"];
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

export type EnumValueSettingCreateResponse =
  | DuplicateError
  | EnumValueSetting
  | InvalidArgumentError
  | NotAuthenticatedError
  | NotAuthorizedError
  | NotFoundError;

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
      }
    | { __typename: "NotAuthenticatedError"; message: string }
    | { __typename: "NotAuthorizedError"; message: string };
};

export type GetCommunityQueryVariables = Exact<{
  filters: CommunityFilters;
}>;

export type GetCommunityQuery = {
  __typename?: "Query";
  community:
    | {
        __typename: "Community";
        id: string;
        name: string;
        roles: Array<{ __typename?: "Role"; id: string; name: string }>;
      }
    | { __typename: "InvalidArgumentError"; message: string }
    | { __typename: "NotAuthenticatedError"; message: string }
    | { __typename: "NotAuthorizedError"; message: string }
    | { __typename: "NotFoundError"; message: string };
};

export type GetCrittersQueryVariables = Exact<{
  filters: CritterFilters;
}>;

export type GetCrittersQuery = {
  __typename?: "Query";
  critters:
    | {
        __typename?: "CritterList";
        list: Array<{
          __typename?: "Critter";
          id: string;
          name: string;
          variant: { __typename?: "SpeciesVariant"; name: string; id: string };
          traitValues: Array<{
            __typename?: "CritterTraitValue";
            traitId: string;
            value?: string | null;
          }>;
        }>;
      }
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
    | { __typename?: "NotAuthenticatedError"; message: string };
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

export type CreateCommunityMemberMutationVariables = Exact<{
  input: CommunityMemberCreateInput;
}>;

export type CreateCommunityMemberMutation = {
  __typename?: "Mutation";
  createCommunityMember:
    | {
        __typename: "CommunityMember";
        id: string;
        identityId: string;
        roleId: string;
      }
    | { __typename: "DuplicateError"; message: string }
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
    | { __typename: "InvitationRequiredError"; message: string }
    | { __typename: "NotAuthenticatedError"; message: string }
    | { __typename: "NotAuthorizedError"; message: string }
    | { __typename: "NotFoundError"; message: string };
};

export type DeleteCommunityMemberMutationVariables = Exact<{
  input: CommunityMemberDeleteInput;
}>;

export type DeleteCommunityMemberMutation = {
  __typename?: "Mutation";
  deleteCommunityMember:
    | { __typename: "DeleteResponse"; ok: boolean }
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
    | { __typename: "NotAuthenticatedError"; message: string }
    | { __typename: "NotAuthorizedError"; message: string }
    | { __typename: "NotFoundError"; message: string };
};

export type GetCommunityMemberListQueryVariables = Exact<{
  communityId: Scalars["ID"];
}>;

export type GetCommunityMemberListQuery = {
  __typename?: "Query";
  community:
    | {
        __typename: "Community";
        members:
          | {
              __typename: "IdentityList";
              list: Array<{
                __typename?: "Identity";
                id: string;
                displayName: string;
                roles:
                  | { __typename: "InvalidArgumentError" }
                  | { __typename: "NotAuthorizedError" }
                  | {
                      __typename: "RoleList";
                      list: Array<{
                        __typename?: "Role";
                        id: string;
                        name: string;
                      }>;
                    };
              }>;
            }
          | { __typename: "NotAuthorizedError" };
      }
    | { __typename: "InvalidArgumentError" }
    | { __typename: "NotAuthenticatedError" }
    | { __typename: "NotAuthorizedError" }
    | { __typename: "NotFoundError" };
};

export type RolePermissionsFragmentFragment = {
  __typename?: "Role";
  canCreateCritter: boolean;
  canCreateInviteCode: boolean;
  canCreateRole: boolean;
  canCreateSpecies: boolean;
  canEditCritter: boolean;
  canEditRole: boolean;
  canEditSpecies: boolean;
  canListInviteCodes: boolean;
};

export type CreateCommunityInvitationMutationVariables = Exact<{
  input: CommunityInvitationCreateInput;
}>;

export type CreateCommunityInvitationMutation = {
  __typename?: "Mutation";
  createCommunityInvitation:
    | { __typename: "CommunityInvitation"; id: string }
    | {
        __typename: "DuplicateError";
        duplicateKeys: Array<string>;
        message: string;
      }
    | { __typename: "InvalidArgumentError"; message: string }
    | { __typename: "NotAuthenticatedError"; message: string }
    | { __typename: "NotAuthorizedError"; message: string }
    | { __typename: "NotFoundError"; message: string }
    | { __typename: "UserAlreadyHasRoleError"; message: string };
};

export type GetCommunityRolesQueryVariables = Exact<{
  communityId: Scalars["ID"];
}>;

export type GetCommunityRolesQuery = {
  __typename?: "Query";
  community:
    | {
        __typename: "Community";
        roles: Array<{
          __typename: "Role";
          id: string;
          name: string;
          canCreateCritter: boolean;
          canCreateInviteCode: boolean;
          canCreateRole: boolean;
          canCreateSpecies: boolean;
          canEditCritter: boolean;
          canEditRole: boolean;
          canEditSpecies: boolean;
          canListInviteCodes: boolean;
        }>;
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
      }
    | { __typename: "NotAuthenticatedError"; message: string }
    | { __typename: "NotAuthorizedError"; message: string }
    | { __typename: "NotFoundError"; message: string };
};

export type ModifyRoleMutationVariables = Exact<{
  input: RoleModifyInput;
}>;

export type ModifyRoleMutation = {
  __typename?: "Mutation";
  modifyRole:
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
      }
    | { __typename: "NotAuthenticatedError"; message: string }
    | { __typename: "NotAuthorizedError"; message: string }
    | {
        __typename: "Role";
        id: string;
        name: string;
        canCreateCritter: boolean;
        canCreateInviteCode: boolean;
        canCreateRole: boolean;
        canCreateSpecies: boolean;
        canEditCritter: boolean;
        canEditRole: boolean;
        canEditSpecies: boolean;
        canListInviteCodes: boolean;
      };
};

export type LoginMutationVariables = Exact<{
  input: LoginArgs;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login:
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
    | { __typename: "LoginFailureResponse" }
    | {
        __typename: "LoginSuccessResponse";
        token: string;
        identity: { __typename?: "Identity"; displayName: string; id: string };
      };
};

export type RegisterMutationVariables = Exact<{
  input: RegisterArgs;
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register:
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
      }
    | {
        __typename: "LoginSuccessResponse";
        token: string;
        identity: { __typename?: "Identity"; id: string; displayName: string };
      };
};

export type RequestPasswordResetMutationVariables = Exact<{
  input: RequestPasswordResetInput;
}>;

export type RequestPasswordResetMutation = {
  __typename?: "Mutation";
  requestPasswordReset:
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
    | { __typename: "RequestPasswordResetReceivedResponse"; message: string };
};

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;

export type ResetPasswordMutation = {
  __typename?: "Mutation";
  resetPassword:
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
    | { __typename: "ResetPasswordSuccessResponse" };
};

export type CreateTraitListEntryMutationVariables = Exact<{
  input: TraitListEntryCreateInput;
}>;

export type CreateTraitListEntryMutation = {
  __typename?: "Mutation";
  createTraitListEntry:
    | {
        __typename: "DuplicateError";
        message: string;
        duplicateKeys: Array<string>;
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
      }
    | { __typename: "NotAuthenticatedError"; message: string }
    | { __typename: "NotAuthorizedError"; message: string }
    | { __typename: "NotFoundError"; message: string }
    | {
        __typename: "TraitListEntry";
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
      };
};

export type DeleteTraitListEntryMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteTraitListEntryMutation = {
  __typename?: "Mutation";
  deleteTraitListEntry:
    | { __typename: "DeleteResponse"; ok: boolean }
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
    | { __typename: "NotAuthenticatedError"; message: string }
    | { __typename: "NotAuthorizedError"; message: string }
    | { __typename: "NotFoundError"; message: string };
};

export type ModifyTraitListEntryMutationVariables = Exact<{
  input: TraitListEntryModifyInput;
}>;

export type ModifyTraitListEntryMutation = {
  __typename?: "Mutation";
  modifyTraitListEntry:
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
    | { __typename: "NotAuthenticatedError"; message: string }
    | { __typename: "NotAuthorizedError"; message: string }
    | { __typename: "NotFoundError"; message: string }
    | {
        __typename: "TraitListEntry";
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
      };
};

export type CreateCritterMutationVariables = Exact<{
  input: CritterCreateInput;
}>;

export type CreateCritterMutation = {
  __typename?: "Mutation";
  createCritter:
    | { __typename?: "Critter"; id: string }
    | {
        __typename: "DuplicateError";
        duplicateKeys: Array<string>;
        message: string;
      }
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
    | { __typename?: "NotAuthenticatedError"; message: string }
    | { __typename?: "NotAuthorizedError"; message: string };
};

export type CreateEnumValueSettingMutationVariables = Exact<{
  input: EnumValueSettingCreateInput;
}>;

export type CreateEnumValueSettingMutation = {
  __typename?: "Mutation";
  createEnumValueSetting:
    | {
        __typename: "DuplicateError";
        duplicateKeys: Array<string>;
        message: string;
      }
    | {
        __typename: "EnumValueSetting";
        id: string;
        enumValueId: string;
        speciesVariantId: string;
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
      }
    | { __typename: "NotAuthenticatedError"; message: string }
    | { __typename: "NotAuthorizedError"; message: string }
    | { __typename: "NotFoundError"; message: string };
};

export type CreateSpeciesImageUploadUrlMutationVariables = Exact<{
  input: SpeciesImageUrlCreateInput;
}>;

export type CreateSpeciesImageUploadUrlMutation = {
  __typename?: "Mutation";
  createSpeciesImageUploadUrl:
    | { __typename: "NotAuthenticatedError"; message: string }
    | { __typename: "NotAuthorizedError" }
    | { __typename: "NotFoundError" }
    | { __typename: "UrlResponse"; url: string };
};

export type CreateSpeciesTraitMutationVariables = Exact<{
  input: TraitCreateInput;
}>;

export type CreateSpeciesTraitMutation = {
  __typename?: "Mutation";
  createTrait:
    | {
        __typename: "DuplicateError";
        duplicateKeys: Array<string>;
        message: string;
      }
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
    | { __typename?: "NotAuthenticatedError"; message: string }
    | { __typename?: "NotAuthorizedError"; message: string }
    | { __typename?: "Trait"; id: string };
};

export type CreateVariantMutationVariables = Exact<{
  input: SpeciesVariantCreateInput;
}>;

export type CreateVariantMutation = {
  __typename?: "Mutation";
  createSpeciesVariant:
    | {
        __typename: "DuplicateError";
        message: string;
        duplicateKeys: Array<string>;
      }
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
    | { __typename?: "NotAuthenticatedError"; message: string }
    | { __typename?: "NotAuthorizedError"; message: string }
    | { __typename?: "NotFoundError"; message: string }
    | { __typename?: "SpeciesVariant"; id: string; name: string };
};

export type DeleteEnumValueSettingMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteEnumValueSettingMutation = {
  __typename?: "Mutation";
  deleteEnumValueSetting:
    | { __typename: "DeleteResponse"; ok: boolean }
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
    | { __typename: "NotAuthenticatedError" }
    | { __typename: "NotAuthorizedError" }
    | { __typename: "NotFoundError" };
};

export type DeleteTraitMutationVariables = Exact<{
  input: TraitDeleteInput;
}>;

export type DeleteTraitMutation = {
  __typename?: "Mutation";
  deleteTrait:
    | { __typename: "DeleteResponse"; ok: boolean }
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
    | { __typename: "NotAuthenticatedError"; message: string }
    | { __typename: "NotAuthorizedError"; message: string }
    | { __typename: "NotFoundError"; message: string };
};

export type GetSpeciesDetailQueryVariables = Exact<{
  filters?: InputMaybe<SpeciesFilters>;
}>;

export type GetSpeciesDetailQuery = {
  __typename: "Query";
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
    | { __typename?: "NotAuthenticatedError"; message: string }
    | {
        __typename?: "SpeciesList";
        list: Array<{
          __typename?: "Species";
          id: string;
          name: string;
          variants: Array<{
            __typename?: "SpeciesVariant";
            id: string;
            name: string;
            enumValueSettings: Array<{
              __typename?: "EnumValueSetting";
              id: string;
              speciesVariantId: string;
              enumValueId: string;
            }>;
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
  traits:
    | { __typename?: "NotAuthenticatedError"; message: string }
    | { __typename?: "NotAuthorizedError"; message: string }
    | { __typename?: "NotFoundError"; message: string }
    | {
        __typename?: "TraitList";
        list: Array<{
          __typename?: "Trait";
          id: string;
          name: string;
          valueType: CritterTraitValueType;
          enumValues: Array<{
            __typename?: "EnumValue";
            id: string;
            name: string;
          }>;
        }>;
      };
};

export type ModifyCritterMutationVariables = Exact<{
  input: CritterModifyInput;
}>;

export type ModifyCritterMutation = {
  __typename?: "Mutation";
  modifyCritter:
    | {
        __typename: "Critter";
        id: string;
        name: string;
        variantId: string;
        traitValues: Array<{
          __typename?: "CritterTraitValue";
          traitId: string;
          value?: string | null;
        }>;
        variant: { __typename?: "SpeciesVariant"; id: string; name: string };
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
      }
    | { __typename: "NotAuthenticatedError"; message: string }
    | { __typename: "NotAuthorizedError"; message: string }
    | { __typename: "NotFoundError"; message: string };
};

export type ModifySpeciesTraitMutationVariables = Exact<{
  input: TraitModifyInput;
}>;

export type ModifySpeciesTraitMutation = {
  __typename?: "Mutation";
  modifyTrait:
    | {
        __typename: "DuplicateError";
        duplicateKeys: Array<string>;
        message: string;
      }
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
    | { __typename?: "NotAuthenticatedError" }
    | { __typename?: "NotAuthorizedError" }
    | { __typename?: "NotFoundError" }
    | {
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
    | { __typename?: "NotAuthenticatedError"; message: string }
    | { __typename?: "NotAuthorizedError"; message: string }
    | { __typename?: "NotFoundError"; message: string }
    | {
        __typename?: "Species";
        id: string;
        name: string;
        iconUrl?: string | null;
        variants: Array<{
          __typename?: "SpeciesVariant";
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
    | { __typename: "NotAuthenticatedError"; message: string }
    | {
        __typename: "SpeciesList";
        list: Array<{
          __typename?: "Species";
          id: string;
          name: string;
          iconUrl?: string | null;
          variants: Array<{
            __typename?: "SpeciesVariant";
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

export type AnswerCommunityInvitationMutationVariables = Exact<{
  input: CommunityInvitationAnswerInput;
}>;

export type AnswerCommunityInvitationMutation = {
  __typename?: "Mutation";
  answerInvitation:
    | {
        __typename: "CommunityInvitation";
        id: string;
        accepted: boolean;
        declined: boolean;
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
      }
    | { __typename: "NotAuthenticatedError"; message: string }
    | { __typename: "NotAuthorizedError"; message: string }
    | { __typename: "NotFoundError"; message: string };
};

export type GetUserSettingsQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserSettingsQuery = {
  __typename?: "Query";
  me: {
    __typename?: "Identity";
    pendingInvitations:
      | {
          __typename: "CommunityInvitationList";
          list: Array<{
            __typename?: "CommunityInvitation";
            id: string;
            accepted: boolean;
            declined: boolean;
            role: {
              __typename?: "Role";
              name: string;
              community: { __typename?: "Community"; name: string };
            };
            inviter: { __typename?: "Identity"; displayName: string };
          }>;
        }
      | { __typename: "NotAuthorizedError"; message: string };
  };
};

export type GetIdentityListQueryVariables = Exact<{ [key: string]: never }>;

export type GetIdentityListQuery = {
  __typename?: "Query";
  identities:
    | {
        __typename?: "IdentityList";
        list: Array<{
          __typename?: "Identity";
          displayName: string;
          email: string;
          id: string;
          canCreateCommunity: boolean;
          canCreateInviteCode: boolean;
          canListIdentities: boolean;
          canListInviteCodes: boolean;
          canGrantGlobalPermissions: boolean;
        }>;
      }
    | { __typename?: "NotAuthenticatedError"; message: string }
    | { __typename?: "NotAuthorizedError" };
};

export type GetInviteCodeListQueryVariables = Exact<{
  filters: InviteCodeFilters;
}>;

export type GetInviteCodeListQuery = {
  __typename?: "Query";
  inviteCodes:
    | {
        __typename: "InviteCodeList";
        list: Array<{
          __typename?: "InviteCode";
          claimCount: number;
          id: string;
          maxClaims: number;
          role?: { __typename?: "Role"; name: string; id: string } | null;
          creator: { __typename?: "Identity"; displayName: string };
        }>;
      }
    | { __typename: "NotAuthenticatedError" }
    | { __typename: "NotAuthorizedError" };
};

export type ModifyIdentityMutationVariables = Exact<{
  input: IdentityModifyInput;
}>;

export type ModifyIdentityMutation = {
  __typename?: "Mutation";
  modifyIdentity:
    | {
        __typename: "Identity";
        canCreateCommunity: boolean;
        canCreateInviteCode: boolean;
        canGrantGlobalPermissions: boolean;
        canListIdentities: boolean;
        canListInviteCodes: boolean;
        id: string;
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
      }
    | { __typename: "NotAuthenticatedError"; message: string }
    | { __typename: "NotAuthorizedError"; message: string }
    | { __typename: "NotFoundError"; message: string };
};

export type CreateInviteCodeMutationVariables = Exact<{
  input: InviteCodeCreateInput;
}>;

export type CreateInviteCodeMutation = {
  __typename?: "Mutation";
  createInviteCode:
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
      }
    | {
        __typename: "InviteCode";
        id: string;
        claimCount: number;
        maxClaims: number;
        creator: { __typename?: "Identity"; displayName: string };
      }
    | { __typename: "NotAuthenticatedError" }
    | { __typename: "NotAuthorizedError" };
};

export type BaseErrorFragment_DuplicateError_Fragment = {
  __typename?: "DuplicateError";
  message: string;
};

export type BaseErrorFragment_InvalidArgumentError_Fragment = {
  __typename?: "InvalidArgumentError";
  message: string;
};

export type BaseErrorFragment_InvitationRequiredError_Fragment = {
  __typename?: "InvitationRequiredError";
  message: string;
};

export type BaseErrorFragment_NotAuthenticatedError_Fragment = {
  __typename?: "NotAuthenticatedError";
  message: string;
};

export type BaseErrorFragment_NotAuthorizedError_Fragment = {
  __typename?: "NotAuthorizedError";
  message: string;
};

export type BaseErrorFragment_NotFoundError_Fragment = {
  __typename?: "NotFoundError";
  message: string;
};

export type BaseErrorFragment_UserAlreadyHasRoleError_Fragment = {
  __typename?: "UserAlreadyHasRoleError";
  message: string;
};

export type BaseErrorFragmentFragment =
  | BaseErrorFragment_DuplicateError_Fragment
  | BaseErrorFragment_InvalidArgumentError_Fragment
  | BaseErrorFragment_InvitationRequiredError_Fragment
  | BaseErrorFragment_NotAuthenticatedError_Fragment
  | BaseErrorFragment_NotAuthorizedError_Fragment
  | BaseErrorFragment_NotFoundError_Fragment
  | BaseErrorFragment_UserAlreadyHasRoleError_Fragment;

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

export type NotAuthenticatedErrorFragmentFragment = {
  __typename?: "NotAuthenticatedError";
  message: string;
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
export type CommunityKeySpecifier = (
  | "id"
  | "members"
  | "name"
  | "roles"
  | CommunityKeySpecifier
)[];
export type CommunityFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  members?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  roles?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CommunityInvitationKeySpecifier = (
  | "accepted"
  | "declined"
  | "id"
  | "invitee"
  | "inviteeId"
  | "inviter"
  | "inviterId"
  | "role"
  | "roleId"
  | CommunityInvitationKeySpecifier
)[];
export type CommunityInvitationFieldPolicy = {
  accepted?: FieldPolicy<any> | FieldReadFunction<any>;
  declined?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  invitee?: FieldPolicy<any> | FieldReadFunction<any>;
  inviteeId?: FieldPolicy<any> | FieldReadFunction<any>;
  inviter?: FieldPolicy<any> | FieldReadFunction<any>;
  inviterId?: FieldPolicy<any> | FieldReadFunction<any>;
  role?: FieldPolicy<any> | FieldReadFunction<any>;
  roleId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CommunityInvitationListKeySpecifier = (
  | "list"
  | CommunityInvitationListKeySpecifier
)[];
export type CommunityInvitationListFieldPolicy = {
  list?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CommunityListKeySpecifier = ("list" | CommunityListKeySpecifier)[];
export type CommunityListFieldPolicy = {
  list?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CommunityMemberKeySpecifier = (
  | "id"
  | "identity"
  | "identityId"
  | "role"
  | "roleId"
  | CommunityMemberKeySpecifier
)[];
export type CommunityMemberFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  identity?: FieldPolicy<any> | FieldReadFunction<any>;
  identityId?: FieldPolicy<any> | FieldReadFunction<any>;
  role?: FieldPolicy<any> | FieldReadFunction<any>;
  roleId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CritterKeySpecifier = (
  | "id"
  | "name"
  | "owner"
  | "ownerId"
  | "species"
  | "speciesId"
  | "traitValues"
  | "variant"
  | "variantId"
  | CritterKeySpecifier
)[];
export type CritterFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  owner?: FieldPolicy<any> | FieldReadFunction<any>;
  ownerId?: FieldPolicy<any> | FieldReadFunction<any>;
  species?: FieldPolicy<any> | FieldReadFunction<any>;
  speciesId?: FieldPolicy<any> | FieldReadFunction<any>;
  traitValues?: FieldPolicy<any> | FieldReadFunction<any>;
  variant?: FieldPolicy<any> | FieldReadFunction<any>;
  variantId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CritterListKeySpecifier = ("list" | CritterListKeySpecifier)[];
export type CritterListFieldPolicy = {
  list?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CritterTraitValueKeySpecifier = (
  | "traitId"
  | "value"
  | CritterTraitValueKeySpecifier
)[];
export type CritterTraitValueFieldPolicy = {
  traitId?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteResponseKeySpecifier = ("ok" | DeleteResponseKeySpecifier)[];
export type DeleteResponseFieldPolicy = {
  ok?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | "enumValueSettings"
  | "id"
  | "name"
  | "order"
  | "trait"
  | "traitId"
  | EnumValueKeySpecifier
)[];
export type EnumValueFieldPolicy = {
  enumValueSettings?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  order?: FieldPolicy<any> | FieldReadFunction<any>;
  trait?: FieldPolicy<any> | FieldReadFunction<any>;
  traitId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EnumValueSettingKeySpecifier = (
  | "enumValue"
  | "enumValueId"
  | "id"
  | "speciesVariant"
  | "speciesVariantId"
  | EnumValueSettingKeySpecifier
)[];
export type EnumValueSettingFieldPolicy = {
  enumValue?: FieldPolicy<any> | FieldReadFunction<any>;
  enumValueId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  speciesVariant?: FieldPolicy<any> | FieldReadFunction<any>;
  speciesVariantId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IdentityKeySpecifier = (
  | "canCreateCommunity"
  | "canCreateInviteCode"
  | "canGrantGlobalPermissions"
  | "canListIdentities"
  | "canListInviteCodes"
  | "displayName"
  | "email"
  | "id"
  | "pendingInvitations"
  | "roles"
  | IdentityKeySpecifier
)[];
export type IdentityFieldPolicy = {
  canCreateCommunity?: FieldPolicy<any> | FieldReadFunction<any>;
  canCreateInviteCode?: FieldPolicy<any> | FieldReadFunction<any>;
  canGrantGlobalPermissions?: FieldPolicy<any> | FieldReadFunction<any>;
  canListIdentities?: FieldPolicy<any> | FieldReadFunction<any>;
  canListInviteCodes?: FieldPolicy<any> | FieldReadFunction<any>;
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  pendingInvitations?: FieldPolicy<any> | FieldReadFunction<any>;
  roles?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IdentityListKeySpecifier = ("list" | IdentityListKeySpecifier)[];
export type IdentityListFieldPolicy = {
  list?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type InvitationRequiredErrorKeySpecifier = (
  | "message"
  | InvitationRequiredErrorKeySpecifier
)[];
export type InvitationRequiredErrorFieldPolicy = {
  message?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type InviteCodeKeySpecifier = (
  | "claimCount"
  | "creator"
  | "creatorId"
  | "id"
  | "maxClaims"
  | "role"
  | "roleId"
  | InviteCodeKeySpecifier
)[];
export type InviteCodeFieldPolicy = {
  claimCount?: FieldPolicy<any> | FieldReadFunction<any>;
  creator?: FieldPolicy<any> | FieldReadFunction<any>;
  creatorId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  maxClaims?: FieldPolicy<any> | FieldReadFunction<any>;
  role?: FieldPolicy<any> | FieldReadFunction<any>;
  roleId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type InviteCodeListKeySpecifier = (
  | "list"
  | InviteCodeListKeySpecifier
)[];
export type InviteCodeListFieldPolicy = {
  list?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LoginFailureResponseKeySpecifier = (
  | "message"
  | LoginFailureResponseKeySpecifier
)[];
export type LoginFailureResponseFieldPolicy = {
  message?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LoginSuccessResponseKeySpecifier = (
  | "account"
  | "identity"
  | "token"
  | LoginSuccessResponseKeySpecifier
)[];
export type LoginSuccessResponseFieldPolicy = {
  account?: FieldPolicy<any> | FieldReadFunction<any>;
  identity?: FieldPolicy<any> | FieldReadFunction<any>;
  token?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MutationKeySpecifier = (
  | "answerInvitation"
  | "createCommunity"
  | "createCommunityInvitation"
  | "createCommunityMember"
  | "createCritter"
  | "createEnumValueSetting"
  | "createInviteCode"
  | "createRole"
  | "createSpecies"
  | "createSpeciesImageUploadUrl"
  | "createSpeciesVariant"
  | "createTrait"
  | "createTraitListEntry"
  | "deleteCommunityMember"
  | "deleteEnumValueSetting"
  | "deleteTrait"
  | "deleteTraitListEntry"
  | "login"
  | "modifyCritter"
  | "modifyIdentity"
  | "modifyRole"
  | "modifyTrait"
  | "modifyTraitListEntry"
  | "register"
  | "requestPasswordReset"
  | "resetPassword"
  | MutationKeySpecifier
)[];
export type MutationFieldPolicy = {
  answerInvitation?: FieldPolicy<any> | FieldReadFunction<any>;
  createCommunity?: FieldPolicy<any> | FieldReadFunction<any>;
  createCommunityInvitation?: FieldPolicy<any> | FieldReadFunction<any>;
  createCommunityMember?: FieldPolicy<any> | FieldReadFunction<any>;
  createCritter?: FieldPolicy<any> | FieldReadFunction<any>;
  createEnumValueSetting?: FieldPolicy<any> | FieldReadFunction<any>;
  createInviteCode?: FieldPolicy<any> | FieldReadFunction<any>;
  createRole?: FieldPolicy<any> | FieldReadFunction<any>;
  createSpecies?: FieldPolicy<any> | FieldReadFunction<any>;
  createSpeciesImageUploadUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  createSpeciesVariant?: FieldPolicy<any> | FieldReadFunction<any>;
  createTrait?: FieldPolicy<any> | FieldReadFunction<any>;
  createTraitListEntry?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteCommunityMember?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteEnumValueSetting?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteTrait?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteTraitListEntry?: FieldPolicy<any> | FieldReadFunction<any>;
  login?: FieldPolicy<any> | FieldReadFunction<any>;
  modifyCritter?: FieldPolicy<any> | FieldReadFunction<any>;
  modifyIdentity?: FieldPolicy<any> | FieldReadFunction<any>;
  modifyRole?: FieldPolicy<any> | FieldReadFunction<any>;
  modifyTrait?: FieldPolicy<any> | FieldReadFunction<any>;
  modifyTraitListEntry?: FieldPolicy<any> | FieldReadFunction<any>;
  register?: FieldPolicy<any> | FieldReadFunction<any>;
  requestPasswordReset?: FieldPolicy<any> | FieldReadFunction<any>;
  resetPassword?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NotAuthenticatedErrorKeySpecifier = (
  | "message"
  | NotAuthenticatedErrorKeySpecifier
)[];
export type NotAuthenticatedErrorFieldPolicy = {
  message?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NotAuthorizedErrorKeySpecifier = (
  | "message"
  | NotAuthorizedErrorKeySpecifier
)[];
export type NotAuthorizedErrorFieldPolicy = {
  message?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | "identities"
  | "inviteCodes"
  | "me"
  | "species"
  | "traits"
  | QueryKeySpecifier
)[];
export type QueryFieldPolicy = {
  communities?: FieldPolicy<any> | FieldReadFunction<any>;
  community?: FieldPolicy<any> | FieldReadFunction<any>;
  critters?: FieldPolicy<any> | FieldReadFunction<any>;
  identities?: FieldPolicy<any> | FieldReadFunction<any>;
  inviteCodes?: FieldPolicy<any> | FieldReadFunction<any>;
  me?: FieldPolicy<any> | FieldReadFunction<any>;
  species?: FieldPolicy<any> | FieldReadFunction<any>;
  traits?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RequestPasswordResetReceivedResponseKeySpecifier = (
  | "message"
  | RequestPasswordResetReceivedResponseKeySpecifier
)[];
export type RequestPasswordResetReceivedResponseFieldPolicy = {
  message?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ResetPasswordSuccessResponseKeySpecifier = (
  | "success"
  | ResetPasswordSuccessResponseKeySpecifier
)[];
export type ResetPasswordSuccessResponseFieldPolicy = {
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoleKeySpecifier = (
  | "canCreateCritter"
  | "canCreateInviteCode"
  | "canCreateRole"
  | "canCreateSpecies"
  | "canEditCritter"
  | "canEditRole"
  | "canEditSpecies"
  | "canListInviteCodes"
  | "community"
  | "communityId"
  | "id"
  | "name"
  | RoleKeySpecifier
)[];
export type RoleFieldPolicy = {
  canCreateCritter?: FieldPolicy<any> | FieldReadFunction<any>;
  canCreateInviteCode?: FieldPolicy<any> | FieldReadFunction<any>;
  canCreateRole?: FieldPolicy<any> | FieldReadFunction<any>;
  canCreateSpecies?: FieldPolicy<any> | FieldReadFunction<any>;
  canEditCritter?: FieldPolicy<any> | FieldReadFunction<any>;
  canEditRole?: FieldPolicy<any> | FieldReadFunction<any>;
  canEditSpecies?: FieldPolicy<any> | FieldReadFunction<any>;
  canListInviteCodes?: FieldPolicy<any> | FieldReadFunction<any>;
  community?: FieldPolicy<any> | FieldReadFunction<any>;
  communityId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoleListKeySpecifier = ("list" | RoleListKeySpecifier)[];
export type RoleListFieldPolicy = {
  list?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SpeciesKeySpecifier = (
  | "community"
  | "communityId"
  | "critters"
  | "hasImage"
  | "iconUrl"
  | "id"
  | "name"
  | "variants"
  | SpeciesKeySpecifier
)[];
export type SpeciesFieldPolicy = {
  community?: FieldPolicy<any> | FieldReadFunction<any>;
  communityId?: FieldPolicy<any> | FieldReadFunction<any>;
  critters?: FieldPolicy<any> | FieldReadFunction<any>;
  hasImage?: FieldPolicy<any> | FieldReadFunction<any>;
  iconUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  variants?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SpeciesListKeySpecifier = ("list" | SpeciesListKeySpecifier)[];
export type SpeciesListFieldPolicy = {
  list?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SpeciesVariantKeySpecifier = (
  | "enumValueSettings"
  | "id"
  | "name"
  | "species"
  | "speciesId"
  | "traitListEntries"
  | SpeciesVariantKeySpecifier
)[];
export type SpeciesVariantFieldPolicy = {
  enumValueSettings?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  species?: FieldPolicy<any> | FieldReadFunction<any>;
  speciesId?: FieldPolicy<any> | FieldReadFunction<any>;
  traitListEntries?: FieldPolicy<any> | FieldReadFunction<any>;
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
export type TraitListKeySpecifier = ("list" | TraitListKeySpecifier)[];
export type TraitListFieldPolicy = {
  list?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TraitListEntryKeySpecifier = (
  | "defaultDisplayValue"
  | "id"
  | "order"
  | "required"
  | "speciesVariant"
  | "speciesVariantId"
  | "trait"
  | "traitId"
  | "valueType"
  | TraitListEntryKeySpecifier
)[];
export type TraitListEntryFieldPolicy = {
  defaultDisplayValue?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  order?: FieldPolicy<any> | FieldReadFunction<any>;
  required?: FieldPolicy<any> | FieldReadFunction<any>;
  speciesVariant?: FieldPolicy<any> | FieldReadFunction<any>;
  speciesVariantId?: FieldPolicy<any> | FieldReadFunction<any>;
  trait?: FieldPolicy<any> | FieldReadFunction<any>;
  traitId?: FieldPolicy<any> | FieldReadFunction<any>;
  valueType?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UrlResponseKeySpecifier = ("url" | UrlResponseKeySpecifier)[];
export type UrlResponseFieldPolicy = {
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserAlreadyHasRoleErrorKeySpecifier = (
  | "message"
  | UserAlreadyHasRoleErrorKeySpecifier
)[];
export type UserAlreadyHasRoleErrorFieldPolicy = {
  message?: FieldPolicy<any> | FieldReadFunction<any>;
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
  CommunityInvitation?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CommunityInvitationKeySpecifier
      | (() => undefined | CommunityInvitationKeySpecifier);
    fields?: CommunityInvitationFieldPolicy;
  };
  CommunityInvitationList?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CommunityInvitationListKeySpecifier
      | (() => undefined | CommunityInvitationListKeySpecifier);
    fields?: CommunityInvitationListFieldPolicy;
  };
  CommunityList?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CommunityListKeySpecifier
      | (() => undefined | CommunityListKeySpecifier);
    fields?: CommunityListFieldPolicy;
  };
  CommunityMember?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CommunityMemberKeySpecifier
      | (() => undefined | CommunityMemberKeySpecifier);
    fields?: CommunityMemberFieldPolicy;
  };
  Critter?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CritterKeySpecifier
      | (() => undefined | CritterKeySpecifier);
    fields?: CritterFieldPolicy;
  };
  CritterList?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CritterListKeySpecifier
      | (() => undefined | CritterListKeySpecifier);
    fields?: CritterListFieldPolicy;
  };
  CritterTraitValue?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CritterTraitValueKeySpecifier
      | (() => undefined | CritterTraitValueKeySpecifier);
    fields?: CritterTraitValueFieldPolicy;
  };
  DeleteResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | DeleteResponseKeySpecifier
      | (() => undefined | DeleteResponseKeySpecifier);
    fields?: DeleteResponseFieldPolicy;
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
  EnumValueSetting?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | EnumValueSettingKeySpecifier
      | (() => undefined | EnumValueSettingKeySpecifier);
    fields?: EnumValueSettingFieldPolicy;
  };
  Identity?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | IdentityKeySpecifier
      | (() => undefined | IdentityKeySpecifier);
    fields?: IdentityFieldPolicy;
  };
  IdentityList?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | IdentityListKeySpecifier
      | (() => undefined | IdentityListKeySpecifier);
    fields?: IdentityListFieldPolicy;
  };
  InvalidArgumentError?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | InvalidArgumentErrorKeySpecifier
      | (() => undefined | InvalidArgumentErrorKeySpecifier);
    fields?: InvalidArgumentErrorFieldPolicy;
  };
  InvitationRequiredError?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | InvitationRequiredErrorKeySpecifier
      | (() => undefined | InvitationRequiredErrorKeySpecifier);
    fields?: InvitationRequiredErrorFieldPolicy;
  };
  InviteCode?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | InviteCodeKeySpecifier
      | (() => undefined | InviteCodeKeySpecifier);
    fields?: InviteCodeFieldPolicy;
  };
  InviteCodeList?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | InviteCodeListKeySpecifier
      | (() => undefined | InviteCodeListKeySpecifier);
    fields?: InviteCodeListFieldPolicy;
  };
  LoginFailureResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | LoginFailureResponseKeySpecifier
      | (() => undefined | LoginFailureResponseKeySpecifier);
    fields?: LoginFailureResponseFieldPolicy;
  };
  LoginSuccessResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | LoginSuccessResponseKeySpecifier
      | (() => undefined | LoginSuccessResponseKeySpecifier);
    fields?: LoginSuccessResponseFieldPolicy;
  };
  Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | MutationKeySpecifier
      | (() => undefined | MutationKeySpecifier);
    fields?: MutationFieldPolicy;
  };
  NotAuthenticatedError?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | NotAuthenticatedErrorKeySpecifier
      | (() => undefined | NotAuthenticatedErrorKeySpecifier);
    fields?: NotAuthenticatedErrorFieldPolicy;
  };
  NotAuthorizedError?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | NotAuthorizedErrorKeySpecifier
      | (() => undefined | NotAuthorizedErrorKeySpecifier);
    fields?: NotAuthorizedErrorFieldPolicy;
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
  RequestPasswordResetReceivedResponse?: Omit<
    TypePolicy,
    "fields" | "keyFields"
  > & {
    keyFields?:
      | false
      | RequestPasswordResetReceivedResponseKeySpecifier
      | (() => undefined | RequestPasswordResetReceivedResponseKeySpecifier);
    fields?: RequestPasswordResetReceivedResponseFieldPolicy;
  };
  ResetPasswordSuccessResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | ResetPasswordSuccessResponseKeySpecifier
      | (() => undefined | ResetPasswordSuccessResponseKeySpecifier);
    fields?: ResetPasswordSuccessResponseFieldPolicy;
  };
  Role?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | RoleKeySpecifier | (() => undefined | RoleKeySpecifier);
    fields?: RoleFieldPolicy;
  };
  RoleList?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | RoleListKeySpecifier
      | (() => undefined | RoleListKeySpecifier);
    fields?: RoleListFieldPolicy;
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
  SpeciesVariant?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | SpeciesVariantKeySpecifier
      | (() => undefined | SpeciesVariantKeySpecifier);
    fields?: SpeciesVariantFieldPolicy;
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
  UrlResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | UrlResponseKeySpecifier
      | (() => undefined | UrlResponseKeySpecifier);
    fields?: UrlResponseFieldPolicy;
  };
  UserAlreadyHasRoleError?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | UserAlreadyHasRoleErrorKeySpecifier
      | (() => undefined | UserAlreadyHasRoleErrorKeySpecifier);
    fields?: UserAlreadyHasRoleErrorFieldPolicy;
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
export const RolePermissionsFragmentFragmentDoc = gql`
  fragment RolePermissionsFragment on Role {
    canCreateCritter
    canCreateInviteCode
    canCreateRole
    canCreateSpecies
    canEditCritter
    canEditRole
    canEditSpecies
    canListInviteCodes
  }
`;
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
export const NotAuthenticatedErrorFragmentFragmentDoc = gql`
  fragment NotAuthenticatedErrorFragment on NotAuthenticatedError {
    message
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
        roles {
          id
          name
        }
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
  query getCritters($filters: CritterFilters!) {
    critters(filters: $filters) {
      ... on CritterList {
        list {
          id
          name
          variant {
            name
            id
          }
          traitValues {
            traitId
            value
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
export const CreateCommunityMemberDocument = gql`
  mutation createCommunityMember($input: CommunityMemberCreateInput!) {
    createCommunityMember(input: $input) {
      __typename
      ... on CommunityMember {
        id
        identityId
        roleId
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
      ... on NotAuthenticatedError {
        ...NotAuthenticatedErrorFragment
      }
    }
  }
  ${BaseErrorFragmentFragmentDoc}
  ${InvalidArgumentErrorFragmentFragmentDoc}
  ${NotAuthenticatedErrorFragmentFragmentDoc}
`;
export const DeleteCommunityMemberDocument = gql`
  mutation deleteCommunityMember($input: CommunityMemberDeleteInput!) {
    deleteCommunityMember(input: $input) {
      __typename
      ... on DeleteResponse {
        ok
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
      ... on NotAuthenticatedError {
        ...NotAuthenticatedErrorFragment
      }
    }
  }
  ${BaseErrorFragmentFragmentDoc}
  ${InvalidArgumentErrorFragmentFragmentDoc}
  ${NotAuthenticatedErrorFragmentFragmentDoc}
`;
export const GetCommunityMemberListDocument = gql`
  query getCommunityMemberList($communityId: ID!) {
    community(filters: { id: $communityId }) {
      __typename
      ... on Community {
        members {
          __typename
          ... on IdentityList {
            list {
              id
              displayName
              roles(filters: { communityId: $communityId }) {
                __typename
                ... on RoleList {
                  list {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export const CreateCommunityInvitationDocument = gql`
  mutation createCommunityInvitation($input: CommunityInvitationCreateInput!) {
    createCommunityInvitation(input: $input) {
      __typename
      ... on CommunityInvitation {
        id
      }
      ... on DuplicateError {
        ...DuplicateErrorFragment
      }
      ... on NotAuthenticatedError {
        ...NotAuthenticatedErrorFragment
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
    }
  }
  ${DuplicateErrorFragmentFragmentDoc}
  ${NotAuthenticatedErrorFragmentFragmentDoc}
  ${BaseErrorFragmentFragmentDoc}
`;
export const GetCommunityRolesDocument = gql`
  query getCommunityRoles($communityId: ID!) {
    community(filters: { id: $communityId }) {
      __typename
      ... on Community {
        roles {
          __typename
          id
          name
          ...RolePermissionsFragment
        }
      }
      ... on NotAuthenticatedError {
        ...NotAuthenticatedErrorFragment
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
    }
  }
  ${RolePermissionsFragmentFragmentDoc}
  ${NotAuthenticatedErrorFragmentFragmentDoc}
  ${InvalidArgumentErrorFragmentFragmentDoc}
  ${BaseErrorFragmentFragmentDoc}
`;
export const ModifyRoleDocument = gql`
  mutation modifyRole($input: RoleModifyInput!) {
    modifyRole(input: $input) {
      __typename
      ... on Role {
        id
        name
        ...RolePermissionsFragment
      }
      ... on DuplicateError {
        ...DuplicateErrorFragment
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
      ... on NotAuthenticatedError {
        ...NotAuthenticatedErrorFragment
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
    }
  }
  ${RolePermissionsFragmentFragmentDoc}
  ${DuplicateErrorFragmentFragmentDoc}
  ${InvalidArgumentErrorFragmentFragmentDoc}
  ${NotAuthenticatedErrorFragmentFragmentDoc}
  ${BaseErrorFragmentFragmentDoc}
`;
export const LoginDocument = gql`
  mutation login($input: LoginArgs!) {
    login(input: $input) {
      __typename
      ... on LoginSuccessResponse {
        identity {
          displayName
          id
        }
        token
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
    }
  }
  ${InvalidArgumentErrorFragmentFragmentDoc}
`;
export const RegisterDocument = gql`
  mutation register($input: RegisterArgs!) {
    register(input: $input) {
      __typename
      ... on LoginSuccessResponse {
        identity {
          id
          displayName
        }
        token
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
      ... on DuplicateError {
        ...DuplicateErrorFragment
      }
    }
  }
  ${InvalidArgumentErrorFragmentFragmentDoc}
  ${DuplicateErrorFragmentFragmentDoc}
`;
export const RequestPasswordResetDocument = gql`
  mutation requestPasswordReset($input: RequestPasswordResetInput!) {
    requestPasswordReset(input: $input) {
      __typename
      ... on RequestPasswordResetReceivedResponse {
        message
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
    }
  }
  ${InvalidArgumentErrorFragmentFragmentDoc}
`;
export const ResetPasswordDocument = gql`
  mutation resetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      __typename
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
    }
  }
  ${InvalidArgumentErrorFragmentFragmentDoc}
`;
export const CreateTraitListEntryDocument = gql`
  mutation createTraitListEntry($input: TraitListEntryCreateInput!) {
    createTraitListEntry(input: $input) {
      __typename
      ... on TraitListEntry {
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
      ... on BaseError {
        ...BaseErrorFragment
      }
      ... on DuplicateError {
        ...DuplicateErrorFragment
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
    }
  }
  ${BaseErrorFragmentFragmentDoc}
  ${DuplicateErrorFragmentFragmentDoc}
  ${InvalidArgumentErrorFragmentFragmentDoc}
`;
export const DeleteTraitListEntryDocument = gql`
  mutation deleteTraitListEntry($id: ID!) {
    deleteTraitListEntry(id: $id) {
      __typename
      ... on DeleteResponse {
        ok
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
export const ModifyTraitListEntryDocument = gql`
  mutation modifyTraitListEntry($input: TraitListEntryModifyInput!) {
    modifyTraitListEntry(input: $input) {
      __typename
      ... on TraitListEntry {
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
export const CreateCritterDocument = gql`
  mutation createCritter($input: CritterCreateInput!) {
    createCritter(input: $input) {
      ... on Critter {
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
export const CreateEnumValueSettingDocument = gql`
  mutation createEnumValueSetting($input: EnumValueSettingCreateInput!) {
    createEnumValueSetting(input: $input) {
      __typename
      ... on EnumValueSetting {
        id
        enumValueId
        speciesVariantId
      }
      ... on DuplicateError {
        ...DuplicateErrorFragment
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
    }
  }
  ${DuplicateErrorFragmentFragmentDoc}
  ${BaseErrorFragmentFragmentDoc}
  ${InvalidArgumentErrorFragmentFragmentDoc}
`;
export const CreateSpeciesImageUploadUrlDocument = gql`
  mutation createSpeciesImageUploadUrl($input: SpeciesImageUrlCreateInput!) {
    createSpeciesImageUploadUrl(input: $input) {
      __typename
      ... on UrlResponse {
        url
      }
      ... on NotAuthenticatedError {
        ...NotAuthenticatedErrorFragment
      }
    }
  }
  ${NotAuthenticatedErrorFragmentFragmentDoc}
`;
export const CreateSpeciesTraitDocument = gql`
  mutation createSpeciesTrait($input: TraitCreateInput!) {
    createTrait(input: $input) {
      ... on Trait {
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
export const CreateVariantDocument = gql`
  mutation createVariant($input: SpeciesVariantCreateInput!) {
    createSpeciesVariant(input: $input) {
      ... on SpeciesVariant {
        id
        name
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
      ... on DuplicateError {
        ...DuplicateErrorFragment
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
    }
  }
  ${BaseErrorFragmentFragmentDoc}
  ${DuplicateErrorFragmentFragmentDoc}
  ${InvalidArgumentErrorFragmentFragmentDoc}
`;
export const DeleteEnumValueSettingDocument = gql`
  mutation deleteEnumValueSetting($id: ID!) {
    deleteEnumValueSetting(input: { id: $id }) {
      __typename
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
      ... on DeleteResponse {
        ok
      }
    }
  }
  ${InvalidArgumentErrorFragmentFragmentDoc}
`;
export const DeleteTraitDocument = gql`
  mutation deleteTrait($input: TraitDeleteInput!) {
    deleteTrait(input: $input) {
      __typename
      ... on DeleteResponse {
        ok
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
      ... on NotAuthenticatedError {
        ...NotAuthenticatedErrorFragment
      }
    }
  }
  ${InvalidArgumentErrorFragmentFragmentDoc}
  ${BaseErrorFragmentFragmentDoc}
  ${NotAuthenticatedErrorFragmentFragmentDoc}
`;
export const GetSpeciesDetailDocument = gql`
  query getSpeciesDetail($filters: SpeciesFilters) {
    __typename
    species(filters: $filters) {
      ... on SpeciesList {
        list {
          id
          name
          variants {
            id
            name
            enumValueSettings {
              id
              speciesVariantId
              enumValueId
            }
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
      ... on BaseError {
        ...BaseErrorFragment
      }
    }
  }
  ${InvalidArgumentErrorFragmentFragmentDoc}
  ${BaseErrorFragmentFragmentDoc}
`;
export const GetSpeciesTraitsDocument = gql`
  query getSpeciesTraits($filters: TraitFilters!) {
    traits(filters: $filters) {
      ... on TraitList {
        list {
          id
          name
          enumValues {
            id
            name
          }
          valueType
        }
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
      ... on NotAuthenticatedError {
        ...NotAuthenticatedErrorFragment
      }
    }
  }
  ${BaseErrorFragmentFragmentDoc}
  ${NotAuthenticatedErrorFragmentFragmentDoc}
`;
export const ModifyCritterDocument = gql`
  mutation modifyCritter($input: CritterModifyInput!) {
    modifyCritter(input: $input) {
      __typename
      ... on Critter {
        id
        name
        traitValues {
          traitId
          value
        }
        variantId
        variant {
          id
          name
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
export const ModifySpeciesTraitDocument = gql`
  mutation modifySpeciesTrait($input: TraitModifyInput!) {
    modifyTrait(input: $input) {
      ... on Trait {
        id
        name
        valueType
        enumValues {
          id
          name
        }
      }
      ... on DuplicateError {
        ...DuplicateErrorFragment
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
    }
  }
  ${DuplicateErrorFragmentFragmentDoc}
  ${InvalidArgumentErrorFragmentFragmentDoc}
`;
export const CreateSpeciesDocument = gql`
  mutation createSpecies($input: SpeciesCreateInput!) {
    __typename
    createSpecies(input: $input) {
      ... on Species {
        id
        name
        iconUrl
        variants {
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
          variants {
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
export const AnswerCommunityInvitationDocument = gql`
  mutation answerCommunityInvitation($input: CommunityInvitationAnswerInput!) {
    answerInvitation(input: $input) {
      __typename
      ... on CommunityInvitation {
        id
        accepted
        declined
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
      ... on NotAuthenticatedError {
        ...NotAuthenticatedErrorFragment
      }
    }
  }
  ${BaseErrorFragmentFragmentDoc}
  ${InvalidArgumentErrorFragmentFragmentDoc}
  ${NotAuthenticatedErrorFragmentFragmentDoc}
`;
export const GetUserSettingsDocument = gql`
  query getUserSettings {
    me {
      pendingInvitations {
        __typename
        ... on CommunityInvitationList {
          list {
            id
            accepted
            declined
            role {
              name
              community {
                name
              }
            }
            inviter {
              displayName
            }
          }
        }
        ... on BaseError {
          ...BaseErrorFragment
        }
      }
    }
  }
  ${BaseErrorFragmentFragmentDoc}
`;
export const GetIdentityListDocument = gql`
  query getIdentityList {
    identities {
      ... on IdentityList {
        list {
          displayName
          email
          id
          canCreateCommunity
          canCreateInviteCode
          canListIdentities
          canListInviteCodes
          canGrantGlobalPermissions
        }
      }
      ... on NotAuthenticatedError {
        ...NotAuthenticatedErrorFragment
      }
    }
  }
  ${NotAuthenticatedErrorFragmentFragmentDoc}
`;
export const GetInviteCodeListDocument = gql`
  query getInviteCodeList($filters: InviteCodeFilters!) {
    inviteCodes(filters: $filters) {
      __typename
      ... on InviteCodeList {
        list {
          role {
            name
            id
          }
          claimCount
          id
          maxClaims
          creator {
            displayName
          }
        }
      }
    }
  }
`;
export const ModifyIdentityDocument = gql`
  mutation modifyIdentity($input: IdentityModifyInput!) {
    modifyIdentity(input: $input) {
      __typename
      ... on Identity {
        canCreateCommunity
        canCreateInviteCode
        canGrantGlobalPermissions
        canListIdentities
        canListInviteCodes
        id
      }
      ... on NotAuthenticatedError {
        ...NotAuthenticatedErrorFragment
      }
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
      ... on BaseError {
        ...BaseErrorFragment
      }
    }
  }
  ${NotAuthenticatedErrorFragmentFragmentDoc}
  ${InvalidArgumentErrorFragmentFragmentDoc}
  ${BaseErrorFragmentFragmentDoc}
`;
export const CreateInviteCodeDocument = gql`
  mutation createInviteCode($input: InviteCodeCreateInput!) {
    createInviteCode(input: $input) {
      __typename
      ... on InvalidArgumentError {
        ...InvalidArgumentErrorFragment
      }
      ... on DuplicateError {
        ...DuplicateErrorFragment
      }
      ... on InviteCode {
        id
        creator {
          displayName
        }
        claimCount
        maxClaims
      }
    }
  }
  ${InvalidArgumentErrorFragmentFragmentDoc}
  ${DuplicateErrorFragmentFragmentDoc}
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
      variables: GetCrittersQueryVariables,
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
    createCommunityMember(
      variables: CreateCommunityMemberMutationVariables,
      options?: C
    ): Promise<CreateCommunityMemberMutation> {
      return requester<
        CreateCommunityMemberMutation,
        CreateCommunityMemberMutationVariables
      >(
        CreateCommunityMemberDocument,
        variables,
        options
      ) as Promise<CreateCommunityMemberMutation>;
    },
    deleteCommunityMember(
      variables: DeleteCommunityMemberMutationVariables,
      options?: C
    ): Promise<DeleteCommunityMemberMutation> {
      return requester<
        DeleteCommunityMemberMutation,
        DeleteCommunityMemberMutationVariables
      >(
        DeleteCommunityMemberDocument,
        variables,
        options
      ) as Promise<DeleteCommunityMemberMutation>;
    },
    getCommunityMemberList(
      variables: GetCommunityMemberListQueryVariables,
      options?: C
    ): Promise<GetCommunityMemberListQuery> {
      return requester<
        GetCommunityMemberListQuery,
        GetCommunityMemberListQueryVariables
      >(
        GetCommunityMemberListDocument,
        variables,
        options
      ) as Promise<GetCommunityMemberListQuery>;
    },
    createCommunityInvitation(
      variables: CreateCommunityInvitationMutationVariables,
      options?: C
    ): Promise<CreateCommunityInvitationMutation> {
      return requester<
        CreateCommunityInvitationMutation,
        CreateCommunityInvitationMutationVariables
      >(
        CreateCommunityInvitationDocument,
        variables,
        options
      ) as Promise<CreateCommunityInvitationMutation>;
    },
    getCommunityRoles(
      variables: GetCommunityRolesQueryVariables,
      options?: C
    ): Promise<GetCommunityRolesQuery> {
      return requester<GetCommunityRolesQuery, GetCommunityRolesQueryVariables>(
        GetCommunityRolesDocument,
        variables,
        options
      ) as Promise<GetCommunityRolesQuery>;
    },
    modifyRole(
      variables: ModifyRoleMutationVariables,
      options?: C
    ): Promise<ModifyRoleMutation> {
      return requester<ModifyRoleMutation, ModifyRoleMutationVariables>(
        ModifyRoleDocument,
        variables,
        options
      ) as Promise<ModifyRoleMutation>;
    },
    login(
      variables: LoginMutationVariables,
      options?: C
    ): Promise<LoginMutation> {
      return requester<LoginMutation, LoginMutationVariables>(
        LoginDocument,
        variables,
        options
      ) as Promise<LoginMutation>;
    },
    register(
      variables: RegisterMutationVariables,
      options?: C
    ): Promise<RegisterMutation> {
      return requester<RegisterMutation, RegisterMutationVariables>(
        RegisterDocument,
        variables,
        options
      ) as Promise<RegisterMutation>;
    },
    requestPasswordReset(
      variables: RequestPasswordResetMutationVariables,
      options?: C
    ): Promise<RequestPasswordResetMutation> {
      return requester<
        RequestPasswordResetMutation,
        RequestPasswordResetMutationVariables
      >(
        RequestPasswordResetDocument,
        variables,
        options
      ) as Promise<RequestPasswordResetMutation>;
    },
    resetPassword(
      variables: ResetPasswordMutationVariables,
      options?: C
    ): Promise<ResetPasswordMutation> {
      return requester<ResetPasswordMutation, ResetPasswordMutationVariables>(
        ResetPasswordDocument,
        variables,
        options
      ) as Promise<ResetPasswordMutation>;
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
    modifyTraitListEntry(
      variables: ModifyTraitListEntryMutationVariables,
      options?: C
    ): Promise<ModifyTraitListEntryMutation> {
      return requester<
        ModifyTraitListEntryMutation,
        ModifyTraitListEntryMutationVariables
      >(
        ModifyTraitListEntryDocument,
        variables,
        options
      ) as Promise<ModifyTraitListEntryMutation>;
    },
    createCritter(
      variables: CreateCritterMutationVariables,
      options?: C
    ): Promise<CreateCritterMutation> {
      return requester<CreateCritterMutation, CreateCritterMutationVariables>(
        CreateCritterDocument,
        variables,
        options
      ) as Promise<CreateCritterMutation>;
    },
    createEnumValueSetting(
      variables: CreateEnumValueSettingMutationVariables,
      options?: C
    ): Promise<CreateEnumValueSettingMutation> {
      return requester<
        CreateEnumValueSettingMutation,
        CreateEnumValueSettingMutationVariables
      >(
        CreateEnumValueSettingDocument,
        variables,
        options
      ) as Promise<CreateEnumValueSettingMutation>;
    },
    createSpeciesImageUploadUrl(
      variables: CreateSpeciesImageUploadUrlMutationVariables,
      options?: C
    ): Promise<CreateSpeciesImageUploadUrlMutation> {
      return requester<
        CreateSpeciesImageUploadUrlMutation,
        CreateSpeciesImageUploadUrlMutationVariables
      >(
        CreateSpeciesImageUploadUrlDocument,
        variables,
        options
      ) as Promise<CreateSpeciesImageUploadUrlMutation>;
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
    createVariant(
      variables: CreateVariantMutationVariables,
      options?: C
    ): Promise<CreateVariantMutation> {
      return requester<CreateVariantMutation, CreateVariantMutationVariables>(
        CreateVariantDocument,
        variables,
        options
      ) as Promise<CreateVariantMutation>;
    },
    deleteEnumValueSetting(
      variables: DeleteEnumValueSettingMutationVariables,
      options?: C
    ): Promise<DeleteEnumValueSettingMutation> {
      return requester<
        DeleteEnumValueSettingMutation,
        DeleteEnumValueSettingMutationVariables
      >(
        DeleteEnumValueSettingDocument,
        variables,
        options
      ) as Promise<DeleteEnumValueSettingMutation>;
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
    modifyCritter(
      variables: ModifyCritterMutationVariables,
      options?: C
    ): Promise<ModifyCritterMutation> {
      return requester<ModifyCritterMutation, ModifyCritterMutationVariables>(
        ModifyCritterDocument,
        variables,
        options
      ) as Promise<ModifyCritterMutation>;
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
    answerCommunityInvitation(
      variables: AnswerCommunityInvitationMutationVariables,
      options?: C
    ): Promise<AnswerCommunityInvitationMutation> {
      return requester<
        AnswerCommunityInvitationMutation,
        AnswerCommunityInvitationMutationVariables
      >(
        AnswerCommunityInvitationDocument,
        variables,
        options
      ) as Promise<AnswerCommunityInvitationMutation>;
    },
    getUserSettings(
      variables?: GetUserSettingsQueryVariables,
      options?: C
    ): Promise<GetUserSettingsQuery> {
      return requester<GetUserSettingsQuery, GetUserSettingsQueryVariables>(
        GetUserSettingsDocument,
        variables,
        options
      ) as Promise<GetUserSettingsQuery>;
    },
    getIdentityList(
      variables?: GetIdentityListQueryVariables,
      options?: C
    ): Promise<GetIdentityListQuery> {
      return requester<GetIdentityListQuery, GetIdentityListQueryVariables>(
        GetIdentityListDocument,
        variables,
        options
      ) as Promise<GetIdentityListQuery>;
    },
    getInviteCodeList(
      variables: GetInviteCodeListQueryVariables,
      options?: C
    ): Promise<GetInviteCodeListQuery> {
      return requester<GetInviteCodeListQuery, GetInviteCodeListQueryVariables>(
        GetInviteCodeListDocument,
        variables,
        options
      ) as Promise<GetInviteCodeListQuery>;
    },
    modifyIdentity(
      variables: ModifyIdentityMutationVariables,
      options?: C
    ): Promise<ModifyIdentityMutation> {
      return requester<ModifyIdentityMutation, ModifyIdentityMutationVariables>(
        ModifyIdentityDocument,
        variables,
        options
      ) as Promise<ModifyIdentityMutation>;
    },
    createInviteCode(
      variables: CreateInviteCodeMutationVariables,
      options?: C
    ): Promise<CreateInviteCodeMutation> {
      return requester<
        CreateInviteCodeMutation,
        CreateInviteCodeMutationVariables
      >(
        CreateInviteCodeDocument,
        variables,
        options
      ) as Promise<CreateInviteCodeMutation>;
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

  async createCommunityMember(
    options: Omit<
      Partial<
        import("@apollo/client/core").MutationOptions<
          CreateCommunityMemberMutation,
          CreateCommunityMemberMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: CreateCommunityMemberMutationVariables;
    }
  ): Promise<
    Omit<
      import("@apollo/client/core").FetchResult<CreateCommunityMemberMutation>,
      "data"
    > & { data: CreateCommunityMemberMutation }
  > {
    const finalOptions = {
      ...options,
      mutation: CreateCommunityMemberDocument,
    };
    const result = await this.client.mutate<
      CreateCommunityMemberMutation,
      CreateCommunityMemberMutationVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async deleteCommunityMember(
    options: Omit<
      Partial<
        import("@apollo/client/core").MutationOptions<
          DeleteCommunityMemberMutation,
          DeleteCommunityMemberMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: DeleteCommunityMemberMutationVariables;
    }
  ): Promise<
    Omit<
      import("@apollo/client/core").FetchResult<DeleteCommunityMemberMutation>,
      "data"
    > & { data: DeleteCommunityMemberMutation }
  > {
    const finalOptions = {
      ...options,
      mutation: DeleteCommunityMemberDocument,
    };
    const result = await this.client.mutate<
      DeleteCommunityMemberMutation,
      DeleteCommunityMemberMutationVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async getCommunityMemberList(
    options: Omit<
      Partial<
        import("@apollo/client/core").QueryOptions<
          GetCommunityMemberListQueryVariables,
          GetCommunityMemberListQuery
        >
      >,
      "variables" | "query"
    > & {
      variables: GetCommunityMemberListQueryVariables;
    }
  ) {
    const finalOptions = {
      ...options,
      query: GetCommunityMemberListDocument,
    };
    const result = await this.client.query<
      GetCommunityMemberListQuery,
      GetCommunityMemberListQueryVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async createCommunityInvitation(
    options: Omit<
      Partial<
        import("@apollo/client/core").MutationOptions<
          CreateCommunityInvitationMutation,
          CreateCommunityInvitationMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: CreateCommunityInvitationMutationVariables;
    }
  ): Promise<
    Omit<
      import("@apollo/client/core").FetchResult<CreateCommunityInvitationMutation>,
      "data"
    > & { data: CreateCommunityInvitationMutation }
  > {
    const finalOptions = {
      ...options,
      mutation: CreateCommunityInvitationDocument,
    };
    const result = await this.client.mutate<
      CreateCommunityInvitationMutation,
      CreateCommunityInvitationMutationVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async getCommunityRoles(
    options: Omit<
      Partial<
        import("@apollo/client/core").QueryOptions<
          GetCommunityRolesQueryVariables,
          GetCommunityRolesQuery
        >
      >,
      "variables" | "query"
    > & {
      variables: GetCommunityRolesQueryVariables;
    }
  ) {
    const finalOptions = {
      ...options,
      query: GetCommunityRolesDocument,
    };
    const result = await this.client.query<
      GetCommunityRolesQuery,
      GetCommunityRolesQueryVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async modifyRole(
    options: Omit<
      Partial<
        import("@apollo/client/core").MutationOptions<
          ModifyRoleMutation,
          ModifyRoleMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: ModifyRoleMutationVariables;
    }
  ): Promise<
    Omit<
      import("@apollo/client/core").FetchResult<ModifyRoleMutation>,
      "data"
    > & { data: ModifyRoleMutation }
  > {
    const finalOptions = {
      ...options,
      mutation: ModifyRoleDocument,
    };
    const result = await this.client.mutate<
      ModifyRoleMutation,
      ModifyRoleMutationVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async login(
    options: Omit<
      Partial<
        import("@apollo/client/core").MutationOptions<
          LoginMutation,
          LoginMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: LoginMutationVariables;
    }
  ): Promise<
    Omit<import("@apollo/client/core").FetchResult<LoginMutation>, "data"> & {
      data: LoginMutation;
    }
  > {
    const finalOptions = {
      ...options,
      mutation: LoginDocument,
    };
    const result = await this.client.mutate<
      LoginMutation,
      LoginMutationVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async register(
    options: Omit<
      Partial<
        import("@apollo/client/core").MutationOptions<
          RegisterMutation,
          RegisterMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: RegisterMutationVariables;
    }
  ): Promise<
    Omit<
      import("@apollo/client/core").FetchResult<RegisterMutation>,
      "data"
    > & { data: RegisterMutation }
  > {
    const finalOptions = {
      ...options,
      mutation: RegisterDocument,
    };
    const result = await this.client.mutate<
      RegisterMutation,
      RegisterMutationVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async requestPasswordReset(
    options: Omit<
      Partial<
        import("@apollo/client/core").MutationOptions<
          RequestPasswordResetMutation,
          RequestPasswordResetMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: RequestPasswordResetMutationVariables;
    }
  ): Promise<
    Omit<
      import("@apollo/client/core").FetchResult<RequestPasswordResetMutation>,
      "data"
    > & { data: RequestPasswordResetMutation }
  > {
    const finalOptions = {
      ...options,
      mutation: RequestPasswordResetDocument,
    };
    const result = await this.client.mutate<
      RequestPasswordResetMutation,
      RequestPasswordResetMutationVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async resetPassword(
    options: Omit<
      Partial<
        import("@apollo/client/core").MutationOptions<
          ResetPasswordMutation,
          ResetPasswordMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: ResetPasswordMutationVariables;
    }
  ): Promise<
    Omit<
      import("@apollo/client/core").FetchResult<ResetPasswordMutation>,
      "data"
    > & { data: ResetPasswordMutation }
  > {
    const finalOptions = {
      ...options,
      mutation: ResetPasswordDocument,
    };
    const result = await this.client.mutate<
      ResetPasswordMutation,
      ResetPasswordMutationVariables
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

  async modifyTraitListEntry(
    options: Omit<
      Partial<
        import("@apollo/client/core").MutationOptions<
          ModifyTraitListEntryMutation,
          ModifyTraitListEntryMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: ModifyTraitListEntryMutationVariables;
    }
  ): Promise<
    Omit<
      import("@apollo/client/core").FetchResult<ModifyTraitListEntryMutation>,
      "data"
    > & { data: ModifyTraitListEntryMutation }
  > {
    const finalOptions = {
      ...options,
      mutation: ModifyTraitListEntryDocument,
    };
    const result = await this.client.mutate<
      ModifyTraitListEntryMutation,
      ModifyTraitListEntryMutationVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async createCritter(
    options: Omit<
      Partial<
        import("@apollo/client/core").MutationOptions<
          CreateCritterMutation,
          CreateCritterMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: CreateCritterMutationVariables;
    }
  ): Promise<
    Omit<
      import("@apollo/client/core").FetchResult<CreateCritterMutation>,
      "data"
    > & { data: CreateCritterMutation }
  > {
    const finalOptions = {
      ...options,
      mutation: CreateCritterDocument,
    };
    const result = await this.client.mutate<
      CreateCritterMutation,
      CreateCritterMutationVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async createEnumValueSetting(
    options: Omit<
      Partial<
        import("@apollo/client/core").MutationOptions<
          CreateEnumValueSettingMutation,
          CreateEnumValueSettingMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: CreateEnumValueSettingMutationVariables;
    }
  ): Promise<
    Omit<
      import("@apollo/client/core").FetchResult<CreateEnumValueSettingMutation>,
      "data"
    > & { data: CreateEnumValueSettingMutation }
  > {
    const finalOptions = {
      ...options,
      mutation: CreateEnumValueSettingDocument,
    };
    const result = await this.client.mutate<
      CreateEnumValueSettingMutation,
      CreateEnumValueSettingMutationVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async createSpeciesImageUploadUrl(
    options: Omit<
      Partial<
        import("@apollo/client/core").MutationOptions<
          CreateSpeciesImageUploadUrlMutation,
          CreateSpeciesImageUploadUrlMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: CreateSpeciesImageUploadUrlMutationVariables;
    }
  ): Promise<
    Omit<
      import("@apollo/client/core").FetchResult<CreateSpeciesImageUploadUrlMutation>,
      "data"
    > & { data: CreateSpeciesImageUploadUrlMutation }
  > {
    const finalOptions = {
      ...options,
      mutation: CreateSpeciesImageUploadUrlDocument,
    };
    const result = await this.client.mutate<
      CreateSpeciesImageUploadUrlMutation,
      CreateSpeciesImageUploadUrlMutationVariables
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

  async createVariant(
    options: Omit<
      Partial<
        import("@apollo/client/core").MutationOptions<
          CreateVariantMutation,
          CreateVariantMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: CreateVariantMutationVariables;
    }
  ): Promise<
    Omit<
      import("@apollo/client/core").FetchResult<CreateVariantMutation>,
      "data"
    > & { data: CreateVariantMutation }
  > {
    const finalOptions = {
      ...options,
      mutation: CreateVariantDocument,
    };
    const result = await this.client.mutate<
      CreateVariantMutation,
      CreateVariantMutationVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async deleteEnumValueSetting(
    options: Omit<
      Partial<
        import("@apollo/client/core").MutationOptions<
          DeleteEnumValueSettingMutation,
          DeleteEnumValueSettingMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: DeleteEnumValueSettingMutationVariables;
    }
  ): Promise<
    Omit<
      import("@apollo/client/core").FetchResult<DeleteEnumValueSettingMutation>,
      "data"
    > & { data: DeleteEnumValueSettingMutation }
  > {
    const finalOptions = {
      ...options,
      mutation: DeleteEnumValueSettingDocument,
    };
    const result = await this.client.mutate<
      DeleteEnumValueSettingMutation,
      DeleteEnumValueSettingMutationVariables
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

  async modifyCritter(
    options: Omit<
      Partial<
        import("@apollo/client/core").MutationOptions<
          ModifyCritterMutation,
          ModifyCritterMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: ModifyCritterMutationVariables;
    }
  ): Promise<
    Omit<
      import("@apollo/client/core").FetchResult<ModifyCritterMutation>,
      "data"
    > & { data: ModifyCritterMutation }
  > {
    const finalOptions = {
      ...options,
      mutation: ModifyCritterDocument,
    };
    const result = await this.client.mutate<
      ModifyCritterMutation,
      ModifyCritterMutationVariables
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

  async answerCommunityInvitation(
    options: Omit<
      Partial<
        import("@apollo/client/core").MutationOptions<
          AnswerCommunityInvitationMutation,
          AnswerCommunityInvitationMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: AnswerCommunityInvitationMutationVariables;
    }
  ): Promise<
    Omit<
      import("@apollo/client/core").FetchResult<AnswerCommunityInvitationMutation>,
      "data"
    > & { data: AnswerCommunityInvitationMutation }
  > {
    const finalOptions = {
      ...options,
      mutation: AnswerCommunityInvitationDocument,
    };
    const result = await this.client.mutate<
      AnswerCommunityInvitationMutation,
      AnswerCommunityInvitationMutationVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async getUserSettings(
    options: Omit<
      Partial<
        import("@apollo/client/core").QueryOptions<
          GetUserSettingsQueryVariables,
          GetUserSettingsQuery
        >
      >,
      "variables" | "query"
    > & {
      variables: GetUserSettingsQueryVariables;
    }
  ) {
    const finalOptions = {
      ...options,
      query: GetUserSettingsDocument,
    };
    const result = await this.client.query<
      GetUserSettingsQuery,
      GetUserSettingsQueryVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async getIdentityList(
    options: Omit<
      Partial<
        import("@apollo/client/core").QueryOptions<
          GetIdentityListQueryVariables,
          GetIdentityListQuery
        >
      >,
      "variables" | "query"
    > & {
      variables: GetIdentityListQueryVariables;
    }
  ) {
    const finalOptions = {
      ...options,
      query: GetIdentityListDocument,
    };
    const result = await this.client.query<
      GetIdentityListQuery,
      GetIdentityListQueryVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async getInviteCodeList(
    options: Omit<
      Partial<
        import("@apollo/client/core").QueryOptions<
          GetInviteCodeListQueryVariables,
          GetInviteCodeListQuery
        >
      >,
      "variables" | "query"
    > & {
      variables: GetInviteCodeListQueryVariables;
    }
  ) {
    const finalOptions = {
      ...options,
      query: GetInviteCodeListDocument,
    };
    const result = await this.client.query<
      GetInviteCodeListQuery,
      GetInviteCodeListQueryVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async modifyIdentity(
    options: Omit<
      Partial<
        import("@apollo/client/core").MutationOptions<
          ModifyIdentityMutation,
          ModifyIdentityMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: ModifyIdentityMutationVariables;
    }
  ): Promise<
    Omit<
      import("@apollo/client/core").FetchResult<ModifyIdentityMutation>,
      "data"
    > & { data: ModifyIdentityMutation }
  > {
    const finalOptions = {
      ...options,
      mutation: ModifyIdentityDocument,
    };
    const result = await this.client.mutate<
      ModifyIdentityMutation,
      ModifyIdentityMutationVariables
    >(finalOptions);
    if (!hasData(result)) {
      throw new Error("Unknown request failure");
    }
    return result;
  }

  async createInviteCode(
    options: Omit<
      Partial<
        import("@apollo/client/core").MutationOptions<
          CreateInviteCodeMutation,
          CreateInviteCodeMutationVariables
        >
      >,
      "variables" | "mutation"
    > & {
      variables: CreateInviteCodeMutationVariables;
    }
  ): Promise<
    Omit<
      import("@apollo/client/core").FetchResult<CreateInviteCodeMutation>,
      "data"
    > & { data: CreateInviteCodeMutation }
  > {
    const finalOptions = {
      ...options,
      mutation: CreateInviteCodeDocument,
    };
    const result = await this.client.mutate<
      CreateInviteCodeMutation,
      CreateInviteCodeMutationVariables
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

export function isAccount(val: unknown): val is { __typename?: "Account" } {
  return hasTypeName(val, "Account");
}

export type NarrowToAccount<T> = T extends { __typename?: "Account" }
  ? T
  : never;

export function isCommunity(val: unknown): val is { __typename?: "Community" } {
  return hasTypeName(val, "Community");
}

export type NarrowToCommunity<T> = T extends { __typename?: "Community" }
  ? T
  : never;

export function isCommunityInvitation(
  val: unknown
): val is { __typename?: "CommunityInvitation" } {
  return hasTypeName(val, "CommunityInvitation");
}

export type NarrowToCommunityInvitation<T> = T extends {
  __typename?: "CommunityInvitation";
}
  ? T
  : never;

export function isCommunityInvitationList(
  val: unknown
): val is { __typename?: "CommunityInvitationList" } {
  return hasTypeName(val, "CommunityInvitationList");
}

export type NarrowToCommunityInvitationList<T> = T extends {
  __typename?: "CommunityInvitationList";
}
  ? T
  : never;

export function isCommunityList(
  val: unknown
): val is { __typename?: "CommunityList" } {
  return hasTypeName(val, "CommunityList");
}

export type NarrowToCommunityList<T> = T extends {
  __typename?: "CommunityList";
}
  ? T
  : never;

export function isCommunityMember(
  val: unknown
): val is { __typename?: "CommunityMember" } {
  return hasTypeName(val, "CommunityMember");
}

export type NarrowToCommunityMember<T> = T extends {
  __typename?: "CommunityMember";
}
  ? T
  : never;

export function isCritter(val: unknown): val is { __typename?: "Critter" } {
  return hasTypeName(val, "Critter");
}

export type NarrowToCritter<T> = T extends { __typename?: "Critter" }
  ? T
  : never;

export function isCritterList(
  val: unknown
): val is { __typename?: "CritterList" } {
  return hasTypeName(val, "CritterList");
}

export type NarrowToCritterList<T> = T extends { __typename?: "CritterList" }
  ? T
  : never;

export function isCritterTraitValue(
  val: unknown
): val is { __typename?: "CritterTraitValue" } {
  return hasTypeName(val, "CritterTraitValue");
}

export type NarrowToCritterTraitValue<T> = T extends {
  __typename?: "CritterTraitValue";
}
  ? T
  : never;

export function isDeleteResponse(
  val: unknown
): val is { __typename?: "DeleteResponse" } {
  return hasTypeName(val, "DeleteResponse");
}

export type NarrowToDeleteResponse<T> = T extends {
  __typename?: "DeleteResponse";
}
  ? T
  : never;

export function isDuplicateError(
  val: unknown
): val is { __typename?: "DuplicateError" } {
  return hasTypeName(val, "DuplicateError");
}

export type NarrowToDuplicateError<T> = T extends {
  __typename?: "DuplicateError";
}
  ? T
  : never;

export function isEnumValue(val: unknown): val is { __typename?: "EnumValue" } {
  return hasTypeName(val, "EnumValue");
}

export type NarrowToEnumValue<T> = T extends { __typename?: "EnumValue" }
  ? T
  : never;

export function isEnumValueSetting(
  val: unknown
): val is { __typename?: "EnumValueSetting" } {
  return hasTypeName(val, "EnumValueSetting");
}

export type NarrowToEnumValueSetting<T> = T extends {
  __typename?: "EnumValueSetting";
}
  ? T
  : never;

export function isIdentity(val: unknown): val is { __typename?: "Identity" } {
  return hasTypeName(val, "Identity");
}

export type NarrowToIdentity<T> = T extends { __typename?: "Identity" }
  ? T
  : never;

export function isIdentityList(
  val: unknown
): val is { __typename?: "IdentityList" } {
  return hasTypeName(val, "IdentityList");
}

export type NarrowToIdentityList<T> = T extends { __typename?: "IdentityList" }
  ? T
  : never;

export function isInvalidArgumentError(
  val: unknown
): val is { __typename?: "InvalidArgumentError" } {
  return hasTypeName(val, "InvalidArgumentError");
}

export type NarrowToInvalidArgumentError<T> = T extends {
  __typename?: "InvalidArgumentError";
}
  ? T
  : never;

export function isInvitationRequiredError(
  val: unknown
): val is { __typename?: "InvitationRequiredError" } {
  return hasTypeName(val, "InvitationRequiredError");
}

export type NarrowToInvitationRequiredError<T> = T extends {
  __typename?: "InvitationRequiredError";
}
  ? T
  : never;

export function isInviteCode(
  val: unknown
): val is { __typename?: "InviteCode" } {
  return hasTypeName(val, "InviteCode");
}

export type NarrowToInviteCode<T> = T extends { __typename?: "InviteCode" }
  ? T
  : never;

export function isInviteCodeList(
  val: unknown
): val is { __typename?: "InviteCodeList" } {
  return hasTypeName(val, "InviteCodeList");
}

export type NarrowToInviteCodeList<T> = T extends {
  __typename?: "InviteCodeList";
}
  ? T
  : never;

export function isLoginFailureResponse(
  val: unknown
): val is { __typename?: "LoginFailureResponse" } {
  return hasTypeName(val, "LoginFailureResponse");
}

export type NarrowToLoginFailureResponse<T> = T extends {
  __typename?: "LoginFailureResponse";
}
  ? T
  : never;

export function isLoginSuccessResponse(
  val: unknown
): val is { __typename?: "LoginSuccessResponse" } {
  return hasTypeName(val, "LoginSuccessResponse");
}

export type NarrowToLoginSuccessResponse<T> = T extends {
  __typename?: "LoginSuccessResponse";
}
  ? T
  : never;

export function isMutation(val: unknown): val is { __typename?: "Mutation" } {
  return hasTypeName(val, "Mutation");
}

export type NarrowToMutation<T> = T extends { __typename?: "Mutation" }
  ? T
  : never;

export function isNotAuthenticatedError(
  val: unknown
): val is { __typename?: "NotAuthenticatedError" } {
  return hasTypeName(val, "NotAuthenticatedError");
}

export type NarrowToNotAuthenticatedError<T> = T extends {
  __typename?: "NotAuthenticatedError";
}
  ? T
  : never;

export function isNotAuthorizedError(
  val: unknown
): val is { __typename?: "NotAuthorizedError" } {
  return hasTypeName(val, "NotAuthorizedError");
}

export type NarrowToNotAuthorizedError<T> = T extends {
  __typename?: "NotAuthorizedError";
}
  ? T
  : never;

export function isNotFoundError(
  val: unknown
): val is { __typename?: "NotFoundError" } {
  return hasTypeName(val, "NotFoundError");
}

export type NarrowToNotFoundError<T> = T extends {
  __typename?: "NotFoundError";
}
  ? T
  : never;

export function isQuery(val: unknown): val is { __typename?: "Query" } {
  return hasTypeName(val, "Query");
}

export type NarrowToQuery<T> = T extends { __typename?: "Query" } ? T : never;

export function isRequestPasswordResetReceivedResponse(
  val: unknown
): val is { __typename?: "RequestPasswordResetReceivedResponse" } {
  return hasTypeName(val, "RequestPasswordResetReceivedResponse");
}

export type NarrowToRequestPasswordResetReceivedResponse<T> = T extends {
  __typename?: "RequestPasswordResetReceivedResponse";
}
  ? T
  : never;

export function isResetPasswordSuccessResponse(
  val: unknown
): val is { __typename?: "ResetPasswordSuccessResponse" } {
  return hasTypeName(val, "ResetPasswordSuccessResponse");
}

export type NarrowToResetPasswordSuccessResponse<T> = T extends {
  __typename?: "ResetPasswordSuccessResponse";
}
  ? T
  : never;

export function isRole(val: unknown): val is { __typename?: "Role" } {
  return hasTypeName(val, "Role");
}

export type NarrowToRole<T> = T extends { __typename?: "Role" } ? T : never;

export function isRoleList(val: unknown): val is { __typename?: "RoleList" } {
  return hasTypeName(val, "RoleList");
}

export type NarrowToRoleList<T> = T extends { __typename?: "RoleList" }
  ? T
  : never;

export function isSpecies(val: unknown): val is { __typename?: "Species" } {
  return hasTypeName(val, "Species");
}

export type NarrowToSpecies<T> = T extends { __typename?: "Species" }
  ? T
  : never;

export function isSpeciesList(
  val: unknown
): val is { __typename?: "SpeciesList" } {
  return hasTypeName(val, "SpeciesList");
}

export type NarrowToSpeciesList<T> = T extends { __typename?: "SpeciesList" }
  ? T
  : never;

export function isSpeciesVariant(
  val: unknown
): val is { __typename?: "SpeciesVariant" } {
  return hasTypeName(val, "SpeciesVariant");
}

export type NarrowToSpeciesVariant<T> = T extends {
  __typename?: "SpeciesVariant";
}
  ? T
  : never;

export function isTrait(val: unknown): val is { __typename?: "Trait" } {
  return hasTypeName(val, "Trait");
}

export type NarrowToTrait<T> = T extends { __typename?: "Trait" } ? T : never;

export function isTraitList(val: unknown): val is { __typename?: "TraitList" } {
  return hasTypeName(val, "TraitList");
}

export type NarrowToTraitList<T> = T extends { __typename?: "TraitList" }
  ? T
  : never;

export function isTraitListEntry(
  val: unknown
): val is { __typename?: "TraitListEntry" } {
  return hasTypeName(val, "TraitListEntry");
}

export type NarrowToTraitListEntry<T> = T extends {
  __typename?: "TraitListEntry";
}
  ? T
  : never;

export function isUrlResponse(
  val: unknown
): val is { __typename?: "UrlResponse" } {
  return hasTypeName(val, "UrlResponse");
}

export type NarrowToUrlResponse<T> = T extends { __typename?: "UrlResponse" }
  ? T
  : never;

export function isUserAlreadyHasRoleError(
  val: unknown
): val is { __typename?: "UserAlreadyHasRoleError" } {
  return hasTypeName(val, "UserAlreadyHasRoleError");
}

export type NarrowToUserAlreadyHasRoleError<T> = T extends {
  __typename?: "UserAlreadyHasRoleError";
}
  ? T
  : never;

export function isValidationConstraint(
  val: unknown
): val is { __typename?: "ValidationConstraint" } {
  return hasTypeName(val, "ValidationConstraint");
}

export type NarrowToValidationConstraint<T> = T extends {
  __typename?: "ValidationConstraint";
}
  ? T
  : never;

export function isValidationError(
  val: unknown
): val is { __typename?: "ValidationError" } {
  return hasTypeName(val, "ValidationError");
}

export type NarrowToValidationError<T> = T extends {
  __typename?: "ValidationError";
}
  ? T
  : never;

export enum ObjectType {
  Account = "Account",
  Community = "Community",
  CommunityInvitation = "CommunityInvitation",
  CommunityInvitationList = "CommunityInvitationList",
  CommunityList = "CommunityList",
  CommunityMember = "CommunityMember",
  Critter = "Critter",
  CritterList = "CritterList",
  CritterTraitValue = "CritterTraitValue",
  DeleteResponse = "DeleteResponse",
  DuplicateError = "DuplicateError",
  EnumValue = "EnumValue",
  EnumValueSetting = "EnumValueSetting",
  Identity = "Identity",
  IdentityList = "IdentityList",
  InvalidArgumentError = "InvalidArgumentError",
  InvitationRequiredError = "InvitationRequiredError",
  InviteCode = "InviteCode",
  InviteCodeList = "InviteCodeList",
  LoginFailureResponse = "LoginFailureResponse",
  LoginSuccessResponse = "LoginSuccessResponse",
  Mutation = "Mutation",
  NotAuthenticatedError = "NotAuthenticatedError",
  NotAuthorizedError = "NotAuthorizedError",
  NotFoundError = "NotFoundError",
  Query = "Query",
  RequestPasswordResetReceivedResponse = "RequestPasswordResetReceivedResponse",
  ResetPasswordSuccessResponse = "ResetPasswordSuccessResponse",
  Role = "Role",
  RoleList = "RoleList",
  Species = "Species",
  SpeciesList = "SpeciesList",
  SpeciesVariant = "SpeciesVariant",
  Trait = "Trait",
  TraitList = "TraitList",
  TraitListEntry = "TraitListEntry",
  UrlResponse = "UrlResponse",
  UserAlreadyHasRoleError = "UserAlreadyHasRoleError",
  ValidationConstraint = "ValidationConstraint",
  ValidationError = "ValidationError",
}

export function isBaseError(val: any): val is {
  __typename?:
    | "DuplicateError"
    | "InvalidArgumentError"
    | "InvitationRequiredError"
    | "NotAuthenticatedError"
    | "NotAuthorizedError"
    | "NotFoundError"
    | "UserAlreadyHasRoleError";
} {
  return (
    val &&
    val.__typename &&
    (val.__typename === "DuplicateError" ||
      val.__typename === "InvalidArgumentError" ||
      val.__typename === "InvitationRequiredError" ||
      val.__typename === "NotAuthenticatedError" ||
      val.__typename === "NotAuthorizedError" ||
      val.__typename === "NotFoundError" ||
      val.__typename === "UserAlreadyHasRoleError")
  );
}
