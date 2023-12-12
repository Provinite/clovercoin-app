import { PropsOf } from "@emotion/react";
import { Link as MuiLink } from "@mui/material";
import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { stylesheet } from "../../utils/emotion";

export type LinkProps = PropsOf<typeof MuiLink> & PropsOf<typeof RouterLink>;

/**
 * Component for most standard link use cases. Renders a {@link MuiLink}
 * using the {@link RouterLink} to enable navigation using react-router-dom
 * and receive MUI styling.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <MuiLink ref={ref} component={RouterLink} {...props} css={ss.link} />
));
const ss = stylesheet({
  link: {
    textDecoration: "none",
  },
});
