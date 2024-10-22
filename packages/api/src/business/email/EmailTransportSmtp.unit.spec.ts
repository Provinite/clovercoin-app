import { createTransport, Transporter } from "nodemailer";
import { EnvironmentModule } from "../../Environment.module.js";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { Module } from "../../modules/Module.js";
import { asIf } from "../../test/asIf.js";
import { asMock } from "../../test/asMock.js";
import { createMockSesEnvironment } from "../../test/mocks/createMockSesEnvironment.js";
import { LoggerModule } from "../../util/Logger.module.js";
import { EmailTransport } from "./EmailTransport.js";
import { EmailTransportSmtp } from "./EmailTransportSmtp.js";
import { fetchSecret } from "../../secrets/fetchSecret.js";
jest.mock("../../util/logger.js");
jest.mock("../../environment.js");
jest.mock("nodemailer", () => ({
  createTransport: jest.fn(),
}));
jest.mock("../../secrets/fetchSecret.js");

describe("EmailTransportSmtp", () => {
  let emailTransport: EmailTransport;
  let mockTransport: Transporter;
  let mockSesEnv: AppGraphqlContext["sesEnvironment"];
  beforeEach(() => {
    mockSesEnv = createMockSesEnvironment();
    emailTransport = Module.define<AppGraphqlContext>({
      name: "TestModule",
      entries: {
        emailTransport: {
          class: EmailTransportSmtp,
        },
        sesEnvironment: {
          factory: () => mockSesEnv,
        },
      },
      imports: [LoggerModule, EnvironmentModule],
    })
      .instantiate()
      .initialize()
      .resolve("emailTransport");

    mockTransport = asIf<Transporter>({
      sendMail: jest.fn(),
      close: jest.fn(),
    });

    asMock(fetchSecret).mockResolvedValue(
      JSON.stringify({
        username: "username",
        password: "password",
      })
    );

    asMock(createTransport).mockReturnValue(mockTransport);
  });
  describe("method:send", () => {
    const opts = {
      html: "html",
      subject: "subject",
      to: "to",
    };
    describe("with secrets manager credentials", () => {
      it("fetches SMTP credentials from secrets manager", async () => {
        await emailTransport.send(opts);
        expect(fetchSecret).toHaveBeenCalledTimes(1);
        expect(fetchSecret).toHaveBeenCalledWith(
          mockSesEnv.smtpCredentialsSecretArn,
          expect.anything()
        );

        expect(createTransport).toHaveBeenCalledTimes(1);
        expect(createTransport).toHaveBeenCalledWith({
          host: mockSesEnv.smtpHost,
          port: mockSesEnv.smtpPort,
          secure: mockSesEnv.smtpSecure,
          auth: {
            user: "username",
            pass: "password",
          },
        });
      });
    });
    describe("with no credentials", () => {
      beforeEach(() => {
        mockSesEnv.smtpCredentialsSecretArn = "";
      });
      it("does not fetch SMTP credentials", async () => {});
    });
    it("sends an email", async () => {
      await emailTransport.send(opts);

      expect(createTransport).toHaveBeenCalledWith({
        host: mockSesEnv.smtpHost,
        port: mockSesEnv.smtpPort,
        secure: mockSesEnv.smtpSecure,
        auth: expect.anything(),
      });
      expect(mockTransport.sendMail).toHaveBeenCalledWith({
        from: mockSesEnv.fromAddress,
        html: opts.html,
        subject: opts.subject,
        to: [opts.to],
      });
    });
    it("closes the transport", async () => {
      await emailTransport.send(opts);
      expect(mockTransport.close).toHaveBeenCalledTimes(1);
    });
  });
});
