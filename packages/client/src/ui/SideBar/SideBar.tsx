import { Drawer, Paper } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";
import { HeaderBarSpacer } from "../HeaderBar/HeaderBar";

export const SideBar: FunctionComponent<{
  children?: ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <Drawer
    variant="permanent"
    css={{
      width: "240px",
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: "240px", boxSizing: "border-box" },
    }}
    className={className}
  >
    <HeaderBarSpacer />
    <Paper css={{ flexGrow: 1 }}>{children}</Paper>
  </Drawer>
);
