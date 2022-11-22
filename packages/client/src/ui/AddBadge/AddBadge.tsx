import { FunctionComponent } from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";
import { Link } from "@mui/material";
import { StyleProps } from "../aphrodite/StyleProps";

export const AddBadge: FunctionComponent<LinkProps & StyleProps> = ({
  ...props
}) => (
  <Link
    component={RouterLink}
    {...props}
    css={{
      textDecoration: "none",
    }}
  />
);
