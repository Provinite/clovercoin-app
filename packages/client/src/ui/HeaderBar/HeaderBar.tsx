import { FC, useState } from "react";
import { HeaderBarProps } from "./HeaderBarProps";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { If } from "../util/If";
import { stylesheet } from "../../utils/emotion";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "../Link/Link";
import { AppRoutes } from "../AppRoutes";
import SettingsIcon from "@mui/icons-material/Settings";
export const HeaderBar: FC<HeaderBarProps> = ({
  title,
  userName,
  userIconUrl,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <AppBar position="fixed" css={ss.root}>
      <Toolbar css={ss.toolbar} sx={{ p: 0 }}>
        <Typography variant="h5" noWrap component="div">
          {title}
        </Typography>
        <Box css={ss.fullWidth} />
        <Button
          onClick={({ currentTarget }) => {
            setAnchorEl(currentTarget);
            setOpen(true);
          }}
        >
          <If condition={Boolean(userName)}>
            <Typography variant="h6" css={ss.username}>
              {userName}
            </Typography>
          </If>
          <If condition={Boolean(userIconUrl)}>
            <Avatar src={userIconUrl} variant="square" css={ss.avatar} />
          </If>
        </Button>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            horizontal: "right",
            vertical: "bottom",
          }}
          open={open}
          onClose={() => {
            setOpen(false);
            setAnchorEl(null);
          }}
          css={ss.menu}
        >
          <MenuItem component={Link} to={AppRoutes.logout()} css={ss.menu}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2">Log Out</Typography>
            </ListItemText>
          </MenuItem>
          <MenuItem component={Link} to={AppRoutes.userSettings()}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2">Settings</Typography>
            </ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export const ss = stylesheet({
  root: (theme) => ({ zIndex: theme.zIndex.drawer + 1 }),
  toolbar: { height: "76px" },
  fullWidth: { flexGrow: 1 },
  avatar: {
    width: "60px",
    height: "60px",
    cursor: "pointer",
  },
  username: (theme) => ({ marginRight: theme.spacing(2) }),
  menu: {
    minWidth: "200px",
  },
});

export const HeaderBarSpacer = () => <Toolbar css={ss.toolbar} />;
