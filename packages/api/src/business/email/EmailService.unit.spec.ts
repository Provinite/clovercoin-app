import { Lifetime } from "awilix";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { Module } from "../../modules/Module.js";
import { createMockSesEnvironment } from "../../test/mocks/createMockSesEnvironment.js";
import { LoggerModule } from "../../util/Logger.module.js";
import { EmailService } from "./EmailService.js";
import { EmailTransport } from "./EmailTransport.js";

jest.mock("../../util/logger.js");

describe("EmailService", () => {
  let mockSesClientConfig: AppGraphqlContext["sesConfig"];
  let mockSesEnv: AppGraphqlContext["sesEnvironment"];
  let mockAppEnv: AppGraphqlContext["appEnvironment"];
  let mockEmailTransport: jest.Mocked<EmailTransport>;
  let emailService: EmailService;

  beforeEach(() => {
    mockAppEnv = {
      appName: "cc-api-unit-test",
      envName: "test/unit",
      webAppOrigin: "http://localhost:3000",
    };

    mockSesEnv = createMockSesEnvironment();

    mockSesEnv = {
      fromAddress: "unit-tests@local.host",
      useSmtp: true,
      endpoint: "https://ses.local.host",
      smtpPort: 420,
      smtpHost: "smtp.local.host",
      smtpCredentialsSecretArn: "arn:aws:secretsmanager:us-east-1",
      smtpSecure: true,
    };

    mockEmailTransport = {
      send: jest.fn(),
    };

    emailService = Module.define({
      name: "TestModule",
      entries: {
        emailService: {
          class: EmailService,
          lifetime: Lifetime.SINGLETON,
        },
        sesConfig: {
          factory: () => mockSesClientConfig,
          lifetime: Lifetime.SINGLETON,
        },
        sesEnvironment: {
          factory: () => mockSesEnv,
          lifetime: Lifetime.SINGLETON,
        },
        appEnvironment: {
          factory: () => mockAppEnv,
          lifetime: Lifetime.SINGLETON,
        },
        emailTransport: {
          factory: () => mockEmailTransport,
          lifetime: Lifetime.SINGLETON,
        },
      },
      imports: [LoggerModule],
    })
      .instantiate()
      .initialize()
      .resolve("emailService");
  });

  describe("method:sendPasswordResetEmail", () => {
    it("should send a password reset email", async () => {
      const email = "test@local.host";
      const token = "reset-token";

      await emailService.sendPasswordResetEmail(email, token);

      expect(mockEmailTransport.send).toHaveBeenCalledWith({
        to: email,
        subject: expect.any(String),
        html: expect.any(String),
      });
      expect(
        mockEmailTransport.send.mock.calls[0][0].subject
      ).toMatchInlineSnapshot(`"Password reset request"`);
      expect(mockEmailTransport.send.mock.calls[0][0].html).toMatchSnapshot();
    });
  });
});
