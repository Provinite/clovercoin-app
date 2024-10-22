import { createTransport } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
import { Logger } from "winston";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { fetchSecret } from "../../secrets/fetchSecret.js";
import { EmailTransport, EmailTransportSendArgs } from "./EmailTransport.js";

/**
 * Mailer service that sends emails via SMTP.
 */
export class EmailTransportSmtp implements EmailTransport {
  private logger: Logger;
  private sesEnvironment: AppGraphqlContext["sesEnvironment"];

  constructor({ sesEnvironment, logger }: AppGraphqlContext) {
    this.sesEnvironment = sesEnvironment;
    this.logger = logger;
  }
  async send({ to, subject, html }: EmailTransportSendArgs): Promise<void> {
    const options: SMTPTransport.Options = {
      host: this.sesEnvironment.smtpHost,
      port: this.sesEnvironment.smtpPort,
      secure: this.sesEnvironment.smtpSecure,
    };
    if (this.sesEnvironment.smtpCredentialsSecretArn) {
      const smtpCredentials = JSON.parse(
        await fetchSecret(
          this.sesEnvironment.smtpCredentialsSecretArn,
          this.logger
        )
      );

      options.auth = {
        user: smtpCredentials.username,
        pass: smtpCredentials.password,
      };
    }
    const transport = createTransport(options);
    await transport.sendMail({
      from: this.sesEnvironment.fromAddress,
      to: [to],
      subject: subject,
      html,
    });
    transport.close();
  }
}
