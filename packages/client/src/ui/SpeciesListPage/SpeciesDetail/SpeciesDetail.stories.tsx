import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { SpeciesDetail } from "./SpeciesDetail";
import * as SpeciesListStories from "../SpeciesList/SpeciesList.stories";
const meta: ComponentMeta<typeof SpeciesDetail> = {
  title: "CloverCoin/SpeciesDetail",
  component: SpeciesDetail,
  argTypes: {},
};

export default meta;

const Template: ComponentStory<typeof SpeciesDetail> = (args) => (
  <SpeciesDetail {...args} />
);
export const Usage = Template.bind({});
Usage.args = {
  species: SpeciesListStories.Usage.args?.species![0],
};
