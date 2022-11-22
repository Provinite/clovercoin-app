import { Drawer, Paper, Toolbar } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";

export const SideBar: FunctionComponent<{
  children?: ReactNode;
}> = ({ children }) => (
  <Drawer
    variant="permanent"
    css={{
      width: "240px",
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: "240px", boxSizing: "border-box" },
    }}
  >
    <Toolbar />
    <Paper css={{ flexGrow: 1 }}>{children}</Paper>
  </Drawer>
);
