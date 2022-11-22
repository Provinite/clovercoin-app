import {
  ListItem,
  ListItemText,
  ListProps,
  List,
  Link,
  ListItemIcon,
} from "@mui/material";
import {
  FC,
  useContext,
  createContext,
  FunctionComponent,
  useMemo,
  ReactNode,
} from "react";
import { css } from "@emotion/react";
import {
  useMatch,
  useNavigate,
  Link as RouterLink,
  LinkProps,
} from "react-router-dom";
import { SideBar } from "../SideBar/SideBar";

const ss = {
  navLink: {},
  activeLink: css({
    textDecoration: "none",
    cursor: "default",
    ":hover": {
      textDecoration: "none",
    },
  }),
};

export const SideNavLink: FC<NavItem> = (props) => {
  const { childNavItems, to, icon, ...rest } = props;
  const match = useMatch(to as string);
  const listContext = useContext(NavListContext);
  const navigate = useNavigate();
  return (
    <>
      <ListItem
        sx={{
          pl: 2 * listContext.level,
        }}
        button
        onClick={match ? () => null : () => navigate(to)}
      >
        <ListItemIcon style={{ minWidth: "34px" }}>{icon}</ListItemIcon>
        <ListItemText>
          <Link
            component={RouterLink}
            color={match ? "inherit" : undefined}
            css={[ss.navLink, match ? ss.activeLink : undefined]}
            to={to}
            {...rest}
          />
        </ListItemText>
      </ListItem>
      {childNavItems && (
        <NavList disablePadding={true} navItems={childNavItems} />
      )}
    </>
  );
};

export interface NavItem extends LinkProps {
  childNavItems?: NavItem[];
  icon?: ReactNode;
}

export interface NavListProps extends ListProps {
  navItems: NavItem[];
}

const NavListContext = createContext({ level: -1 });

export const NavList: FunctionComponent<NavListProps> = ({
  navItems,
  ...props
}) => {
  const parentContext = useContext(NavListContext);
  const childContext = useMemo(
    () => ({
      level: parentContext.level + 1,
    }),
    [parentContext.level]
  );
  return (
    <NavListContext.Provider value={childContext}>
      <List component="div" {...(props as any)}>
        {navItems.map((props) => (
          <SideNavLink {...props} key={props.to as string} />
        ))}
      </List>
    </NavListContext.Provider>
  );
};

export const SideNav: FC<NavListProps> = (props) => {
  return (
    <SideBar>
      <NavList {...props} />
    </SideBar>
  );
};
