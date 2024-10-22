import { LoginResolver } from "./LoginResolver.js";
import { createTestContainer } from "../test/createTestContainer.js";
import { buildSchema } from "type-graphql";
import { GraphQLSchema } from "graphql";
import { LoginController } from "./LoginController.js";
import { gql } from "graphql-tag";
import { EmptyResolver } from "../test/gql/EmptyResolver.js";
import { TransactionProvider } from "../db/TransactionProvider.js";
import { asFunction } from "awilix";
import { IdentityController } from "../models/Identity/IdentityController.js";
import { AccountController } from "../models/Account/AccountController.js";
import { ResetTokenController } from "../models/ResetToken/ResetTokenController.js";
import { EmailService } from "./email/EmailService.js";
import { createMockIdentity } from "../models/Identity/Identity.mock.js";
import { createMockAccount } from "../models/Account/Account.mock.js";
import { createMockResetToken } from "../models/ResetToken/ResetToken.mock.js";
import { Identity } from "../models/Identity/Identity.js";
import { ResetToken } from "../models/ResetToken/ResetToken.js";
import { Account } from "../models/Account/Account.js";
import { executeOrDie } from "../test/gql/executeOrDie.js";
import { AppGraphqlContext } from "../graphql/AppGraphqlContext.js";

jest.mock("../models/Account/AccountController.js");
jest.mock("../models/Identity/IdentityController.js");
jest.mock("../models/ResetToken/ResetTokenController.js");

jest.mock("../db/TransactionProvider.js");

jest.mock("./LoginController.js");
jest.mock("./email/EmailService.js");

jest.mock("@aws-sdk/client-ses");

jest.mock("nodemailer");
jest.mock("nodemailer/lib/smtp-transport/index.js");

