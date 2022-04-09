import { GetSpeciesListViewQuery } from "../generated/graphql";

export type ListViewSpecies = GetSpeciesListViewQuery["species"][number];
