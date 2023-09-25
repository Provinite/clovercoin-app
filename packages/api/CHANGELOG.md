# 5.0.1

- Fixes the application crashing when removing a trait from a species variant

# 5.0.0

- Logging in is done by email & password instead of username & password
- Invite codes can now optionally be assigned a community role
  - When the code is claimed, the new identity that is created will be created with a community membership w/ the specified role
- Added a new entity, Community Invitations
  - Community Invitations are sent by community managers to users in the
    system that are not in their community. An invitation is like an invite
    code for people that already have accounts.
- Adds some new mutations:
  - `createRole`
  - `modifyRole`
  - `createCommunityInvite`
  - `answerCommunityInvite`
  - `createCommunityMember`
  - `deleteCommunityMember`
  - `modifyIdentity`
- Implements permissions/authorization
- Each permission is associated with a particular entity in the system
  - Global Permissions are attached to a user's identity and are generally used for site-admin level permissions that very few users will have.
    - `canCreateCommunity` - Create new communities
    - `canListIdentities` - Allowed to read the global users list
    - `canListInviteCodes` - Allowed to read the list of invite codes
    - `canCreateInviteCode` - Allowed to create an invite code
    - `canGrantGlobalPermission`- Allowed to manage global permission for all other users.
  - Community Permissions are attached to a `Role` and a user may have one or more roles per community.
    - `canCreateSpecies` - Create a species in this community
    - `canCreateCritter` - Create a critter in any species in this community
    - `canEditCritter` - Edit any critter in any species in this community
    - `canEditSpecies` - Edit any species in this community (name, images, traits, variants, etc)
    - `canCreateRole` - Create a role with any permissions in this community
    - `canEditRole` - Updatea any role in this community to have any permissions
  - Critter permissions are scoped to a particular critter
    - `canEditOwn`
      - This is a special permission that is not stored in the database, but instead all users have this permission if they own the target critter.
  - Identity Permissions are used to control if users can perform actions on behalf of a particular user (including themselves)
    - `canViewPendingInvites` - View a user's pending community invitaitons. Users can view their own
    - `canAnswerInvites` - Answer community invites (accept/decline) for a user. Users can answer their own
    - `canViewEmail` - Control whether a user can see another user's email. This is limited strictly to staff/"super-admins", as well as users viewing their own.
- Permissions for:
  - Mutations
    - `createCommunity`: `global.canCreateCommunity`
    - `createCritter`: `community.canCreateCritter`
    - `modifyCritter`: `community.canEditCritter`
    - `deleteEnumValueSetting`: `community.canEditSpecies`
      - Dev's Note: This mutation is used to remove an option from a variant's dropdown trait choices
    - `createEnumValueSetting`: `community.canEditSpecies`
      - Dev's Note: This mutation is used to add an option to a variant's dropdown trait choices
    - `createInviteCode`: `global.canCreateInviteCode`
    - `createSpecies`: `community.canCreateSpecies`
    - `createSpeciesImageUploadUrl`: `community.canEditSpecies`
      - Dev's Note: This mutation is used to upload a cover image for a species
    - `createSpeciesVariant`: `community.canEditSpecies`
    - `createTrait`: `community.canEditSpecies`
    - `deleteTrait`: `community.canEditSpecies`
    - `modifyTrait`: `community.canEditSpecies`
    - `createTraitListEntry`: `community.canEditSpecies`
      - Dev's Note: This mutation is used to add a trait to a species variant
    - `deleteTraitlistEntry`: `community.canEditSpecies`
      - Dev's Note: This mutation is used to remove a trait from a species variant
    - `modifyTraitListEntry`: `community.canEditSpecies`
      - Dev's Note: This mutation is used to change the configuration of a trait for a species variant. Includes such options as default values, and whether a trait is optional or required.
    - `createRole`: `community.createRole`
    - `modifyRole`: `community.modifyRole`
    - `login`: No permissions
    - `register`: No permissions
    - `requestPasswordReset`: No permissions
    - `modifyIdentity`: `global.canGrantGlobalPermissions`
    - `createCommunityInvite`: `community.canCreateInviteCode`
    - `answerCommunityInvite`: `*`
  - Queries
    - `identities`: `global.canListIdentities`
    - `inviteCodes`: `global.canListInviteCodes`
    - `traits`: `community.*`
    - Fields
      - `identity.roles`: `community.*`
      - `identity.email`
        - `identity.canViewEmail`
        - `global.canListIdentities`
