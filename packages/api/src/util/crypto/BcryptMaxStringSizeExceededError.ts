export class BcryptMaxStringSizeExceededError extends Error {
  constructor(sizeInBytes: number) {
    super(
      `Password exceeds maximum bytes. ${sizeInBytes} > ${BCRYPT_MAX_STR_BYTES}`
    );
  }
}
export const BCRYPT_MAX_STR_BYTES = 72;
