import type { Identity } from "./Identity.js";

export type IdentityPermissionKeys = keyof Identity & `can${string}`;
