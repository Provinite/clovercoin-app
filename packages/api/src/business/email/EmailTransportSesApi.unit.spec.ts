import {
  SendEmailCommand,
  SESClient,
  SESClientConfig,
} from "@aws-sdk/client-ses";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { Module } from "../../modules/Module.js";
import { asIf } from "../../test/asIf.js";
import { asMock } from "../../test/asMock.js";
import { createMockSesEnvironment } from "../../test/mocks/createMockSesEnvironment.js";
import { LoggerModule } from "../../util/Logger.module.js";
import { EmailTransport } from "./EmailTransport.js";
import { EmailTransportSesApi } from "./EmailTransportSesApi.js";
jest.mock("../../util/logger.js");
jest.mock("@aws-sdk/client-ses");
describe("EmailTransportSesApi", () => {
  let mockSesEnv: AppGraphqlContext["sesEnvironment"];
  let mockSesConfig: SESClientConfig;
  let mockSesClient: jest.Mocked<SESClient>;

  let emailTransport: EmailTransport;
  beforeEach(() => {
    mockSesClient = asIf<typeof mockSesClient>({
      destroy: jest.fn(),
      send: jest.fn(),
    });
    asMock(SESClient).mockReturnValue(mockSesClient);
    asMock(SendEmailCommand).mockImplementation((opts) => opts as any);

    mockSesEnv = createMockSesEnvironment();
    mockSesConfig = {
      apiVersion: "420",
    };

    emailTransport = Module.define<AppGraphqlContext>({
      name: "TestModule",
      entries: {
        emailTransport: {
          class: EmailTransportSesApi,
        },
        sesEnvironment: {
          factory: () => mockSesEnv,
        },
        sesConfig: {
          factory: () => mockSesConfig,
        },
      },
      imports: [LoggerModule],
    })
      .instantiate()
      .initialize()
      .resolve("emailTransport");
  });

  describe("method:send", () => {
    it("sends an email", async () => {
      expect(SESClient).toHaveBeenCalledTimes(1);
      expect(SESClient).toHaveBeenCalledWith(mockSesConfig);
      const opts = {
        html: "html",
        subject: "subject",
        to: "to",
      };

      await emailTransport.send(opts);

      expect(mockSesClient.send).toHaveBeenCalledWith({
        Destination: {
          ToAddresses: [opts.to],
        },
        Source: mockSesEnv.fromAddress,
        Message: {
          Subject: {
            Data: opts.subject,
          },
          Body: {
            Html: {
              Data: opts.html,
            },
          },
        },
      });
    });
  });
});
