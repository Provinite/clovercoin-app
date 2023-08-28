import { validateArg } from "./validateArg.js";

export async function parseArgToClass<T extends new () => any>(
  value: any,
  clazz: T,
  validate = true
): Promise<InstanceType<T>> {
  const instance = new clazz();
  for (const [key, val] of Object.entries(value)) {
    instance[key] = val;
  }
  if (validate) {
    await validateArg(instance);
  }

  return instance;
}
