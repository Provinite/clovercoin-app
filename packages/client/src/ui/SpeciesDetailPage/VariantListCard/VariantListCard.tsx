import { FC, useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import { useRouteSpecies } from "../useRouteSpecies";
import {
  Button,
  Card,
  CardHeader,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AppRoutes } from "../../AppRoutes";
import { useRouteCommunity } from "../../../useRouteCommunity";
import { isTraitList } from "@clovercoin/api-client";
import { ActionData, RouteType } from "../../../routes";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "../../Link/Link";
import { GridRow } from "../../lib/GridRow";

export interface VariantListCardProps {}

export const VariantListCard: FC<VariantListCardProps> = () => {
  const species = useRouteSpecies();
  const community = useRouteCommunity();
  const fetcher =
    useFetcher<ActionData<RouteType<"root.community.species.variants">>>();
  const { data } = fetcher;

  const [name, setName] = useState("");

  useEffect(() => {
    if (data && isTraitList(data)) {
      setName("");
    }
  }, [data]);

  return (
    <Card elevation={1}>
      <CardHeader
        title={`${species.name}: Variants`}
        subheader={`All variants available to ${species.name} are listed here.`}
      />
      <fetcher.Form
        action={AppRoutes.speciesVariantList(community.id, species.id)}
        method="post"
      >
        <Grid container>
          <GridRow xs={[6, 6]}>
            <Typography p={2} variant="body1" color="text.secondary">
              Variant Name
            </Typography>
            <></>
          </GridRow>
          {species.traitLists.map((traitList) => (
            <GridRow key={traitList.id} xs={[12, 0]}>
              <Link
                padding={2}
                to={AppRoutes.speciesVariantDetail(
                  community.id,
                  species.id,
                  traitList.id
                )}
                state
              >
                {traitList.name}
              </Link>
              <></>
            </GridRow>
          ))}

          <GridRow
            xs={[6, 2, 4]}
            css={{
              ":hover": {
                ".MuiGrid-item": {
                  backgroundColor: "unset",
                },
              },
            }}
          >
            <TextField
              name="name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              css={(theme) => ({ margin: theme.spacing(2) })}
            />
            <Stack
              p={2}
              pl={2}
              pr={2}
              direction="column"
              justifyContent="center"
              flexGrow={1}
            >
              <Button disabled={!name} type="submit" variant="contained">
                <AddIcon fontSize="large" />
              </Button>
            </Stack>
            <></>
          </GridRow>
        </Grid>
      </fetcher.Form>
    </Card>
  );
};
