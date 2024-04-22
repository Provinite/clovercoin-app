/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Account = {
  __typename?: 'Account';
  id: Scalars['ID']['output'];
  identity: Identity;
  identityId: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type BaseError = {
  message: Scalars['String']['output'];
};

export type CommunitiesResponse = CommunityList | InvalidArgumentError;

export type Community = {
  __typename?: 'Community';
  id: Scalars['ID']['output'];
  members: CommunityMembersResponse;
  name: Scalars['String']['output'];
  roles: Array<Role>;
};

export type CommunityCreateInput = {
  name: Scalars['String']['input'];
};

export type CommunityFilters = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CommunityInvitation = {
  __typename?: 'CommunityInvitation';
  accepted: Scalars['Boolean']['output'];
  declined: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  /** The identity of the user that is being invited */
  invitee: Identity;
  inviteeId: Scalars['ID']['output'];
  /** The identity of the user that is extending the invitation */
  inviter: Identity;
  inviterId: Scalars['ID']['output'];
  /** The role to grant when the invitation is accepted */
  role: Role;
  roleId: Scalars['ID']['output'];
};

export type CommunityInvitationAnswerInput = {
  accept: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
};

export type CommunityInvitationAnswerResponse = CommunityInvitation | InvalidArgumentError | NotAuthenticatedError | NotAuthorizedError | NotFoundError;

export type CommunityInvitationCreateInput = {
  emailAddress: Scalars['String']['input'];
  roleId: Scalars['ID']['input'];
};

export type CommunityInvitationCreateResponse = CommunityInvitation | DuplicateError | InvalidArgumentError | NotAuthenticatedError | NotAuthorizedError | NotFoundError | UserAlreadyHasRoleError;

export type CommunityInvitationList = {
  __typename?: 'CommunityInvitationList';
  list: Array<CommunityInvitation>;
};

export type CommunityList = {
  __typename?: 'CommunityList';
  list: Array<Community>;
};

export type CommunityMember = {
  __typename?: 'CommunityMember';
  id: Scalars['ID']['output'];
  identity: Identity;
  identityId: Scalars['ID']['output'];
  role: Role;
  roleId: Scalars['ID']['output'];
};

export type CommunityMemberCreateInput = {
  identityId: Scalars['ID']['input'];
  roleId: Scalars['ID']['input'];
};

export type CommunityMemberCreateResponse = CommunityMember | DuplicateError | InvalidArgumentError | InvitationRequiredError | NotAuthenticatedError | NotAuthorizedError | NotFoundError;

export type CommunityMemberDeleteInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  identityId?: InputMaybe<Scalars['ID']['input']>;
  roleId?: InputMaybe<Scalars['ID']['input']>;
};

export type CommunityMemberDeleteResponse = DeleteResponse | InvalidArgumentError | NotAuthenticatedError | NotAuthorizedError | NotFoundError;

export type CommunityMembersResponse = IdentityList | NotAuthorizedError;

export type CommunityResponse = Community | InvalidArgumentError | NotAuthenticatedError | NotAuthorizedError | NotFoundError;

export type CreateCommunityResponse = Community | DuplicateError | InvalidArgumentError | NotAuthenticatedError | NotAuthorizedError;

export type CreateCritterResponse = Critter | DuplicateError | InvalidArgumentError | NotAuthenticatedError | NotAuthorizedError;

export type CreateSpeciesImageUploadUrlResponse = NotAuthenticatedError | NotAuthorizedError | NotFoundError | UrlResponse;

export type Critter = {
  __typename?: 'Critter';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  owner: Identity;
  ownerId: Scalars['ID']['output'];
  species: Species;
  speciesId: Scalars['ID']['output'];
  traitValues: Array<CritterTraitValue>;
  variant: SpeciesVariant;
  variantId: Scalars['ID']['output'];
};

