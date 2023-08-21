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
