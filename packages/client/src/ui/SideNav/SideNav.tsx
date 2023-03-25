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
import { useMatch, useNavigate, LinkProps } from "react-router-dom";
import { SideBar } from "../SideBar/SideBar";
import { Link } from "../Link/Link";
import { isNullish } from "../util/isNullish";

export const SideNavLink: FC<NavItem> = (props) => {
  const { childNavItems, to, icon, partialUrlMatch, ...rest } = props;
  const match = useMatch({
    path: to,
    caseSensitive: false,
    end: isNullish(partialUrlMatch) ? true : !partialUrlMatch,
  });
  const { level } = useContext(NavListContext);
  const navigate = useNavigate();
  return (
    <>
      <ListItem
        css={(theme) => ({
          paddingLeft: theme.spacing(1 + 2 * level),
        })}
        button
        onClick={() => navigate(to)}
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

export interface NavItem extends Omit<LinkProps, "to"> {
  to: string;
  childNavItems?: NavItem[];
  /**
   * Icon to render next to the nav link.
   * @example
   * import CoolIcon from "@mui/icons-material/Cool";
   * const icon = <CoolIcon />;
   */
  icon?: ReactNode;
  /**
   * If true, the link will be rendered in the active state when
   * the url is that specified in `to` is active, or any route
   * prefixed with `to`.
   *
   * @default false
   */
  partialUrlMatch?: boolean;
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

const ss = {
  navLink: {},
  activeLink: {
    textDecoration: "none",
  },
};
