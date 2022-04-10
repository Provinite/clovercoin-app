import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { SpeciesListProvider } from "./SpeciesListProvider";
import { GetSpeciesListViewDocument } from "../../generated/graphql";
import * as SpeciesListStories from "../SpeciesList/SpeciesList.stories";

const Template: ComponentStory<typeof SpeciesListProvider> = (args) => (
  <SpeciesListProvider {...args} />
);

const meta: ComponentMeta<typeof SpeciesListProvider> = {
  title: "CloverCoin/Pages/SpeciesListProvider",
  component: Template,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

export const Usage = Template.bind({});
Usage.args = {};
Usage.parameters = {
  apolloClient: {
    mocks: [
      {
        delay: 1500,
        request: {
          query: GetSpeciesListViewDocument,
        },
        result: {
          data: {
            species: SpeciesListStories.Usage.args?.species ?? [],
          },
        },
      },
    ],
  },
};
