import { useQuery } from "@apollo/client";
import {
  GetInviteCodeListDocument,
  GetInviteCodeListQuery,
  GetInviteCodeListQueryVariables,
  isInviteCodeList,
  isNotAuthenticatedError,
} from "@clovercoin/api-client";
import { Alert, Grid, IconButton, Stack, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { AppRoutes } from "../AppRoutes";
import { GridRow } from "../lib/GridRow";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { stylesheet } from "../../utils/emotion";
import { useSnackbar } from "../SequentialSnackbar/SequentialSnackbarContext";
import { useBounceToLogin } from "../../hooks/useBounceToLogin";
import { InviteCodeCreateForm } from "../InviteCodeCreateForm/InviteCodeCreateForm";
import { useRouteCommunity } from "../../useRouteCommunity";

export interface InviteCodeListProps {}
export const InviteCodeList: FC<InviteCodeListProps> = () => {
  const bounce = useBounceToLogin();
  const community = useRouteCommunity();
  const { data } = useQuery<
    GetInviteCodeListQuery,
    GetInviteCodeListQueryVariables
  >(GetInviteCodeListDocument, {
    variables: {
      filters: {
        communityId: community?.id || null,
      },
    },
  });

  useEffect(() => {
    if (data && isNotAuthenticatedError(data.inviteCodes)) {
      bounce();
    }
  }, [data]);

  const snackbarQueue = useSnackbar();

  const headerCellProps = {
    item: true,
    xs: community ? 2 : 3,
    component: Typography,
    variant: "body1",
    color: "text.secondary",
    p: 1,
  };
  if (data && isInviteCodeList(data.inviteCodes)) {
    return (
      <Grid container>
        <Grid {...headerCellProps} xs={3}>
          Invite Code
        </Grid>
        <Grid {...headerCellProps} xs={3}>
          Creator
        </Grid>
        {community && <Grid {...headerCellProps}>Role</Grid>}
        <Grid {...headerCellProps}>Times Used</Grid>
        <Grid {...headerCellProps}>Total Uses</Grid>
        {data.inviteCodes.list.map((inviteCode) => (
          <GridRow
            key={inviteCode.id}
            xs={community ? [3, 3, 2, 2, 2] : [3, 3, 3, 3]}
          >
            <Stack alignItems="center" direction="row" p={2}>
              <IconButton
                color="primary"
                css={ss.copyButton}
                onClick={() => {
                  navigator.clipboard.writeText(
                    new URL(
                      `${AppRoutes.register()}?code=${inviteCode.id}`,
                      window.location.href
                    ).toString()
                  );
                  snackbarQueue.append({
                    children: (
                      <Alert
                        variant="filled"
                        severity="success"
                        onClose={snackbarQueue.close}
                      >
                        Link copied: {inviteCode.id}
                      </Alert>
                    ),
                  });
                }}
              >
                <ContentCopyIcon />
              </IconButton>
              <Typography variant="body1">{inviteCode.id}</Typography>
            </Stack>
            <Typography variant="body1" p={2}>
              {inviteCode.creator.displayName}
            </Typography>
            {community && (
              <Typography variant="body1" p={2}>
                {inviteCode.role?.name ?? ""}
              </Typography>
            )}
            <Typography variant="body1" p={2}>
              {inviteCode.claimCount}
            </Typography>
            <Typography variant="body1" p={2}>
              {inviteCode.maxClaims}
            </Typography>
          </GridRow>
        ))}
        <InviteCodeCreateForm />
      </Grid>
    );
  }
  return <></>;
};

export const ss = stylesheet({
  copyButton: (theme) => ({
    marginRight: theme.spacing(2),
  }),
});
