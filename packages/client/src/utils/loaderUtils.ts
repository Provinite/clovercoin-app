import { isNotAuthorizedError } from "@clovercoin/api-client";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "react-router-dom";
import { AppRoutes } from "../ui/AppRoutes";
import { isNullish } from "../ui/util/isNullish";
import {
  getAllStrings,
  getFile,
  getFileOrFail,
  getString,
  getStringOrFail,
} from "./formDataUtils";
import { slugToUuid } from "./uuidUtils";

type SlugConfig = boolean;
type SlugMap = Record<string, SlugConfig>;

type SlugOutput<T extends SlugMap> = {
  [k in keyof T as k extends `${infer U}Slug`
    ? `${U}Id`
    : k]: T[k] extends false ? string | undefined : string;
};

type FormMap = Record<string, FormFieldConfig>;

type FormFieldConfig =
  | boolean
  | {
      file?: boolean;
      required?: boolean;
      all?: boolean;
    };

type FormOutput<
  T extends FormMap,
  U extends FullFormConfig<T> = FullFormConfig<T>
> = {
  [k in keyof T]: MaybeOptional<
    MaybeArray<BaseType<U[k]>, U[k]["all"]>,
    U[k]["all"] extends true ? true : U[k]["required"]
  >;
};

type FullFormConfig<T extends FormMap> = {
  [k in keyof T]: FullFormFieldConfig<T[k]>;
};

type MaybeOptional<T, Required> = Required extends true ? T : T | undefined;
type MaybeArray<T, IsArray> = IsArray extends true ? T[] : T;

type BaseType<T extends Exclude<FormFieldConfig, boolean>> =
  T["file"] extends true ? File : string;

type FullFormFieldConfig<T extends FormFieldConfig> = T extends boolean
  ? { required: T; file: false; all: false }
  : T;

export interface GetDataArgs {
  data: LoaderFunctionArgs | ActionFunctionArgs;
  slugs?: SlugMap;
  form?: FormMap;
}

export interface GetDataResult<T extends GetDataArgs> {
  ids: SlugOutput<Exclude<T["slugs"], undefined>>;
  form: FormOutput<Exclude<T["form"], undefined>>;
  method: Request["method"];
  data: T["data"];
}

export async function getLoaderData<T extends GetDataArgs>({
  data,
  slugs = {},
  form = {},
}: T): Promise<GetDataResult<T>> {
  const slugsResult: Record<string, string | undefined> = {};
  for (const [slugName, isRequired] of Object.entries(slugs)) {
    const newSlugName = slugName.endsWith("Slug")
      ? slugName.slice(0, -4) + "Id"
      : slugName;

    const value = data.params[slugName];

    if (value) {
      slugsResult[newSlugName] = slugToUuid(value);
    } else if (!isRequired) {
      slugsResult[newSlugName] = undefined;
    } else {
      throw new Error(`Missing expected parameter ${slugName}`);
    }
  }

  const needsForm = Object.keys(form).length > 0;
  const formData: FormData = needsForm
    ? await data.request.formData()
    : (null as any);
  const formResult: Record<
    string,
    string | File | undefined | string[] | File[]
  > = {};
  const fullConfig = <T extends FormFieldConfig>(
    config: T
  ): { file: boolean; required: boolean; all: boolean } => {
    if (typeof config === "boolean") {
      return {
        file: false,
        required: config,
        all: false,
      };
    } else {
      return {
        file: config.file || false,
        required: config.required || false,
        all: config.all || false,
      };
    }
  };

  for (const [fieldName, fieldConfig] of Object.entries(form)) {
    const { file, required, all } = fullConfig(fieldConfig);

    const methods = {
      file: {
        optional: getFile,
        required: getFileOrFail,
        array: () => {
          throw new Error("File arrays are not implemented");
        },
      },
      string: {
        optional: getString,
        required: getStringOrFail,
        array: getAllStrings,
      },
    };

    const method =
      methods[file ? "file" : "string"][
        all ? "array" : required ? "required" : "optional"
      ];
    const result = method(formData, fieldName);
    if (!isNullish(result)) {
      formResult[fieldName] = result;
    }
  }

  return {
    ids: slugsResult as any,
    method: data.request.method,
    form: formResult as any,
    data,
  };
}

/**
 * Loader factory for most common usages. Wraps your loader
 * in a call to {@link getLoaderData}
 * @param options
 * @param loader
 * @returns
 */
export function makeLoader<
  T extends Omit<GetDataArgs, "data"> & {
    allowedMethods?: string[];
    name?: string;
  },
  R
>(
  options: T,
  loader: (
    data: GetDataResult<T & { data: LoaderFunctionArgs | ActionFunctionArgs }>
  ) => Promise<R>
): (opts: LoaderFunctionArgs | ActionFunctionArgs) => Promise<R | Response> {
  return async (data) => {
    if (
      options.allowedMethods &&
      !options.allowedMethods.some(
        (method) => method.toLowerCase() === data.request.method.toLowerCase()
      )
    ) {
      throw new Error("405");
    }
    if (data.request.method.toLowerCase() === "delete") {
      const result = loader(
        await getLoaderData({ data, ...options, form: undefined })
      );
      return result;
    }
    const result = await loader(await getLoaderData({ data, ...options }));
    if (isNotAuthorizedError(result)) {
      return redirect(AppRoutes.login());
    }
    return result;
  };
}

/**
 * Action factory for most common usages. Wraps your loader
 * in a call to {@link getLoaderData}
 * @param options
 * @param loader
 * @returns
 */
export const makeAction = makeLoader;
