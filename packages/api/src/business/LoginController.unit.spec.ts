import { v4 } from "uuid";
import { InvalidArgumentError } from "../errors/InvalidArgumentError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { AppGraphqlContext } from "../graphql/AppGraphqlContext.js";
import { Account } from "../models/Account/Account.js";
import { createMockAccount } from "../models/Account/Account.mock.js";
import { Identity } from "../models/Identity/Identity.js";
import { createMockIdentity } from "../models/Identity/Identity.mock.js";
import { InviteCode } from "../models/InviteCode/InviteCode.js";
import { createMockInviteCode } from "../models/InviteCode/InviteCode.mock.js";
import { InviteCodeExhaustedError } from "../models/InviteCode/InviteCodeConsumedError.js";
import { createTestContainer } from "../test/createTestContainer.js";
import { getError } from "../test/getError.js";
import { verifyJwt } from "../util/jwt/verifyJwt.js";
import { LoginController } from "./LoginController.js";
jest.mock("../util/jwt/jwtSecret.js");

describe("controller:LoginController", () => {
  let ctx: AppGraphqlContext;
  let loginController: LoginController;
  let identityController: AppGraphqlContext["identityController"];
  let accountController: AppGraphqlContext["accountController"];
  let identity: Identity;
  let account: Account;
  const username = "mock-username";
  const password = "mock-password";
  const adminEmail = "admin@example.com";

  beforeEach(() => {
    const container = createTestContainer({
      transactionProvider: MockTransactionProvider,
      identityController: MockIdentityController,
      accountController: MockAccountController,
      communityMemberController: MockCommunityMemberController,
      inviteCodeController: MockInviteCodeController,
      loginController: LoginController,
      identityRepository: MockIdentityRepository,
      bootstrapEnvironment: {
        adminEmail,
      },
    });

    ctx = container.cradle;
    ({ loginController, identityController, accountController } = ctx);
  });
  describe("method:register", () => {
    describe("admin email", () => {
      beforeEach(() => {
        identity = createMockIdentity({
          emailAddress: adminEmail,
          globalAdminPermissions: true,
        });
        account = createMockAccount({
          identity: identity,
        });

        jest.spyOn(identityController, "create").mockResolvedValue(identity);
        jest.spyOn(accountController, "create").mockResolvedValue(account);
      });
      it("creates and returns a new identity", async () => {
        const result = await loginController.register(
          username,
          password,
          adminEmail,
          "whocares"
        );
        if (!result.success) {
          throw new Error("expected result.success = true");
        }
        expect(identityController.create).toHaveBeenCalledWith({
          displayName: username,
          email: adminEmail,
          canCreateCommunity: true,
          canListIdentities: true,
          canListInviteCodes: true,
          canGrantGlobalPermissions: true,
          canCreateInviteCode: true,
        });
        expect(result.identity).toBe(identity);
      });
      it("creates and returns a new account", async () => {
        const result = await loginController.register(
          username,
          password,
          adminEmail,
          "whocares"
        );
        if (!result.success) {
          throw new Error("expected result.success = true");
        }
        expect(accountController.create).toHaveBeenCalledWith({
          username,
          password,
          identityId: identity.id,
        });
        expect(result.account).toBe(account);
      });
      it("creates and returns a new auth token", async () => {
        const result = await loginController.register(
          username,
          password,
          adminEmail,
          "whocares"
        );
        if (!result.success) {
          throw new Error("expected result.success = true");
        }
        const { token } = result;
        const decoded = await verifyJwt(token);
        expect(decoded).toEqual(
          expect.objectContaining({
            identity: { displayName: identity.displayName, id: identity.id },
          })
        );
      });
    });
    describe("invited user", () => {
      let inviteCodeController: AppGraphqlContext["inviteCodeController"];
      let inviteCode: InviteCode;
      let communityMemberController: AppGraphqlContext["communityMemberController"];
      const nonAdminEmail = "notanadmin@example.com";
      beforeEach(() => {
        ({ inviteCodeController, communityMemberController } = ctx);

        inviteCode = createMockInviteCode();
        identity = createMockIdentity({
          emailAddress: adminEmail,
          globalAdminPermissions: true,
        });
        account = createMockAccount({
          identity: identity,
        });

        jest.spyOn(identityController, "create").mockResolvedValue(identity);
        jest.spyOn(accountController, "create").mockResolvedValue(account);
        jest
          .spyOn(communityMemberController, "create")
          .mockResolvedValue(null as any);
        jest
          .spyOn(inviteCodeController, "claimInviteCodeOrThrow")
          .mockResolvedValue();
        jest
          .spyOn(inviteCodeController, "findOneByIdOrFail")
          .mockResolvedValue(inviteCode);
      });
      describe("valid invite code", () => {
        it("claims the supplied invite code", async () => {
          const result = await loginController.register(
            username,
            password,
            nonAdminEmail,
            inviteCode.id
          );
          if (result.success !== true) {
            throw new Error("expected result.success === true");
          }
          expect(
            inviteCodeController.claimInviteCodeOrThrow
          ).toHaveBeenCalledWith(inviteCode.id);
          expect(
            inviteCodeController.claimInviteCodeOrThrow
          ).toHaveBeenCalledTimes(1);
          expect(inviteCodeController.findOneByIdOrFail).toHaveBeenCalledTimes(
            1
          );
          expect(inviteCodeController.findOneByIdOrFail).toHaveBeenCalledWith(
            inviteCode.id
          );
        });
        it("creates and returns a new identity", async () => {
          const result = await loginController.register(
            username,
            password,
            nonAdminEmail,
            inviteCode.id
          );
          if (!result.success) {
            throw new Error("expected result.success = true");
          }
          expect(identityController.create).toHaveBeenCalledWith({
            displayName: username,
            email: nonAdminEmail,
            canCreateCommunity: false,
            canListIdentities: false,
            canListInviteCodes: false,
            canGrantGlobalPermissions: false,
            canCreateInviteCode: false,
          });
          expect(result.identity).toBe(identity);
        });
        it("creates and returns a new account", async () => {
          const result = await loginController.register(
            username,
            password,
            nonAdminEmail,
            inviteCode.id
          );
          if (!result.success) {
            throw new Error("expected result.success = true");
          }
          expect(accountController.create).toHaveBeenCalledWith({
            username,
            password,
            identityId: identity.id,
          });
          expect(result.account).toBe(account);
        });
        it("creates and returns a new auth token", async () => {
          const result = await loginController.register(
            username,
            password,
            nonAdminEmail,
            inviteCode.id
          );
          if (!result.success) {
            throw new Error("expected result.success = true");
          }
          const { token } = result;
          const decoded = await verifyJwt(token);
          expect(decoded).toEqual(
            expect.objectContaining({
              identity: { displayName: identity.displayName, id: identity.id },
            })
          );
        });
        it("does not create a community membership for non-role-based invites", async () => {
          inviteCode.roleId = null;
          await loginController.register(
            username,
            password,
            nonAdminEmail,
            inviteCode.id
          );
          expect(communityMemberController.create).not.toHaveBeenCalled();
        });
        it("creates a community membership for role-based invites", async () => {
          inviteCode.roleId = v4();
          await loginController.register(
            username,
            password,
            nonAdminEmail,
            inviteCode.id
          );
          expect(communityMemberController.create).toHaveBeenCalledTimes(1);
          expect(communityMemberController.create).toHaveBeenCalledWith({
            identityId: identity.id,
            roleId: inviteCode.roleId,
          });
        });
      });
      describe("bad invite code", () => {
        describe("unknown code", () => {
          beforeEach(() => {
            jest
              .spyOn(inviteCodeController, "claimInviteCodeOrThrow")
              .mockRejectedValue(new NotFoundError());
          });
          it("rejects", async () => {
            const error = await getError(() =>
              loginController.register(
                username,
                password,
                nonAdminEmail,
                "whatever"
              )
            );
            expect(error).toBeInstanceOf(InvalidArgumentError);
            const err = error as InvalidArgumentError;
            expect(err.validationErrors).toMatchInlineSnapshot(`
              [
                ValidationErrorObject {
                  "constraints": [
                    ValidationConstraint {
                      "description": "Invite code not found",
                      "key": "isValid",
                    },
                  ],
                  "field": "inviteCodeId",
                },
              ]
            `);
          });
          it("does not create an identity", async () => {
            await getError(() =>
              loginController.register(
                username,
                password,
                nonAdminEmail,
                "whatever"
              )
            );
            expect(identityController.create).not.toHaveBeenCalled();
          });
          it("does not create an account", async () => {
            await getError(() =>
              loginController.register(
                username,
                password,
                nonAdminEmail,
                "whatever"
              )
            );
            expect(accountController.create).not.toHaveBeenCalled();
          });
        });
        describe("exhausted code", () => {
          beforeEach(() => {
            jest
              .spyOn(inviteCodeController, "claimInviteCodeOrThrow")
              .mockRejectedValue(new InviteCodeExhaustedError());
          });
          it("rejects", async () => {
            const error = await getError(() =>
              loginController.register(
                username,
                password,
                nonAdminEmail,
                "whatever"
              )
            );
            expect(error).toBeInstanceOf(InvalidArgumentError);
            const err = error as InvalidArgumentError;
            expect(err.validationErrors).toMatchInlineSnapshot(`
              [
                ValidationErrorObject {
                  "constraints": [
                    ValidationConstraint {
                      "description": "This invite code has been exhausted.",
                      "key": "isValid",
                    },
                  ],
                  "field": "inviteCodeId",
                },
              ]
            `);
          });
          it("does not create an identity", async () => {
            await getError(() =>
              loginController.register(
                username,
                password,
                nonAdminEmail,
                "whatever"
              )
            );
            expect(identityController.create).not.toHaveBeenCalled();
          });
          it("does not create an account", async () => {
            await getError(() =>
              loginController.register(
                username,
                password,
                nonAdminEmail,
                "whatever"
              )
            );
            expect(accountController.create).not.toHaveBeenCalled();
          });
        });
      });
    });
  });
  describe("method:login", () => {
    let identityRepository: AppGraphqlContext["identityRepository"];
    beforeEach(() => {
      ({ identityRepository } = ctx);
      identity = createMockIdentity({
        emailAddress: adminEmail,
        globalAdminPermissions: true,
      });
      account = createMockAccount({ identity });

      jest.spyOn(accountController, "verifyCredentials").mockResolvedValue({
        success: true,
        account,
      });

      jest.spyOn(identityRepository, "findOne").mockResolvedValue(identity);
    });
    it("verifies credentials", async () => {
      const { success } = await loginController.login(adminEmail, password);
      expect(accountController.verifyCredentials).toHaveBeenCalledWith(
        adminEmail,
        password
      );
      expect(success).toBe(true);
    });
    it("returns unsuccessful if validation fails", async () => {
      jest.spyOn(accountController, "verifyCredentials").mockResolvedValue({
        success: false,
      });
      const { success } = await loginController.login(adminEmail, password);
      expect(success).toBe(false);
    });
    it("fetches the appropriate identity", async () => {
      const result = await loginController.login(adminEmail, password);
      expect(identityRepository.findOne).toHaveBeenCalledWith({
        where: { id: identity.id },
      });
      if (!result.success) {
        throw new Error("expected result.success = true");
      }
      expect(result.identity).toBe(identity);
    });
    it("returns a token", async () => {
      const result = await loginController.login(adminEmail, password);

      if (!result.success) {
        throw new Error("expected result.success = true");
      }
      const { token } = result;
      const decoded = await verifyJwt(token);
      expect(decoded).toEqual(
        expect.objectContaining({
          identity: { displayName: identity.displayName, id: identity.id },
        })
      );
    });
    it("returns the account", async () => {
      const result = await loginController.login(adminEmail, password);
      if (!result.success) {
        throw new Error("expected result.success = true");
      }
      expect(result.account).toBe(account);
    });
  });
});

class MockTransactionProvider {
  container: AppGraphqlContext["container"];
  constructor({ container }: AppGraphqlContext) {
    this.container = container;
  }
  runTransaction(fn: (args: AppGraphqlContext) => any) {
    return this.container.build(fn);
  }
}

class MockIdentityController {
  create() {}
}
class MockAccountController {
  create() {}
  verifyCredentials() {}
}
class MockInviteCodeController {
  claimInviteCodeOrThrow() {}
  findOneByIdOrFail() {}
}
class MockCommunityMemberController {
  create() {}
}
class MockIdentityRepository {
  findOne() {}
}
