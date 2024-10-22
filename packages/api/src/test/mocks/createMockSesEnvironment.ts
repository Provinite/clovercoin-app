import type { getSesEnvironment } from "../../environment.js";

export const createMockSesEnvironment = (): ReturnType<
  typeof getSesEnvironment
> => ({
  fromAddress: "unit-tests@local.host",
  useSmtp: true,
  endpoint: "https://ses.local.host",
  smtpPort: 420,
  smtpHost: "smtp.local.host",
  smtpCredentialsSecretArn: "arn:aws:secretsmanager:us-east-1",
  smtpSecure: true,
});
