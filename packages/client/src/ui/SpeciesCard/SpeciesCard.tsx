import { Species } from "@clovercoin/api-client";
import { Typography } from "@mui/material";
import { useCallback } from "react";
import { useFetcher } from "react-router-dom";
import { useRouteCommunity } from "../../useRouteCommunity";
import { AppRoutes } from "../AppRoutes";
import { ImageCard } from "../ImageCard/ImageCard";

export interface SpeciesCardProps {
  species: Pick<Species, "iconUrl" | "name" | "id">;
  onClick?: (species: SpeciesCardProps["species"]) => void;
  className?: string;
}

export const SpeciesCard = ({
  species,
  onClick,
  className,
}: SpeciesCardProps) => {
  const fetcher = useFetcher();
  const hasUploadForm = !species.iconUrl;

  const { id: communityId } = useRouteCommunity();

  const handleUpload = useCallback(
    async (files: File[]) => {
      const data = new FormData();
      data.set("iconUrl", files[0]);
      await fetcher.submit(data, {
        action: AppRoutes.speciesDetail(communityId, species.id),
        method: "patch",
        encType: "multipart/form-data",
      });
    },
    [communityId, species, fetcher.submit]
  );

  return (
    <ImageCard
      className={className}
      CardProps={{ onClick: onClick?.bind(null, species) }}
      clickable={Boolean(onClick)}
      onUpload={hasUploadForm ? handleUpload : undefined}
      image={species.iconUrl ?? ""}
    >
      <Typography variant="overline">{species.name}</Typography>
    </ImageCard>
  );
};
