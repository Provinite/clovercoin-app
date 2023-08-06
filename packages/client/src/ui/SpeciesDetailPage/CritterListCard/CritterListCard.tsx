import { Community, Critter, Species } from "@clovercoin/api-client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardProps,
  Grid,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { AppRoutes } from "../../AppRoutes";
import { GridRow } from "../../lib/GridRow";
import { Link } from "../../Link/Link";

export interface CritterListCardProps extends CardProps {
  species: Pick<Species, "name" | "id">;
  community: Pick<Community, "id">;
  critters: Pick<Critter, "id" | "name">[];
}

export const CritterListCard: FC<CritterListCardProps> = ({
  species,
  community,
  critters,
  ...props
}) => {
  return (
    <Card {...props}>
      <CardHeader
        title={`${species.name} Critter List`}
        action={
          <Link to={AppRoutes.addCritter(community.id, species.id)}>
            <Button variant="contained">Add One</Button>
          </Link>
        }
        subheader={`Find specific ${species.name} here`}
      />
      <CardContent>
        <Grid container component={Box}>
          <GridRow xs={[10, 2]}>
            <Typography p={1} variant="body1">
              Name
            </Typography>
            <Typography p={1} variant="body1">
              Actions
            </Typography>
          </GridRow>
          {critters.map((critter) => (
            <GridRow key={critter.id} xs={[10, 2]}>
              <Typography p={2} variant="body1">
                {critter.name}
              </Typography>
              <></>
            </GridRow>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};
