import * as React from "react";
import { FC } from "react";
import { Species } from "../../generated/graphql";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

export interface SpeciesCardProps {
  species: Pick<Species, "iconUrl" | "name">;
  onClick?: (species: SpeciesCardProps["species"]) => void;
}

export const SpeciesCard: FC<SpeciesCardProps> = ({ species, onClick }) => {
  return (
    <Grid
      item
      xs={6}
      sm={4}
      lg={3}
      css={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card
        css={{ width: "200px", height: "250px" }}
        elevation={1}
        onClick={onClick ? () => onClick(species) : () => null}
        variant="elevation"
      >
        <CardActionArea
          css={{
            height: "100%",
          }}
        >
          <CardContent
            css={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <CardMedia component="img" image={species.iconUrl} height="140" />
            <Typography variant="overline">{species.name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