- Added controller-enforced filtering rules. These rules are applied to every operation. So a filter can prevent reading something (eg, looking at critters in communities you don't have access to), and it can also prevent updating or creating something (eg: can't create things in a community you're not in because from your perspective it does not exist).
  - Community:
    - Filtered to communities in which the user has any role
  - Critter:
    - Filtered to critters in communities in which the user has any role
  - Species
    - Filtered to species in communities in which the user has any role
- Makes the `stack` property on `BaseError` enumerable, resulting in stacktraces on every error logged

# 4.0.0

- Adds the `NotAuthorizedError` type
- Renames `TraitList`s to `SpeciesVariant`s
  - This includes updating the schema and codebase
- Updates all references to `traitList`, `traitListId`, `traitLists` throughout other models to reference species variants instead
  - Updates schema and code
- All queries and mutations that require authentication may now return a `NotAuthorizedError`
- Enables authentication for the following mutations
  - `createCommunity`
  - `createCritter`
  - `modifyCritter`
  - `createInviteCode`
  - `createSpecies`
  - `createSpeciesImageUploadUrl`
  - `createTrait`
  - `deleteTrait`
  - `modifyTrait`
- Enables authentication for the following queries
  - `community`
  - `critters`
  - `identities`
  - `inviteCodes`
  - `species`
- The `deleteTrait` mutation has had its response and inputs types changed to be standardized with the rest of the API
- Added a new `TraitList` type in line with the rest of our gql `${Model}List` types
- Renamed all `TraitList*` types (inputs, outputs) to `SpeciesVariant` equivalent
- Added a new `IdentityList` response type
- Identity list query now provides `IdentityList`
- Added gql project for seed scripts
- Updates seed scripts for compaitibility with new API
- Converted all seed scripts to ts rather than mts due to incompatibility with graphql cli validate
- Enables STARTTLS for SES
- Enforces naming of various autogenerated `UQ_` and `FK_` constraints to keep them stable throughout refactors
- Simplifies the `@ManyToOneField` decorator somewhat

# 3.1.0

- Adds SMTP mail support and enables it in AWS
  - This should resolve an issue that was preventing password reset emails from going out
- Adds newly required env vars to API & Migrate lambdas
- Adds a super light caching layer to secrets fetching to reduce calls to allow for lazy secrets

# 3.0.1

- Hotfix: Adds missing environment variables to migrate container

# 3.0.0

- Adds `requestPasswordReset` mutation
- Adds `resetPassword` mutation
- **Breaking Change** Adds SES integration for email support.
  - **Breaking Change** New required env var: `CC_AWS_SES_FROM_ADDRESS`
  - **Breaking Change** New required env var: `CC_WEB_CLIENT_ORIGIN`
  - Adds permissions for the API IAM user to send emails
  - Adds `CC_AWS_SES_FROM_ADDRESS`, `CC_WEB_CLIENT_ORIGIN`, `CC_ENV_NAME`, `CC_APP_NAME` to terraform deployment
- Adds auto-generated environment variable documentation
- Adds support for password reset tokens via the aforementioned mutations
- Adds email

# 2.0.0

- Adds support for invite codes
- Makes invite codes mandatory when registering
- Fixes a bug that caused "creates" to be conflated with "updates" on all actions
- Adds a CC_ADMIN_EMAIL env var to assist in bootstrapping the first admin user in a new environment.
- **Breaking Change** Updates seed scripts to require a CC_ADMIN_EMAIL

# 1.3.0

- feat(api): add identities query

# 1.2.0

- feat(api): add seed scripts
- feat(api): add util scripts
- perf(api): add GIN index on traitValues
- feat(api): implement login
- feat(api): implement registration
- feat(api): add "Authorization" header to cors middleware
- feat(api): refactor critter trait values to improve performance
- feat(api): implement critter creation
- feat(api): implement critter updating

# 1.1.9

- chore(api): add changelog
- feat(api): add migration script