export type CritterCreateInput = {
  name: Scalars['String']['input'];
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  speciesId: Scalars['ID']['input'];
  traitValues: Array<CritterCreateTraitInput>;
  variantId: Scalars['ID']['input'];
};

export type CritterCreateTraitInput = {
  traitId: Scalars['ID']['input'];
  value: Scalars['String']['input'];
};

export type CritterFilters = {
  id?: InputMaybe<Scalars['ID']['input']>;
  speciesId?: InputMaybe<Scalars['ID']['input']>;
};

export type CritterList = {
  __typename?: 'CritterList';
  list: Array<Critter>;
};

export type CritterListResponse = CritterList | InvalidArgumentError | NotAuthenticatedError;

export type CritterModifyInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  traitValues?: InputMaybe<Array<CritterCreateTraitInput>>;
  variantId?: InputMaybe<Scalars['ID']['input']>;
};

export type CritterModifyResponse = Critter | InvalidArgumentError | NotAuthenticatedError | NotAuthorizedError | NotFoundError;

export type CritterTraitValue = {
  __typename?: 'CritterTraitValue';
  traitId: Scalars['ID']['output'];
  value?: Maybe<Scalars['String']['output']>;
};

/** Critter trait value types */
export enum CritterTraitValueType {
  Enum = 'Enum',
  Integer = 'Integer',
  String = 'String',
  Timestamp = 'Timestamp'
}

export type DeleteResponse = {
  __typename?: 'DeleteResponse';
  ok: Scalars['Boolean']['output'];
};

