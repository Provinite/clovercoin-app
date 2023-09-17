import { graphqlService } from "../../graphql/client";
import { makeAction } from "../../utils/loaderUtils";

export const roleDetailAction = makeAction(
  {
    allowedMethods: ["PATCH"],
    form: {
      name: false,
      canCreateSpecies: false,
      canEditSpecies: false,
      canCreateCritter: false,
      canEditCritter: false,
      canCreateInviteCode: false,
      canListInviteCodes: false,
      canCreateRole: false,
      canEditRole: false,
    },
    slugs: {
      communityId: true,
      roleSlug: true,
    },
  },
  async ({ form, ids: { roleId } }) => {
    const {
      data: { modifyRole },
    } = await graphqlService.modifyRole({
      variables: {
        input: {
          id: roleId,
          ...parsePermissionsFromForm(form),
        },
      },
    });
    return modifyRole;
  }
);

type Mapped<T> = {
  [K in keyof T]: K extends `can${string}` ? boolean | undefined : T[K];
};

function parsePermissionsFromForm<T>(form: T): Mapped<T> {
  const result: any = { ...form };
  for (const [key, value] of Object.entries(result)) {
    if (key.startsWith("can")) {
      result[key] = value === "true" ? true : value === "false" ? false : value;
    }
  }
  return result;
}
