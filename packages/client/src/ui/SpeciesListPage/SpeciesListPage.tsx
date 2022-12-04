import React, {
  ElementType,
  FC,
  ForwardedRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { HeaderBar } from "../HeaderBar/HeaderBar";
import { HeaderBarProps } from "../HeaderBar/HeaderBarProps";
import {
  GetSpeciesListViewQuery,
  NarrowToSpeciesList,
} from "@clovercoin/api-client";
import { SpeciesCard } from "../SpeciesCard/SpeciesCard";
import { useFetcher } from "react-router-dom";
import { useRouteCommunity } from "../../useRouteCommunity";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { SideNav } from "../SideNav/SideNav";
import { AppRoutes } from "../AppRoutes";
import { ImageCard } from "../ImageCard/ImageCard";
import { If } from "../util/If";
import { stylesheet } from "../../utils/emotion";
import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";
import { ActionData, RouteType } from "../../routes";
import {
  SequentialSnackbar,
  useSnackbarQueue,
} from "../SequentialSnackbar/SequentialSnackbar";
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
  const [showAddForm, setShowAddForm] = useState(false);
  const fetcher =
    useFetcher<ActionData<RouteType<"root.community.species-list">>>();
  const community = useRouteCommunity();
  const [name, setName] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const snackbarQueue = useSnackbarQueue();
  useEffect(() => {
    if (fetcher.state === "idle") {
      const data = fetcher.data;
      if (data) {
        // error
        snackbarQueue.append({
          children: (
            <Alert severity="error" onClose={snackbarQueue.close}>
              Failed to create species: {data.message}
            </Alert>
          ),
        });
      } else {
        setShowAddForm(false);
        setName("");
      }
    }
  }, [fetcher]);

  return (
    <>
      <HeaderBar {...headerBarProps} title={`${community.name} Species`} />
      <SequentialSnackbar queue={snackbarQueue} />
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
              to: AppRoutes.speciesList(community.id),
              children: "Species",
              icon: <MovieFilterIcon />,
            },
          ]}
        />
        <div css={{ flexGrow: 1 }}>
          <Toolbar />
          <Grid container css={{ paddingTop: "18px" }} spacing={2}>
            {data.list.map((s) => (
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
                key={s.id}
              >
                <SpeciesCard
                  css={{ width: "200px", height: "250px" }}
                  species={s}
                  onClick={onSpeciesClick ? () => onSpeciesClick(s) : undefined}
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
              onClick={() => {
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
