import { v4 } from "uuid";
import { build } from "../../awilix/build.js";
import { AppGraphqlContext } from "../../graphql/AppGraphqlContext.js";
import { getAdminUser } from "./integrationCache.js";

export const _createInviteCode = async ({
  id = v4(),
  creatorId = getAdminUser().identity.id,
  maxClaims = 100,
  roleId = null as string | null,
}) => {
  const container = global.ccAppContainer;
  if (!container) {
    throw new Error(`No application found. Cannot create invite codes.`);
  }

  return build(
    container,
    async ({ inviteCodeController }: AppGraphqlContext) => {
      const code = await inviteCodeController.create({
        creatorId,
        id,
        maxClaims,
        roleId,
      });

      return {
        id: code.id,
        maxClaims: code.maxClaims,
        roleId: code.roleId,
      };
    }
  );
};
