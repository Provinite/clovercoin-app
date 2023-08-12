import { forEachRoute, RouteId, routes, TypedRouteConfig } from "../routes";
import { uuidToSlug } from "../utils/uuidUtils";

export const AppRouteParts = {
  admin: () => ["admin"],
  inviteCodeList: () => [...AppRouteParts.admin(), "inviteCodes"],
  login: () => ["login"],
  logout: () => ["logout"],
  register: () => ["register"],
  community: (communityId: string) => ["community", uuidToSlug(communityId)],
  communityList: () => ["communities"],
  addCritter: (communityId: string, speciesId: string) => [
    ...AppRouteParts.speciesDetail(communityId, speciesId),
    "add",
  ],
  speciesDetail: (communityId: string, speciesId: string) => [
    ...AppRouteParts.speciesList(communityId),
    uuidToSlug(speciesId),
  ],
  speciesTrait: (communityId: string, speciesId: string, traitId: string) => [
    ...AppRouteParts.speciesDetail(communityId, speciesId),
    "trait",
    uuidToSlug(traitId),
  ],
  speciesTraitList: (communityId: string, speciesId: string) => [
    ...AppRouteParts.speciesDetail(communityId, speciesId),
    "traits",
  ],
  speciesTraitAdd: (communityId: string, speciesId: string) => [
    ...AppRouteParts.speciesTraitList(communityId, speciesId),
    "add",
  ],
  speciesVariantList: (communityId: string, speciesId: string) => [
    ...AppRouteParts.speciesDetail(communityId, speciesId),
    "variants",
  ],
  speciesVariantDetail: (
    communityId: string,
    speciesId: string,
    variantId: string
  ) => [
    ...AppRouteParts.speciesVariantList(communityId, speciesId),
    uuidToSlug(variantId),
  ],
  speciesVariantTraitListEntryDetail: (
    communityId: string,
    speciesId: string,
    variantId: string,
    traitListEntryId: string
  ) => [
    ...AppRouteParts.speciesVariantDetail(communityId, speciesId, variantId),
    "entries",
    uuidToSlug(traitListEntryId),
  ],
  speciesVariantTraitListEntryEnumValueSettingList: (
    communityId: string,
    speciesId: string,
    variantId: string,
    traitListEntryId: string
  ) => [
    ...AppRouteParts.speciesVariantTraitListEntryDetail(
      communityId,
      speciesId,
      variantId,
      traitListEntryId
    ),
    "enumValueSettings",
  ],
  speciesVariantTraitListEntryEnumValueSettingDetail: (
    communityId: string,
    speciesId: string,
    variantId: string,
    traitListEntryId: string,
    enumValueSettingId: string
  ) => [
    ...AppRouteParts.speciesVariantTraitListEntryDetail(
      communityId,
      speciesId,
      variantId,
      traitListEntryId
    ),
    "enumValueSettings",
    uuidToSlug(enumValueSettingId),
  ],
  speciesTraitDetail: (
    communityId: string,
    speciesId: string,
    traitId: string
  ) => [
    ...AppRouteParts.speciesTraitList(communityId, speciesId),
    uuidToSlug(traitId),
  ],
  speciesList: (communityId: string) => [
    ...AppRouteParts.community(communityId),
    "species",
  ],
  critterDetail: (
    communityId: string,
    speciesId: string,
    critterId: string
  ) => [
    ...AppRouteParts.speciesDetail(communityId, speciesId),
    "critter",
    uuidToSlug(critterId),
  ],
};

export const appRoute = (id: RouteId): string => {
  const routeToFullPath: Record<string, string> = {};
  const curPath: TypedRouteConfig[] = [];
  forEachRoute(
    (route) => {
      curPath.push(route);
      routeToFullPath[route.id] = curPath
        .map((r) => r.path)
        .join("/")
        .replace(/[/]{2,}/g, "/");
    },
    () => {
      curPath.pop();
    },
    routes
  );
  return routeToFullPath[id];
};

export const AppRoutes = makeRouteObject(AppRouteParts);

function routePartsToRoute(parts: string[]) {
  return ("/" + parts.join("/")).replace(/\/\//g, "");
}

type Args<T> = T extends (...args: infer U) => any ? U : never;

type RouteObject<T extends Record<string, (...args: string[]) => string[]>> = {
  [k in keyof T]: (...args: Args<T[k]>) => string;
};

function makeRouteObject<
  T extends Record<string, (...args: string[]) => string[]>
>(partsObject: T): RouteObject<T> {
  const result = {} as RouteObject<T>;
  for (const [k, v] of Object.entries(partsObject)) {
    const key = k as keyof T;
    result[key] = (...args: string[]) => routePartsToRoute(v(...args));
  }
  return result;
}
