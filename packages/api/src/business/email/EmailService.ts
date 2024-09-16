import {
  SendEmailCommand,
  SESClient,
  SESClientConfig,
} from "@aws-sdk/client-ses";
import { createTransport } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { fetchSecret } from "../../secrets/fetchSecret.js";

export class EmailService {
  private sesClientConfig: SESClientConfig;
  private logger: AppGraphqlContext["logger"];
  private sesEnvironment: AppGraphqlContext["sesEnvironment"];
  private appEnvironment: AppGraphqlContext["appEnvironment"];
  constructor({
    sesConfig,
    sesEnvironment,
    logger,
    appEnvironment,
  }: AppGraphqlContext) {
    this.sesClientConfig = sesConfig;
    this.sesEnvironment = sesEnvironment;
    this.logger = logger;
    this.appEnvironment = appEnvironment;
  }
  async sendPasswordResetEmail(email: string, resetToken: string) {
    this.logger.info({
      message: "Sending password reset email",
      from: this.sesEnvironment.fromAddress,
      to: email,
    });
    const url = `${this.appEnvironment.webAppOrigin}/reset-password?code=${resetToken}`;
    const htmlContents =
      `A a password reset was requested for the ${this.appEnvironment.envName} ${this.appEnvironment.appName} account tied to this email address.<br /><br />` +
      `If you requested this, visit the following URL to create a new password: ` +
      `<a href="${url}">${url}</a><br /><br />` +
      `<hr />` +
      `This message was automatically generated, and this mailbox is not monitored. Do not reply to this email.`;
    const subject = "Password reset request";

    await this.send({
      to: email,
      subject,
      html: htmlContents,
    });
  }

  /**
   * Send an email.
   * Please don't call this from outside this class. Add a new
   * bespoke method in this class for each transactional email.
   * @param args The email details
   * @returns A promise that resolves when the email is sent
   */
  private send(args: SendArgs) {
    if (this.sesEnvironment.useSmtp) {
      return this.sendWithSmtp(args);
    } else {
      return this.sendWithSes(args);
    }
  }

  /**
   * Send an email with AWS SES.
   * You probably want {@link send} instead. Don't call this
   * directly.
   * @param args Email details
   */
  private async sendWithSes({ to, subject, html }: SendArgs) {
    const sesClient = new SESClient(this.sesClientConfig);
    await sesClient.send(
      new SendEmailCommand({
        Destination: {
          ToAddresses: [to],
        },
        Source: this.sesEnvironment.fromAddress,
        Message: {
          Subject: {
            Data: subject,
          },
          Body: {
            Html: {
              Data: html,
            },
          },
        },
      })
    );
    sesClient.destroy();
  }

  /**
   * Send an email with SMTP.
   * You probably want {@link send} instead. Don't call this
   * directly.
   * @param args Email details
   */
  private async sendWithSmtp({ to, subject, html }: SendArgs) {
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

interface SendArgs {
  to: string;
  subject: string;
  html: string;
}
