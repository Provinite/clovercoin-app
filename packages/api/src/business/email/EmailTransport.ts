/**
 * Interface type for mailer services (herein called Transports).
 * See implementing classes and Email module factory for more details.
 */
export interface EmailTransport {
  send(args: EmailTransportSendArgs): Promise<void>;
}

export interface EmailTransportSendArgs {
  /**
   * The email address to send the email to.
   */
  to: string;
  /**
   * The subject of the email.
   */
  subject: string;
  /**
   * The HTML content of the email.
   */
  html: string;
}
