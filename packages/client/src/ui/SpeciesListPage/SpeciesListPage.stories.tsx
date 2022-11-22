import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { v4 } from "uuid";
import { SpeciesListPage } from "./SpeciesListPage";

const meta: ComponentMeta<typeof SpeciesListPage> = {
  title: "CloverCoin/SpeciesListPage",
  component: SpeciesListPage,
  argTypes: {},
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const Template: ComponentStory<typeof SpeciesListPage> = (args) => (
  <SpeciesListPage {...args} />
);

let n = 200;

export const Usage = Template.bind({});
Usage.args = {
  loading: false,
  headerBarProps: {
    title: "Species",
    userIconUrl: "http://placekitten.com/90/90",
    userName: "Mr. Snuggles",
  },
  onSpeciesClick: undefined,
  data: {
    species: [
      species({ name: "Pillowings" }),
      species({ name: "Lintlings" }),
      species({ name: "Swunny" }),
      species({ name: "Mundi Felidae" }),
    ],
  },
};

function species({ name }: { name: string }) {
  ++n;
  console.log(n);
  return {
    id: v4(),
    name,
    traitLists: [],
    iconUrl: `http://placekitten.com/${n}/${n}`,
  };
}
