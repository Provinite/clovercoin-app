import { useQuery } from "@apollo/client";
import {
  GetIdentityListDocument,
  GetIdentityListQuery,
  isIdentityList,
  isNotAuthenticatedError,
} from "@clovercoin/api-client";
import { Box, Grid, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { useBounceToLogin } from "../../hooks/useBounceToLogin";
import { GridRow } from "../lib/GridRow";

export interface UserListProps {}
export const UserList: FC<UserListProps> = () => {
  const { data } = useQuery<GetIdentityListQuery>(GetIdentityListDocument);
  const bounce = useBounceToLogin();
  useEffect(() => {
    if (isNotAuthenticatedError(data?.identities)) {
      bounce();
    }
  }, [data]);
  if (data && isIdentityList(data.identities)) {
    return (
      <Grid container component={Box}>
        <GridRow xs={[6, 6]}>
          <Typography p={1} variant="body1" color="text.secondary">
            Username
          </Typography>
          <Typography p={1} variant="body1" color="text.secondary">
            Email
          </Typography>
        </GridRow>
        {data.identities.list.map((identity) => (
          <GridRow key={identity.id} xs={[6, 6]}>
            <Typography p={2} variant="body1">
              {identity.displayName}
            </Typography>
            <Typography p={2} variant="body1">
              {identity.email}
            </Typography>
          </GridRow>
        ))}
      </Grid>
    );
  }
  return <></>;
};
