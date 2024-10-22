import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { EmailTransport, EmailTransportSendArgs } from "./EmailTransport.js";

/**
 * Mailer service that sends emails via the AWS SES API.
 */
export class EmailTransportSesApi implements EmailTransport {
  client: SESClient;
  sesEnvironment: AppGraphqlContext["sesEnvironment"];
  constructor({ sesConfig, sesEnvironment }: AppGraphqlContext) {
    this.client = new SESClient(sesConfig);
    this.sesEnvironment = sesEnvironment;
  }

  async send({ to, subject, html }: EmailTransportSendArgs): Promise<void> {
    const sendCommand = new SendEmailCommand({
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
    });
    await this.client.send(sendCommand);
  }
}