export type DuplicateError = BaseError & {
  __typename?: 'DuplicateError';
  duplicateKeys: Array<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type EnumValue = {
  __typename?: 'EnumValue';
  enumValueSettings: Array<EnumValueSetting>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  trait: Trait;
  traitId: Scalars['ID']['output'];
};

export type EnumValueDeleteInput = {
  id: Scalars['ID']['input'];
};

export type EnumValueSetting = {
  __typename?: 'EnumValueSetting';
  enumValue: EnumValue;
  enumValueId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  speciesVariant: Array<SpeciesVariant>;
  speciesVariantId: Scalars['ID']['output'];
};

export type EnumValueSettingCreateInput = {
  enumValueId: Scalars['ID']['input'];
  speciesVariantId: Scalars['ID']['input'];
};

export type EnumValueSettingDeleteResponse = DeleteResponse | InvalidArgumentError | NotAuthenticatedError | NotAuthorizedError | NotFoundError;

export type Identity = {
  __typename?: 'Identity';
  canCreateCommunity: Scalars['Boolean']['output'];
  canCreateInviteCode: Scalars['Boolean']['output'];
  canGrantGlobalPermissions: Scalars['Boolean']['output'];
  canListIdentities: Scalars['Boolean']['output'];
  canListInviteCodes: Scalars['Boolean']['output'];
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  pendingInvitations: PendingInvitationsResponse;
  roles: IdentityRolesResponse;
};


export type IdentityRolesArgs = {
  filters: IdentityRolesFilters;
};

export type IdentityList = {
  __typename?: 'IdentityList';
  list: Array<Identity>;
};

export type IdentityModifyInput = {
  canCreateCommunity?: InputMaybe<Scalars['Boolean']['input']>;
  canCreateInviteCode?: InputMaybe<Scalars['Boolean']['input']>;
  canGrantGlobalPermissions?: InputMaybe<Scalars['Boolean']['input']>;
  canListIdentities?: InputMaybe<Scalars['Boolean']['input']>;
  canListInviteCodes?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
};

export type IdentityModifyResponse = Identity | InvalidArgumentError | NotAuthenticatedError | NotAuthorizedError | NotFoundError;

export type IdentityRolesFilters = {
  communityId: Scalars['ID']['input'];
};

export type IdentityRolesResponse = InvalidArgumentError | NotAuthorizedError | RoleList;

export type IdentitylistResponse = IdentityList | NotAuthenticatedError | NotAuthorizedError;

/** Acceptable MIME types for images */
export enum ImageContentType {
  Gif = 'Gif',
  Jpg = 'Jpg',
  Png = 'Png'
}

export type InvalidArgumentError = BaseError & {
  __typename?: 'InvalidArgumentError';
  message: Scalars['String']['output'];
  validationErrors: Array<ValidationError>;
};

export type InvitationRequiredError = BaseError & {
  __typename?: 'InvitationRequiredError';
  message: Scalars['String']['output'];
};

export type InviteCode = {
  __typename?: 'InviteCode';
  claimCount: Scalars['Int']['output'];
  creator: Identity;
  creatorId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  maxClaims: Scalars['Int']['output'];
  role?: Maybe<Role>;
  roleId?: Maybe<Scalars['ID']['output']>;
};

export type InviteCodeCreateInput = {
  id: Scalars['ID']['input'];
  maxClaims: Scalars['Int']['input'];
  roleId?: InputMaybe<Scalars['ID']['input']>;
};

export type InviteCodeCreateResponse = DuplicateError | InvalidArgumentError | InviteCode | NotAuthenticatedError | NotAuthorizedError;

export type InviteCodeFilters = {
  communityId?: InputMaybe<Scalars['ID']['input']>;
};

export type InviteCodeList = {
  __typename?: 'InviteCodeList';
  list: Array<InviteCode>;
};

export type InviteCodeResponse = InviteCodeList | NotAuthenticatedError | NotAuthorizedError;

export type LoginArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type LoginFailureResponse = {
  __typename?: 'LoginFailureResponse';
  message: Scalars['String']['output'];
};

export type LoginResponse = InvalidArgumentError | LoginFailureResponse | LoginSuccessResponse;

export type LoginSuccessResponse = {
  __typename?: 'LoginSuccessResponse';
  account: Account;
  identity: Identity;
  token: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
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
};


export type MutationAnswerInvitationArgs = {
  input: CommunityInvitationAnswerInput;
};


export type MutationCreateCommunityArgs = {
  input: CommunityCreateInput;
};


export type MutationCreateCommunityInvitationArgs = {
  input: CommunityInvitationCreateInput;
};


export type MutationCreateCommunityMemberArgs = {
  input: CommunityMemberCreateInput;
};


export type MutationCreateCritterArgs = {
  input: CritterCreateInput;
};


export type MutationCreateEnumValueSettingArgs = {
  input: EnumValueSettingCreateInput;
};


export type MutationCreateInviteCodeArgs = {
  input: InviteCodeCreateInput;
};


export type MutationCreateRoleArgs = {
  input: RoleCreateInput;
};


export type MutationCreateSpeciesArgs = {
  input: SpeciesCreateInput;
};


export type MutationCreateSpeciesImageUploadUrlArgs = {
  input: SpeciesImageUrlCreateInput;
};


export type MutationCreateSpeciesVariantArgs = {
  input: SpeciesVariantCreateInput;
};


export type MutationCreateTraitArgs = {
  input: TraitCreateInput;
};


export type MutationCreateTraitListEntryArgs = {
  input: TraitListEntryCreateInput;
};


export type MutationDeleteCommunityMemberArgs = {
  input: CommunityMemberDeleteInput;
};


export type MutationDeleteEnumValueSettingArgs = {
  input: EnumValueDeleteInput;
};


export type MutationDeleteTraitArgs = {
  input: TraitDeleteInput;
};


export type MutationDeleteTraitListEntryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginArgs;
};


export type MutationModifyCritterArgs = {
  input: CritterModifyInput;
};


export type MutationModifyIdentityArgs = {
  input: IdentityModifyInput;
};


export type MutationModifyRoleArgs = {
  input: RoleModifyInput;
};


export type MutationModifyTraitArgs = {
  input: TraitModifyInput;
};


export type MutationModifyTraitListEntryArgs = {
  input: TraitListEntryModifyInput;
};


