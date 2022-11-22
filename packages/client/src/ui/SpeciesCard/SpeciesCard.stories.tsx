import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { SpeciesCard } from "./SpeciesCard";

const meta: ComponentMeta<typeof SpeciesCard> = {
  title: "CloverCoin/SpeciesCard",
  component: SpeciesCard,
  argTypes: {},
};

export default meta;

const Template: ComponentStory<typeof SpeciesCard> = (args) => (
  <SpeciesCard {...args} />
);
export const Usage = Template.bind({});
Usage.args = {
  species: {
    iconUrl: "http://placekitten.com/200/200",
    name: "Kitterlings",
  },
};
