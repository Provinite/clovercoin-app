/**
 * @file All interaction with the environment should be contained to this
 * module so it can serve as a primary source of documentation regarding the
 * configurable environment variables.
 */

/**
 * Read a required env var.
 * @param varName The environemnt variable to read
 * @returns The environment variable
 * @throws if the env var is not set, or is empty ""
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function required(varName: string): string {
  const val = process.env[varName];
  if (!val) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
  return val;
}

/**
 * Read an optional env var.
 * @param varName The environemnt variable to read
 * @returns The environment variable or "" if it is unset
 */
function optional(varName: string): string {
  return process.env[varName] || "";
}

/**
 * Get the environment variable package containing database settings
 * @returns
 */
export const getDbEnvironment = () => ({
  /**
   * The ARN of the AWS Secrets Manager secret to use to get database credentials.
   * The secret should be a JSON string representing a
   * { username: string, password: string} object. If this is not provided, default
   * dev env credentials will be used, and no secret will be fetched.
   */
  secretArn: optional("DB_SECRET_ARN"),
  /**
   * The database host to connect to. Defaults to `localhost`
   */
  host: optional("CC_DB_HOST") || "localhost",
  /**
   * The name of the database to connect to. Defaults to `postgres`
   */
  database: optional("CC_DB_NAME") || "postgres",
  /**
   * Whether to use SSL when connecting to the database. Defaults to false
   * @note DB_SSL should be "true" or "false" if set
   */
  ssl: optional("DB_SSL") === "true",
});

/**
 * Get the environment variable package containing HTTP settings
 * @returns
 */
export const getHttpEnvironment = () => ({
  /**
   * Whether or not to start an HTTP server. Defaults to true.
   * @note CC_LISTEN should be "true" or "false" if set
   */
  listen: optional("CC_LISTEN").toLowerCase() !== "false",
});

export const getJwtConfig = () => ({
  /**
   * The secret to use to encode and verify JWTs for authentication. Must be provided
   * if JWT_SECRET_ARN isn't.
   */
  secret: optional("CC_JWT_SECRET"),
  /**
   * The ARN of a secrets manager secret containing the JWT secret. Must be provided
   * if CC_JWT_SECRET isn't.
   */
  secretArn: optional("JWT_SECRET_ARN"),
});

export const getS3Environment = () => ({
  /**
   * The endpoint to use for S3. If not provided, defaults to production AWS
   * s3.
   */
  endpoint: optional("CC_AWS_S3_ENDPOINT"),
  /**
   * The name of the bucket to use for image uploads.
   */
  bucket: required("CC_IMG_BUCKET"),
});

export const getBootstrapEnvironment = () => ({
  /**
   * A single account may be registered with this email without an invite code. Used
   * to bootstrap new environments.
   */
  adminEmail: optional("CC_ADMIN_EMAIL"),
});

export const getSesEnvironment = () => ({
  /**
   * The endpoint to use for SES. If not provided, defaults to production aws
   * ses.
   */
  endpoint: optional("CC_AWS_SES_ENDPOINT"),
  /**
   * The "from" address to use in emails
   */
  fromAddress: required("CC_AWS_SES_FROM_ADDRESS"),
});

export const getAppEnvironment = () => ({
  /**
   * The user-friendly name for this environment. eg "Beta".
   */
  envName: optional("CC_ENV_NAME") || "Dev",
  /**
   * The name of the application. Used in user-facing messages to refer to the system.
   */
  appName: optional("CC_APP_NAME") || "CloverCoin Species",
  /**
   * The origin for the web client in this env. Used to generate links in emails.
   */
  webAppOrigin: required("CC_WEB_CLIENT_ORIGIN"),
});