export type MutationRegisterArgs = {
  input: RegisterArgs;
};


export type MutationRequestPasswordResetArgs = {
  input: RequestPasswordResetInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};

/** This error indicates that the associated field requires authentication and no valid authentication was provided. */
export type NotAuthenticatedError = BaseError & {
  __typename?: 'NotAuthenticatedError';
  message: Scalars['String']['output'];
};

/** This error indicates the associated field requires permissions that the requestor does not posess. */
export type NotAuthorizedError = BaseError & {
  __typename?: 'NotAuthorizedError';
  message: Scalars['String']['output'];
};

export type NotFoundError = BaseError & {
  __typename?: 'NotFoundError';
  message: Scalars['String']['output'];
};

export type PendingInvitationsResponse = CommunityInvitationList | NotAuthorizedError;

export type Query = {
  __typename?: 'Query';
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
};


export type QueryCommunitiesArgs = {
  filters: CommunityFilters;
};


export type QueryCommunityArgs = {
  filters: CommunityFilters;
};


export type QueryCrittersArgs = {
  filters: CritterFilters;
};


export type QueryInviteCodesArgs = {
  filters: InviteCodeFilters;
};


export type QuerySpeciesArgs = {
  filters?: InputMaybe<SpeciesFilters>;
};


export type QueryTraitsArgs = {
  filters: TraitFilters;
};

