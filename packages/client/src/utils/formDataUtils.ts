/**
 * Get a string value from a FormData object. Error if field is not a string,
 * @param formData
 * @param key
 * @returns The form data value, or null if missing
 */
export const getString = (formData: FormData, key: string): string | null => {
  const data = formData.get(key);
  if (data === null || typeof data === "string") {
    return data;
  }
  throw new Error(`Invalid "${key}" in form data, expected optional string.`);
};

/**
 * Get a string array value from a FormData object. Error if any entry is not
 * a string.
 * @param formData
 * @param key
 */
export const getAllStrings = (formData: FormData, key: string): string[] => {
  const data = formData.getAll(key);
  for (const datum of data) {
    if (typeof datum !== "string") {
      throw new Error(
        `Invalid "${key}[]" in form data, expected an array of strings`
      );
    }
  }
  return (data as string[]) || [];
};

/**
 * Get a string value from a FormData object. Error if missing or not a string.
 * @param formData
 * @param key
 * @returns The formData value
 */
export const getStringOrFail = (formData: FormData, key: string): string => {
  const data = getString(formData, key);
  if (data === null) {
    throw new Error(`Missing required "${key}" in form data, expected string.`);
  }
  return data;
};

/**
 * Get a file value from a FormData object. Error if missing or not a file.
 * @param formData
 * @param key
 * @returns The formData value
 */
export const getFileOrFail = (formData: FormData, key: string): File => {
  const data = getFile(formData, key);
  if (data === null) {
    throw new Error(`Missing required "${key}" in form data, expected file.`);
  }
  return data;
};

/**
 * Get a file value from a FormData object. Error if field is not a file,
 * @param formData
 * @param key
 * @returns The form data value, or null if missing
 */
export const getFile = (formData: FormData, key: string): File | null => {
  const data = formData.get(key);
  if (data === null || data instanceof File) {
    return data;
  }
  throw new Error(`Invalid "${key}" in form data, expected optional file.`);
};
