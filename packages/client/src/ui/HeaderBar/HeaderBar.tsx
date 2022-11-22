import { FC } from "react";
import { HeaderBarProps } from "./HeaderBarProps";
import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";
import { If } from "../util/If";
export const HeaderBar: FC<HeaderBarProps> = ({
  title,
  userName,
  userIconUrl,
}) => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h5" noWrap component="div">
          {title}
        </Typography>
        <Box css={{ flexGrow: 1 }} />
        <If condition={Boolean(userIconUrl)}>
          <If condition={Boolean(userName)}>
            <Typography variant="h6" css={{ marginRight: "16px" }}>
              {userName}
            </Typography>
          </If>
          <Avatar
            src={userIconUrl}
            css={{
              width: "60px",
              height: "60px",
            }}
          />
        </If>
      </Toolbar>
    </AppBar>
  );
};
