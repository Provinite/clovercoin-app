import React, {
  ElementType,
  FC,
  ForwardedRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { HeaderBar, HeaderBarSpacer } from "../HeaderBar/HeaderBar";
import { HeaderBarProps } from "../HeaderBar/HeaderBarProps";
import {
  GetSpeciesListViewQuery,
  NarrowToSpeciesList,
} from "@clovercoin/api-client";
import { SpeciesCard } from "../SpeciesCard/SpeciesCard";
import { useFetcher } from "react-router-dom";
import { useRouteCommunityOrFail } from "../../useRouteCommunity";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { SideNav } from "../SideNav/SideNav";
import { AppRoutes } from "../AppRoutes";
import { ImageCard } from "../ImageCard/ImageCard";
import { If } from "../util/If";
import { stylesheet } from "../../utils/emotion";
import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";
import { ActionData, RouteType } from "../../routes";
import { useSnackbar } from "../SequentialSnackbar/SequentialSnackbarContext";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SpaIcon from "@mui/icons-material/Spa";
import SettingsIcon from "@mui/icons-material/Settings";
import { usePageTitle } from "../../hooks/usePageTitle";

export interface SpeciesListPageProps {
  headerBarProps: HeaderBarProps;
  data: NarrowToSpeciesList<GetSpeciesListViewQuery["species"]>;
  onSpeciesClick?: (
    species: NarrowToSpeciesList<
      GetSpeciesListViewQuery["species"]
    >["list"][number]
  ) => void;
}

export const SpeciesListPage: FC<SpeciesListPageProps> = ({
  headerBarProps,
  data,
  onSpeciesClick,
}) => {
  const community = useRouteCommunityOrFail();
  usePageTitle(`${community.name} - Species List`);

  const [showAddForm, setShowAddForm] = useState(false);
  const fetcher =
    useFetcher<ActionData<RouteType<"root.community.species-list">>>();
  const [name, setName] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const snackbarQueue = useSnackbar();
  useEffect(() => {
    if (fetcher.state === "idle") {
      const data = fetcher.data;
      if (data) {
        snackbarQueue.appendSimpleError(
          `Failed to create species: ${data.message}`
        );
      } else {
        setShowAddForm(false);
        setName("");
      }
    }
  }, [fetcher]);

  return (
    <>
      <HeaderBar {...headerBarProps} title={`${community.name}: Species`} />
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
        }}
      >
        <SideNav
          navItems={[
            {
              to: AppRoutes.communityList(),
              children: community.name,
              icon: <SpaIcon />,
              childNavItems: [
                {
                  to: AppRoutes.speciesList(community.id),
                  children: "Species",
                  icon: <MovieFilterIcon />,
                },
                {
                  to: AppRoutes.communitySettings(community.id),
                  children: "Community Settings",
                  icon: <SettingsIcon />,
                },
              ],
            },
            {
              to: AppRoutes.admin(),
              children: "Site Administration",
              icon: <AdminPanelSettingsIcon />,
            },
          ]}
        />
        <div css={{ flexGrow: 1 }}>
          <HeaderBarSpacer />
          <Grid container css={{ paddingTop: "18px" }} spacing={2}>
            {data.list.map((species) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                css={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={species.id}
              >
                <SpeciesCard
                  css={{ width: "200px", height: "250px" }}
                  species={species}
                  onClick={
                    onSpeciesClick ? () => onSpeciesClick(species) : undefined
                  }
                />
              </Grid>
            ))}
            {/* Species Add Card */}
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              css={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <fetcher.Form
                action={AppRoutes.speciesList(community.id)}
                method="post"
                onSubmit={(e) => {
                  if (!showConfirmDialog) {
                    e.preventDefault();
                    setShowConfirmDialog(true);
                  }
                }}
                ref={formRef}
              >
                <ImageCard
                  CardProps={{
                    onClick: showAddForm
                      ? undefined
                      : () => setShowAddForm(true),
                  }}
                  CardMediaProps={{
                    component: showAddForm ? SpeciesAddFormButton : AddIcon,
                    loading: showAddForm ? fetcher.state !== "idle" : undefined,
                    disabled: showAddForm ? !name : undefined,
                    type: "submit",
                    css: ss.addCardMedia,
                  }}
                  clickable={!showAddForm}
                  css={{ width: "200px", height: "250px" }}
                >
                  <If condition={!showAddForm}>
                    <Typography variant="overline" color="primary">
                      Add One
                    </Typography>
                  </If>
                  <If condition={showAddForm}>
                    <TextField
                      label="Name"
                      name="name"
                      fullWidth
                      variant="outlined"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoFocus
                    />
                    <input type="hidden" name="iconUrl" value="" />
                  </If>
                </ImageCard>
              </fetcher.Form>
            </Grid>
          </Grid>
        </div>
      </div>
      <Dialog
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
      >
        <DialogTitle>Create a new species?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to create a new species called "{name}"?
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => setShowConfirmDialog(false)}>No</Button>
            <Button
              onClick={async () => {
                setShowConfirmDialog(false);
                fetcher.submit(formRef.current);
              }}
            >
              Yes
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

const SpeciesAddFormButton = React.forwardRef(function <
  T extends ElementType<any>
>(props: LoadingButtonProps<T>, ref: ForwardedRef<HTMLButtonElement>) {
  return (
    <LoadingButton ref={ref} {...props}>
      <CheckIcon />
    </LoadingButton>
  );
});

const ss = stylesheet({
  addCardMedia: (theme) => ({
    borderStyle: "solid",
    borderWidth: "2px",
    borderColor: theme.palette.divider,
    svg: { width: "100%", height: "100%" },
  }),
});

declare module "react" {
  function forwardRef<T, P = Record<string, any>>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}
