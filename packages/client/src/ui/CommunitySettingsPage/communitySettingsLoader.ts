import {
  isCommunity,
  isInvalidArgumentError,
  isNotAuthenticatedError,
  isNotAuthorizedError,
  isNotFoundError,
} from "@clovercoin/api-client";
import { graphqlService } from "../../graphql/client";
import { assertNever } from "../../utils/assertNever";
import { makeLoader } from "../../utils/loaderUtils";
import { globalSnackbarTopic } from "../../utils/observables/topics/globalSnackbarTopic";

/**
 * Loader for route "root.community.settings"
 */
export const communitySettingsLoader = makeLoader(
  {
    slugs: { communityId: true },
  },
  async ({ ids: { communityId } }) => {
    const {
      data: { community },
    } = await graphqlService.getCommunityRoles({
      variables: {
        communityId,
      },
    });

    if (isCommunity(community)) {
      return community.roles;
    } else if (isNotAuthenticatedError(community)) {
      return community;
    } else if (isInvalidArgumentError(community)) {
      globalSnackbarTopic.simpleError.publish(
        "Error fetching community roles: Invalid argument"
      );
      return [];
    } else if (isNotAuthorizedError(community)) {
      globalSnackbarTopic.simpleError.publish(
        "Error fetching community roles: Insufficient permissions"
      );
      return [];
    } else if (isNotFoundError(community)) {
      globalSnackbarTopic.simpleError.publish("Community not found");
      return [];
    } else {
      assertNever(community);
    }
  }
);
