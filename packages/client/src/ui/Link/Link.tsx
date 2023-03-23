import { PropsOf } from "@emotion/react";
import { Link as MuiLink } from "@mui/material";
import { FunctionComponent } from "react";
import { Link as RouterLink } from "react-router-dom";

/**
 * Component for most standard link use cases. Renders a {@link MuiLink}
 * using the {@link RouterLink} to enable navigation using react-router-dom
 * and receive MUI styling.
 */
export const Link: FunctionComponent<
  PropsOf<typeof MuiLink> & PropsOf<typeof RouterLink>
> = (props) => (
  <MuiLink component={RouterLink} {...props} css={{ textDecoration: "none" }} />
);
