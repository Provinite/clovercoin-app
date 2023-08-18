# DUMMY VERSION

- Adds yumminess

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
