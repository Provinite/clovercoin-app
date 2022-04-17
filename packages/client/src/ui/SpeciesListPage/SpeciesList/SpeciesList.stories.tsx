import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SpeciesList } from "./SpeciesList";
import * as React from "react";
import { v4 } from "uuid";
import { useState } from "react";
import { ListViewSpecies } from "../../../models/Species";
const meta: ComponentMeta<typeof SpeciesList> = {
  title: "CloverCoin/Pages/Species List/SpeciesList",
  component: SpeciesList,
  argTypes: {
    onRowClick: {
      description:
        "Event handler for clicks on list rows. Invoked with the species.",
    },
    species: {
      description: "Array of species to display in the table",
    },
  },
};
export default meta;

const Template: ComponentStory<typeof SpeciesList> = (args) => (
  <SpeciesList {...args} />
);

export const Usage = Template.bind({});
Usage.args = {
  species: [
    {
      id: v4(),
      name: "Pillowings",
    },
    {
      id: v4(),
      name: "Lintlings",
    },
    {
      id: v4(),
      name: "Mundi Felidae",
    },
    {
      id: v4(),
      name: "Swunny",
    },
    {
      id: v4(),
      name: "Swamp Swine",
    },
    {
      id: v4(),
      name: "Slickers",
    },
    {
      id: v4(),
      name: "Birdeer",
    },
    {
      id: v4(),
      name: "Domestic Cocktraice",
    },
    {
      id: v4(),
      name: "Flutter Foxes",
    },
    {
      id: v4(),
      name: "Ceriflumes",
    },
    {
      id: v4(),
      name: "Clawed Jackalope",
    },
  ],
};

const StandardUsageTemplate: ComponentStory<typeof SpeciesList> = () => {
  const [selectedSpecies, setSelectedSpecies] = useState<
    ListViewSpecies | undefined
  >(undefined);

  const [species] = useState<ListViewSpecies[]>([
    {
      id: v4(),
      name: "Pillowings",
    },
    {
      id: v4(),
      name: "Lintlings",
    },
    {
      id: v4(),
      name: "Mundi Felidae",
    },
  ]);

  return (
    <SpeciesList
      onRowClick={setSelectedSpecies}
      selectedSpecies={selectedSpecies}
      species={species}
    />
  );
};

export const AdvancedUsage = StandardUsageTemplate.bind({});