export type RegisterArgs = {
  email: Scalars['String']['input'];
  inviteCodeId: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type RegisterResponse = DuplicateError | InvalidArgumentError | LoginSuccessResponse;

export type RequestPasswordResetInput = {
  email: Scalars['String']['input'];
};

export type RequestPasswordResetReceivedResponse = {
  __typename?: 'RequestPasswordResetReceivedResponse';
  message: Scalars['String']['output'];
};

export type RequestPasswordResetResponse = InvalidArgumentError | RequestPasswordResetReceivedResponse;

export type ResetPasswordInput = {
  password: Scalars['String']['input'];
  token: Scalars['ID']['input'];
};

export type ResetPasswordResponse = InvalidArgumentError | ResetPasswordSuccessResponse;

export type ResetPasswordSuccessResponse = {
  __typename?: 'ResetPasswordSuccessResponse';
  success: Scalars['Boolean']['output'];
};

export type Role = {
  __typename?: 'Role';
  canCreateCritter: Scalars['Boolean']['output'];
  canCreateInviteCode: Scalars['Boolean']['output'];
  canCreateRole: Scalars['Boolean']['output'];
  canCreateSpecies: Scalars['Boolean']['output'];
  canEditCritter: Scalars['Boolean']['output'];
  canEditRole: Scalars['Boolean']['output'];
  canEditSpecies: Scalars['Boolean']['output'];
  canListInviteCodes: Scalars['Boolean']['output'];
  community: Community;
  communityId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type RoleCreateInput = {
  canCreateCritter?: InputMaybe<Scalars['Boolean']['input']>;
  canCreateInviteCode?: InputMaybe<Scalars['Boolean']['input']>;
  canCreateRole?: InputMaybe<Scalars['Boolean']['input']>;
  canCreateSpecies?: InputMaybe<Scalars['Boolean']['input']>;
  canEditCritter?: InputMaybe<Scalars['Boolean']['input']>;
  canEditRole?: InputMaybe<Scalars['Boolean']['input']>;
  canEditSpecies?: InputMaybe<Scalars['Boolean']['input']>;
  canListInviteCodes?: InputMaybe<Scalars['Boolean']['input']>;
  communityId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type RoleCreateResponse = DuplicateError | InvalidArgumentError | NotAuthenticatedError | NotAuthorizedError | Role;

export type RoleList = {
  __typename?: 'RoleList';
  list: Array<Role>;
};

export type RoleModifyInput = {
  canCreateCritter?: InputMaybe<Scalars['Boolean']['input']>;
  canCreateInviteCode?: InputMaybe<Scalars['Boolean']['input']>;
  canCreateRole?: InputMaybe<Scalars['Boolean']['input']>;
  canCreateSpecies?: InputMaybe<Scalars['Boolean']['input']>;
  canEditCritter?: InputMaybe<Scalars['Boolean']['input']>;
  canEditRole?: InputMaybe<Scalars['Boolean']['input']>;
  canEditSpecies?: InputMaybe<Scalars['Boolean']['input']>;
  canListInviteCodes?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type RoleModifyResponse = DuplicateError | InvalidArgumentError | NotAuthenticatedError | NotAuthorizedError | Role;

/** Model representing an arbitrarily broad class of characters that use common variants and administration. */
export type Species = {
  __typename?: 'Species';
  /** Community that owns this species */
  community: Community;
  /** ID of the community that owns this species */
  communityId: Scalars['ID']['output'];
  critters: Array<Critter>;
  hasImage: Scalars['String']['output'];
  /** Icon URL for this species */
  iconUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** Name of the species */
  name: Scalars['String']['output'];
  variants: Array<SpeciesVariant>;
};

export type SpeciesCreateInput = {
  communityId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type SpeciesCreateResponse = DuplicateError | InvalidArgumentError | NotAuthenticatedError | NotAuthorizedError | NotFoundError | Species;

export type SpeciesFilters = {
  communityId: Scalars['ID']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type SpeciesImageUrlCreateInput = {
  contentType: ImageContentType;
  speciesId: Scalars['ID']['input'];
};

export type SpeciesList = {
  __typename?: 'SpeciesList';
  list: Array<Species>;
};

export type SpeciesResponse = InvalidArgumentError | NotAuthenticatedError | SpeciesList;

export type SpeciesVariant = {
  __typename?: 'SpeciesVariant';
  enumValueSettings: Array<EnumValueSetting>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  species: Species;
  speciesId: Scalars['ID']['output'];
  traitListEntries: Array<TraitListEntry>;
};

export type SpeciesVariantCreateInput = {
  name: Scalars['String']['input'];
  speciesId: Scalars['ID']['input'];
};

export type SpeciesVariantCreateResponse = DuplicateError | InvalidArgumentError | NotAuthenticatedError | NotAuthorizedError | NotFoundError | SpeciesVariant;

export type Trait = {
  __typename?: 'Trait';
  enumValues: Array<EnumValue>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  species: Species;
  valueType: CritterTraitValueType;
};

export type TraitCreateEnumValueInput = {
  name: Scalars['String']['input'];
  order: Scalars['Float']['input'];
};

export type TraitCreateInput = {
  enumValues: Array<TraitCreateEnumValueInput>;
  name: Scalars['String']['input'];
  speciesId: Scalars['ID']['input'];
  valueType: CritterTraitValueType;
};

export type TraitCreateResponse = DuplicateError | InvalidArgumentError | NotAuthenticatedError | NotAuthorizedError | Trait;

export type TraitDeleteInput = {
  id: Scalars['ID']['input'];
};

export type TraitDeleteResponse = DeleteResponse | InvalidArgumentError | NotAuthenticatedError | NotAuthorizedError | NotFoundError;

export type TraitFilters = {
  speciesId: Scalars['ID']['input'];
};

export type TraitList = {
  __typename?: 'TraitList';
  list: Array<Trait>;
};

export type TraitListEntry = {
  __typename?: 'TraitListEntry';
  defaultDisplayValue?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  order: Scalars['Int']['output'];
  required: Scalars['Boolean']['output'];
  speciesVariant: SpeciesVariant;
  speciesVariantId: Scalars['ID']['output'];
  trait: Trait;
  traitId: Scalars['ID']['output'];
  valueType: CritterTraitValueType;
};

/** Input object for creating a new TraitListEntry */
export type TraitListEntryCreateInput = {
  order: Scalars['Int']['input'];
  required?: InputMaybe<Scalars['Boolean']['input']>;
  speciesVariantId: Scalars['ID']['input'];
  traitId: Scalars['ID']['input'];
};

export type TraitListEntryCreateResponse = DuplicateError | InvalidArgumentError | NotAuthenticatedError | NotAuthorizedError | NotFoundError | TraitListEntry;

export type TraitListEntryDeleteResponse = DeleteResponse | InvalidArgumentError | NotAuthenticatedError | NotAuthorizedError | NotFoundError;

/** Input object for modifying a TraitListEntry */
export type TraitListEntryModifyInput = {
  id: Scalars['ID']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
  required?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TraitListEntryModifyResponse = InvalidArgumentError | NotAuthenticatedError | NotAuthorizedError | NotFoundError | TraitListEntry;

export type TraitListResponse = NotAuthenticatedError | NotAuthorizedError | NotFoundError | TraitList;

export type TraitModifyEnumValueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  order: Scalars['Float']['input'];
};

export type TraitModifyInput = {
  enumValues?: InputMaybe<Array<TraitModifyEnumValueInput>>;
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  valueType: CritterTraitValueType;
};

export type TraitModifyResponse = DuplicateError | InvalidArgumentError | NotAuthenticatedError | NotAuthorizedError | NotFoundError | Trait;

export type UrlResponse = {
  __typename?: 'UrlResponse';
  url: Scalars['String']['output'];
};

export type UserAlreadyHasRoleError = BaseError & {
  __typename?: 'UserAlreadyHasRoleError';
  message: Scalars['String']['output'];
};

export type ValidationConstraint = {
  __typename?: 'ValidationConstraint';
  description: Scalars['String']['output'];
  key: Scalars['String']['output'];
};

export type ValidationError = {
  __typename?: 'ValidationError';
  constraints: Array<ValidationConstraint>;
  field: Scalars['String']['output'];
};

export type EnumValueSettingCreateResponse = DuplicateError | EnumValueSetting | InvalidArgumentError | NotAuthenticatedError | NotAuthorizedError | NotFoundError;

export type MeIntegrationQueryQueryVariables = Exact<{
  roleFilters: IdentityRolesFilters;
}>;


export type MeIntegrationQueryQuery = { __typename?: 'Query', me: { __typename?: 'Identity', id: string, roles: { __typename: 'InvalidArgumentError' } | { __typename: 'NotAuthorizedError' } | { __typename: 'RoleList', list: Array<{ __typename?: 'Role', id: string, communityId: string }> } } };

export type CreateCommunityMutationVariables = Exact<{
  input: CommunityCreateInput;
}>;


export type CreateCommunityMutation = { __typename?: 'Mutation', createCommunity: { __typename: 'Community', id: string } | { __typename: 'DuplicateError' } | { __typename: 'InvalidArgumentError' } | { __typename: 'NotAuthenticatedError' } | { __typename: 'NotAuthorizedError' } };

export type LoginMutationVariables = Exact<{
  input: LoginArgs;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename: 'InvalidArgumentError' } | { __typename: 'LoginFailureResponse' } | { __typename: 'LoginSuccessResponse', token: string, identity: { __typename?: 'Identity', id: string } } };

export type RegisterMutationVariables = Exact<{
  input: RegisterArgs;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename: 'DuplicateError' } | { __typename: 'InvalidArgumentError' } | { __typename: 'LoginSuccessResponse', token: string, identity: { __typename?: 'Identity', id: string } } };


export const MeIntegrationQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"meIntegrationQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roleFilters"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IdentityRolesFilters"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roleFilters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RoleList"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"communityId"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<MeIntegrationQueryQuery, MeIntegrationQueryQueryVariables>;
export const CreateCommunityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createCommunity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CommunityCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCommunity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Community"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateCommunityMutation, CreateCommunityMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LoginSuccessResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LoginSuccessResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"identity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;