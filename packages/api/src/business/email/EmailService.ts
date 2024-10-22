import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { EmailTransport, EmailTransportSendArgs } from "./EmailTransport.js";

/**
 * Service for sending emails. Contains business-level logic for
 * sending specific types of emails. Relies on an {@link EmailTransport}
 * to actually send the email.
 *
 * @note New bespoke methods should be added to this class for each
 * email the system needs to send.
 */
export class EmailService {
  private logger: AppGraphqlContext["logger"];
  private sesEnvironment: AppGraphqlContext["sesEnvironment"];
  private appEnvironment: AppGraphqlContext["appEnvironment"];
  private emailTransport: EmailTransport;
  constructor({
    sesEnvironment,
    logger,
    appEnvironment,
    emailTransport,
  }: AppGraphqlContext) {
    this.sesEnvironment = sesEnvironment;
    this.logger = logger;
    this.appEnvironment = appEnvironment;
    this.emailTransport = emailTransport;
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
  private send(args: EmailTransportSendArgs) {
    return this.emailTransport.send(args);
  }
}
