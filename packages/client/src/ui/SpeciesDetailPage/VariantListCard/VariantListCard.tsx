import { FC, useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import { useRouteSpeciesOrFail } from "../useRouteSpecies";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AppRoutes } from "../../AppRoutes";
import { useRouteCommunityOrFail } from "../../../useRouteCommunity";
import { isSpeciesVariant } from "@clovercoin/api-client";
import { ActionData, RouteType } from "../../../routes";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "../../Link/Link";
import { GridRow } from "../../lib/GridRow";
import { usePageTitle } from "../../../hooks/usePageTitle";

export interface VariantListCardProps {}

export const VariantListCard: FC<VariantListCardProps> = () => {
  const species = useRouteSpeciesOrFail();
  const community = useRouteCommunityOrFail();
  const fetcher =
    useFetcher<ActionData<RouteType<"root.community.species.variants">>>();
  const { data } = fetcher;

  const [name, setName] = useState("");

  usePageTitle(`${community.name} - ${species.name} Variants`);

  useEffect(() => {
    if (data && isSpeciesVariant(data)) {
      setName("");
    }
  }, [data]);

  return (
    <Card elevation={1}>
      <CardHeader
        title={`${species.name}: Variants`}
        subheader={`All variants available to ${species.name} are listed here.`}
      />
      <CardContent>
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
            {species.variants.map((variant) => (
              <GridRow key={variant.id} xs={[12, 0]}>
                <Link
                  padding={2}
                  to={AppRoutes.speciesVariantDetail(
                    community.id,
                    species.id,
                    variant.id
                  )}
                  state
                >
                  {variant.name}
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
      </CardContent>
    </Card>
  );
};
