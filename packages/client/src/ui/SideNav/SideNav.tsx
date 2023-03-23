import {
  ListItem,
  ListItemText,
  ListProps,
  List,
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
import { useMatch, useNavigate, LinkProps } from "react-router-dom";
import { SideBar } from "../SideBar/SideBar";
import { Link } from "../Link/Link";
import { noop } from "../util/noop";
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
  const { level } = useContext(NavListContext);
  const navigate = useNavigate();
  return (
    <>
      <ListItem
        css={(theme) => ({
          paddingLeft: theme.spacing(1 + 2 * level),
        })}
        button
        onClick={match ? noop : () => navigate(to)}
      >
        <ListItemIcon style={{ minWidth: "34px" }}>{icon}</ListItemIcon>
        <ListItemText>
          <Link
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
  const { level } = useContext(NavListContext);
  const childContext = useMemo(
    () => ({
      level: level + 1,
    }),
    [level]
  );
  return (
    <NavListContext.Provider value={childContext}>
      <List component="div" {...(props as any)}>
        {navItems.map((navItem) => (
          <SideNavLink {...navItem} key={navItem.to as string} />
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
