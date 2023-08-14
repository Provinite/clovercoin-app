import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { InvalidArgumentError } from "../errors/InvalidArgumentError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import type { AppGraphqlContext } from "../graphql/AppGraphqlContext.js";
import { ResetToken } from "../models/ResetToken/ResetToken.js";
import { RequestPasswordResetReceivedResponse } from "./auth/objects/RequestPasswordResetReceivedResponse.js";
import { LoginSuccessResponse } from "./auth/objects/LoginSuccessResponse.js";
import { LoginFailureResponse } from "./auth/objects/LoginFailureResponse.js";
import { RegisterArgs } from "./auth/objects/RegisterArgs.js";
import { LoginArgs } from "./auth/objects/LoginArgs.js";
import { ResetPasswordInput } from "./auth/objects/ResetPasswordInput.js";
import { RequestPasswordResetInput } from "./auth/objects/RequestPasswordResetInput.js";
import { RequestPasswordResetResponse } from "./auth/objects/RequestPasswordResetResponse.js";
import { LoginResponse } from "./auth/objects/LoginResponse.js";
import { RegisterResponse } from "./auth/objects/RegisterResponse.js";
import { ResetPasswordResponse } from "./auth/objects/ResetPasswordResponse.js";
import { ResetPasswordSuccessResponse } from "./auth/objects/ResetPasswordSuccessResponse.js";
import { ResetTokenNotRedeemedError } from "../models/Account/AccountController.js";
import { createTransport } from "nodemailer";
import { fetchSecret } from "../secrets/fetchSecret.js";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";

@Resolver()
export class LoginResolver {
  /**
   *
   * @param input Register graphql args
   * @param context Graphql context
   * @returns On success, a {@link LoginSuccessResponse}
   */
  @Mutation(() => RegisterResponse, {
    description: "Create a new account and receive an auth token",
  })
  async register(
    @Arg("input", { nullable: false })
    { username, password, email, inviteCodeId }: RegisterArgs,
    @Ctx() { loginController }: AppGraphqlContext
  ): Promise<LoginSuccessResponse | LoginFailureResponse> {
    const result = await loginController.register(
      username,
      password,
      email,
      inviteCodeId
    );
    if (!result.success) {
      return new LoginFailureResponse();
    }
    return new LoginSuccessResponse(result);
  }

  /**
   * Authenticate by username and password.
   * @param input Login graphql args
   * @param context Graphql context
   * @returns On success, a {@link LoginSuccessResponse}
   */
  @Mutation(() => LoginResponse, {
    description: "Log in using local credentials and receive an auth token",
  })
  async login(
    @Arg("input", { nullable: false }) { username, password }: LoginArgs,
    @Ctx() { loginController }: AppGraphqlContext
  ): Promise<LoginSuccessResponse | LoginFailureResponse> {
    const result = await loginController.login(username, password);
    if (!result.success) {
      return new LoginFailureResponse();
    }
    return new LoginSuccessResponse(result);
  }

  /**
   * Request a password reset email.
   * @param input Request password reset graphql input
   * @param context Graphql context
   * @returns
   */
  @Mutation(() => RequestPasswordResetResponse, { description: "" })
  async requestPasswordReset(
    @Arg("input", { nullable: false }) { email }: RequestPasswordResetInput,
    @Ctx()
    { transactionProvider }: AppGraphqlContext
  ) {
    return transactionProvider.runTransaction(
      async ({
        identityController,
        accountController,
        resetTokenController,
        sesConfig,
        sesEnvironment,
        appEnvironment,
        logger,
      }: AppGraphqlContext) => {
        const identities = await identityController.find({
          email,
        });
        if (identities.length === 1) {
          const [identity] = identities;
          const [account] = await accountController.find({
            identityId: identity.id,
          });

          if (!account) {
            throw new Error("Account not found for identity");
          }

          // revoke existing tokens
          await resetTokenController.revokeOutstandingResetTokensForAccount(
            account.id
          );

          // create the new token
          const resetToken = await resetTokenController.create({
            accountId: account.id,
          });

          // send the token to the user
          logger.info({
            message: "Sending password reset email",
            from: sesEnvironment.fromAddress,
            to: email,
          });

          const url = `${appEnvironment.webAppOrigin}/reset-password?code=${resetToken.id}`;
          const sesClient = new SESClient(sesConfig);
          if (sesEnvironment.useSmtp) {
            const options: SMTPTransport.Options = {
              host: sesEnvironment.smtpHost,
              port: sesEnvironment.smtpPort,
              secure: sesEnvironment.smtpSecure,
            };
            if (sesEnvironment.smtpCredentialsSecretArn) {
              const smtpCredentials = JSON.parse(
                await fetchSecret(
                  sesEnvironment.smtpCredentialsSecretArn,
                  logger
                )
              );

              options.auth = {
                user: smtpCredentials.username,
                pass: smtpCredentials.password,
              };
            }
            const transport = createTransport(options);
            await transport.sendMail({
              from: sesEnvironment.fromAddress,
              to: [email],
              subject: "Password reset request",
              html:
                `A a password reset was requested for the ${appEnvironment.envName} ${appEnvironment.appName} account tied to this email address.<br /><br />` +
                `If you requested this, visit the following URL to create a new password: ` +
                `<a href="${url}">${url}</a><br /><br />` +
                `<hr />` +
                `This message was automatically generated, and this mailbox is not monitored. Do not reply to this email.`,
            });
            transport.close();
          }
          await sesClient.send(
            new SendEmailCommand({
              Destination: {
                ToAddresses: [email],
              },
              Source: sesEnvironment.fromAddress,
              Message: {
                Subject: {
                  Data: "Password reset request",
                },
                Body: {
                  Html: {
                    Data:
                      `A a password reset was requested for the ${appEnvironment.envName} ${appEnvironment.appName} account tied to this email address.<br /><br />` +
                      `If you requested this, visit the following URL to create a new password: ` +
                      `<a href="${url}">${url}</a><br /><br />` +
                      `<hr />` +
                      `This message was automatically generated, and this mailbox is not monitored. Do not reply to this email.`,
                  },
                },
              },
            })
          );
          sesClient.destroy();
        }
        return new RequestPasswordResetReceivedResponse();
      }
    );
  }

  /**
   * Change a user's password using a reset token.
   * @param input The graphql input arg
   * @param context The graphql context
   */
  @Mutation(() => ResetPasswordResponse)
  async resetPassword(
    @Arg("input", { nullable: false }) { password, token }: ResetPasswordInput,
    @Ctx() { transactionProvider }: AppGraphqlContext
  ): Promise<ResetPasswordSuccessResponse | InvalidArgumentError> {
    return transactionProvider.runTransaction(
      async ({
        resetTokenController,
        accountController,
      }: AppGraphqlContext) => {
        let resetToken: ResetToken;
        try {
          resetToken = await resetTokenController.redeemToken(token);
        } catch (err) {
          if (err instanceof NotFoundError) {
            throw InvalidArgumentError.fromFieldMap({
              token:
                "There was a problem with your reset token. Please request a new one or contact support.",
            });
          }
          throw err;
        }

        try {
          await accountController.resetPassword(resetToken, password);
        } catch (err) {
          if (err instanceof ResetTokenNotRedeemedError) {
            throw InvalidArgumentError.fromFieldMap({
              token:
                "There was a problem with your reset token. Please request a new one or contact support.",
            });
          }
          throw err;
        }

        return new ResetPasswordSuccessResponse();
      }
    );
  }
}
