import { Lifetime } from "awilix";
import { EnvironmentModule } from "../../Environment.module.js";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { Module } from "../../modules/Module.js";
import { LoggerModule } from "../../util/Logger.module.js";
import { EmailService } from "./EmailService.js";
import { EmailTransport } from "./EmailTransport.js";
import { EmailTransportSesApi } from "./EmailTransportSesApi.js";
import { EmailTransportSmtp } from "./EmailTransportSmtp.js";

export const EmailModule = Module.define<AppGraphqlContext>({
  name: "EmailModule",
  entries: {
    emailService: {
      class: EmailService,
      lifetime: Lifetime.SINGLETON,
    },
    emailTransport: {
      factory: (ctx) => {
        if (ctx.sesEnvironment.useSmtp) {
          return new EmailTransportSmtp(ctx);
        } else {
          return new EmailTransportSesApi(ctx);
        }
      },
      lifetime: Lifetime.SINGLETON,
    },
  },
  imports: [EnvironmentModule, LoggerModule],
});

declare module "../../graphql/AppGraphqlContext.js" {
  interface AppGraphqlContext {
    emailService: EmailService;
    emailTransport: EmailTransport;
  }
}
