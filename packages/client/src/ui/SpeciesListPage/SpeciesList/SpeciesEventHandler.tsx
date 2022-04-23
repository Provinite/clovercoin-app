import type { ListViewSpecies } from "../../../models/Species";

/**
 * Handler for events whose data is a single list view species.
 */
export type SpeciesEventHandler = (species: ListViewSpecies) => void;
