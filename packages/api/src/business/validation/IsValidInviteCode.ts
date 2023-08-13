import { Matches } from "class-validator";

export const IsValidInviteCode = () =>
  Matches(/^[a-zA-Z0-9_-]+$/, {
    message:
      "Invite code id may only contain numbers, letters, underscores, and hyphens",
  });
