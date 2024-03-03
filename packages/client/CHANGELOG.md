# 4.1.1

- Improved performance of global users list [[#50](https://github.com/Provinite/clovercoin-app/issues/50)]

# 4.1.0

- Added confirmation to community creation [#51](https://github.com/Provinite/clovercoin-app/issues/51)

# 4.0.0

- Login page now requests email address instead of username
- Added community settings page with:
  - Role management (setting permissions for roles)
  - User management (setting roles for users)
  - Invitation support (invite users to your community)
  - Community-direct invite codes (invite NEW users directly to your community!)
    - Community managers can now create invite codes that will join a user directly to their community with a specific role
- Added error message support for `UnauthorizedError` response
  - Users will get a nice "access denied" type toast instead of the app crashing
- Added error handling for `NotAuthenticatedError`s
  - Bounces the user to the login page and forces a new login
  - Includes a nice toast explaining what happened
  - Dev note: This error is returned when a user that is not logged in tries
    to do something sensitive.
- Added graceful degredation of functionality for reduced permissions throughout the app
- Fixed a bug that caused type narrowing for API responses to not always work
- Refactored all toast (snackbar) usage to use a single global snackbar.
  - This will make the toast behavior much more consistent across the application
    and ensure a nice UX that expresses that the entire applicaiton is one system.
- Added titles to all pages so bookmarks will be more useful
- Added a call to destroy the apollo store on logout. This ensures that no
  sensitive cached data is left laying around after a logout.
- Improved type-safety for using loader data in the app
  - Made `useRouteXXX` hooks have `| undefined` return types
  - Added `useRouteXXXOrFail` which will throw an error if the data isn't available

# 3.3.0

- Refactored all API usage to support CC API v4.0.0 auth changes
- Any time a `NotAuthorizedError` is received, the user will be forcibly logged out and redirected to the login page.

# 2.4.0

- Added an about page with a basic FAQ

# 2.3.0

- Users can now reset their passwords in the application
  - Adds a `/forgot-password` route, can be used to request a password reset email
  - Adds a `/reset-password` route, used to reset password, linked from your email

# 2.2.0

- Adds a mandatory invitation code field to registration
- Adds an invitation code list to the admin page
- Adds the ability to create invite codes to the admin page

# 2.1.0

- feat(client/admin): add users list

# 2.0.0

- feat(client): add critter creation
- feat(client): add critter editing
- feat(client): add authentication support
- feat(client): lock most routes behind login
- feat(client): implement login, registration flows
- feat(client): add a basic critter list
- feat(client): add slug conversion util script

# 1.0.0

- initial release
