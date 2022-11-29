import { Typography } from "@mui/material";
import { Species } from "../../generated/graphql";
import { ImageCard } from "../ImageCard/ImageCard";

export interface SpeciesCardProps {
  species: Pick<Species, "iconUrl" | "name">;
  onClick?: (species: SpeciesCardProps["species"]) => void;
  className?: string;
}

export const SpeciesCard = ({
  species,
  onClick,
  className,
}: SpeciesCardProps) => {
  return (
    <ImageCard
      className={className}
      CardProps={{ onClick: onClick?.bind(null, species) }}
      clickable={Boolean(onClick)}
      image={species.iconUrl}
    >
      <Typography variant="overline">{species.name}</Typography>
    </ImageCard>
  );
};
