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