describe("resolver:LoginResolver", () => {
  let schema: GraphQLSchema;
  let container: ReturnType<typeof createTestContainer>;

  let identityController: IdentityController;
  let accountController: AccountController;
  let resetTokenController: ResetTokenController;

  let transactionProvider: TransactionProvider;

  let loginController: LoginController;
  let emailService: EmailService;

  let password: string;
  let email: string;

  beforeEach(async () => {
    container = createTestContainer<AppGraphqlContext>({
      loginController: new LoginController(null!),
      transactionProvider: TransactionProvider,
      identityController: IdentityController,
      accountController: AccountController,
      resetTokenController: ResetTokenController,
      emailService: EmailService,
    });
    schema = await buildSchema({
      resolvers: [LoginResolver, EmptyResolver],
    });
    loginController = container.resolve("loginController");
    transactionProvider = container.resolve("transactionProvider");
    emailService = container.resolve("emailService");
    accountController = container.resolve("accountController");
    resetTokenController = container.resolve("resetTokenController");
    identityController = container.resolve("identityController");

    password = "Password$!";
    email = "user@example.com";

    jest
      .spyOn(transactionProvider, "runTransaction")
      .mockImplementation((fn) => container.build(asFunction(fn)));
  });

  describe("method:register", () => {
    let registerMutation: any;
    let username: string;
    let inviteCodeId: string;
    beforeEach(() => {
      jest.spyOn(loginController, "register").mockResolvedValue({
        success: true,
        account: null!,
        identity: null!,
        token: null!,
      });

      username = "username";
      inviteCodeId = "mock-invite-code-id";

      registerMutation = gql`
        mutation {
          register(
            input: {
              username: "${username}"
              password: "${password}"
              email: "${email}"
              inviteCodeId: "${inviteCodeId}"
            }
          ) {
            __typename
          }
        }
      `;
    });
    it("should register a new user", async () => {
      await executeOrDie({
        schema,
        document: registerMutation,
        contextValue: container.cradle,
      });
      expect(loginController.register).toHaveBeenCalledTimes(1);
      expect(loginController.register).toHaveBeenCalledWith(
        username,
        password,
        email,
        inviteCodeId
      );
    });
    it("should return a LoginFailureResponse on failure", async () => {
      jest.spyOn(loginController, "register").mockResolvedValue({
        success: false,
      });
      const { data } = await executeOrDie({
        schema,
        document: registerMutation,
        contextValue: container.cradle,
      });
      expect(data).toMatchInlineSnapshot(`
        {
          "register": {
            "__typename": "LoginFailureResponse",
          },
        }
      `);
    });
    it("should return a LoginSuccessResponse on success", async () => {
      const { data } = await executeOrDie({
        schema,
        document: registerMutation,
        contextValue: container.cradle,
      });
      expect(data).toMatchInlineSnapshot(`
        {
          "register": {
            "__typename": "LoginSuccessResponse",
          },
        }
      `);
    });
  });
  describe("method:login", () => {
    let mutationDocument: any;

    beforeEach(() => {
      mutationDocument = gql`
        mutation {
          login(input:  {
            email: "${email}"
            password: "${password}"
          }) {
            __typename
          }
        }`;
    });

    it("should login a user", async () => {
      jest
        .spyOn(loginController, "login")
        .mockResolvedValue({ success: false });

      await executeOrDie({
        schema,
        document: mutationDocument,
        contextValue: container.cradle,
      });

      expect(loginController.login).toHaveBeenCalledTimes(1);
      expect(loginController.login).toHaveBeenCalledWith(email, password);
    });
    it("should return a LoginFailureResponse on failure", async () => {
      jest
        .spyOn(loginController, "login")
        .mockResolvedValue({ success: false });

      const { data } = await executeOrDie({
        schema,
        document: mutationDocument,
        contextValue: container.cradle,
      });

      expect(data).toMatchInlineSnapshot(`
        {
          "login": {
            "__typename": "LoginFailureResponse",
          },
        }
      `);
    });
    it("should return a LoginSuccessResponse on success", async () => {
      jest.spyOn(loginController, "login").mockResolvedValue({
        success: true,
        account: null!,
        identity: null!,
        token: null!,
      });
      const { data } = await executeOrDie({
        schema,
        document: mutationDocument,
        contextValue: container.cradle,
      });
      expect(data).toMatchInlineSnapshot(`
        {
          "login": {
            "__typename": "LoginSuccessResponse",
          },
        }
      `);
    });
  });
  describe("method:requestPasswordReset", () => {
    let mutationDocument: any;
    let mockIdentity: Identity;
    let mockResetToken: ResetToken;
    let mockAccount: Account;

    beforeEach(() => {
      mutationDocument = gql`
        mutation {
          requestPasswordReset(input: {
            email: "${email}"
          }) {
            __typename
            ... on RequestPasswordResetReceivedResponse {
              message
            }
          }
        }
      `;

      mockIdentity = createMockIdentity();
      jest.spyOn(identityController, "find").mockResolvedValue([mockIdentity]);

      jest.spyOn(emailService, "sendPasswordResetEmail").mockResolvedValue();

      mockAccount = createMockAccount();
      jest.spyOn(accountController, "find").mockResolvedValue([mockAccount]);

      jest
        .spyOn(resetTokenController, "revokeOutstandingResetTokensForAccount")
        .mockResolvedValue();

      mockResetToken = createMockResetToken();
      jest
        .spyOn(resetTokenController, "create")
        .mockResolvedValue(mockResetToken);
    });
    it("returns a noncommittal response if email is valid", async () => {
      const { data } = await executeOrDie({
        schema,
        document: mutationDocument,
        contextValue: container.cradle,
      });
      expect(data).toMatchInlineSnapshot(`
        {
          "requestPasswordReset": {
            "__typename": "RequestPasswordResetReceivedResponse",
            "message": "If the email you provided matches an account, it will receive an email with next steps.",
          },
        }
      `);
    });
    it("returns the same response for invalid emails", async () => {
      jest.spyOn(identityController, "find").mockResolvedValue([]);
      const { data } = await executeOrDie({
        schema,
        document: mutationDocument,
        contextValue: container.cradle,
      });
      expect(identityController.find).toHaveBeenCalledTimes(1);
      expect(data).toMatchInlineSnapshot(`
        {
          "requestPasswordReset": {
            "__typename": "RequestPasswordResetReceivedResponse",
            "message": "If the email you provided matches an account, it will receive an email with next steps.",
          },
        }
      `);
    });
    it("creates a reset token and sends it in an email", async () => {
      await executeOrDie({
        schema,
        document: mutationDocument,
        contextValue: container.cradle,
      });
      // fetches identity by email
      expect(identityController.find).toHaveBeenCalledTimes(1);
      expect(identityController.find).toHaveBeenCalledWith({ email });

      // fetches account for identity
      expect(accountController.find).toHaveBeenCalledTimes(1);
      expect(accountController.find).toHaveBeenCalledWith({
        identityId: mockIdentity.id,
      });

      // creates a new reset token
      expect(resetTokenController.create).toHaveBeenCalledTimes(1);
      expect(resetTokenController.create).toHaveBeenCalledWith({
        accountId: mockAccount.id,
      });

      // sends the email
      expect(emailService.sendPasswordResetEmail).toHaveBeenCalledTimes(1);
      expect(emailService.sendPasswordResetEmail).toHaveBeenCalledWith(
        email,
        mockResetToken.id
      );
    });
    it("revokes outstanding reset tokens for the account", async () => {
      await executeOrDie({
        schema,
        document: mutationDocument,
        contextValue: container.cradle,
      });

      expect(
        resetTokenController.revokeOutstandingResetTokensForAccount
      ).toHaveBeenCalledTimes(1);
      expect(
        resetTokenController.revokeOutstandingResetTokensForAccount
      ).toHaveBeenCalledWith(mockAccount.id);
    });
  });
  describe("method:resetPassword", () => {
    let mutationDocument: any;
    let resetToken: ResetToken;
    let password: string;

    beforeEach(() => {
      password = "NewPassword$!";
      resetToken = createMockResetToken();

      mutationDocument = gql`
        mutation {
          resetPassword(input: {
            token: "${resetToken.id}"
            password: "${password}"
          }) {
            __typename
            ...on ResetPasswordSuccessResponse {
              success
            }
          }
        }
      `;

      jest
        .spyOn(resetTokenController, "redeemToken")
        .mockResolvedValue(resetToken);

      jest.spyOn(accountController, "resetPassword").mockResolvedValue();
    });
    it("should return a ResetPasswordSuccessResponse on success", async () => {
      const { data } = await executeOrDie({
        schema,
        document: mutationDocument,
        contextValue: container.cradle,
      });
      expect(data).toMatchInlineSnapshot(`
        {
          "resetPassword": {
            "__typename": "ResetPasswordSuccessResponse",
            "success": true,
          },
        }
      `);
    });
  });
});
