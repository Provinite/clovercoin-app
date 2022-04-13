import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { link, MockDefinition } from "../../../tools/storybook-utils";
import {
  GetSpeciesListViewDocument,
  GetSpeciesListViewQuery,
  GetSpeciesListViewQueryVariables,
} from "../../generated/graphql";
import * as SpeciesListStories from "./SpeciesList/SpeciesList.stories";
import { SpeciesListProvider } from "./SpeciesListProvider";
const Template: ComponentStory<typeof SpeciesListProvider> = (args) => (
  <SpeciesListProvider {...args} />
);

const meta: ComponentMeta<typeof SpeciesListProvider> = {
  title: "CloverCoin/Pages/Species List/SpeciesListProvider",
  component: SpeciesListProvider,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

export const Usage = Template.bind({});
Usage.args = {};

const species = SpeciesListStories.Usage.args?.species ?? [];

const mocks: MockDefinition<
  GetSpeciesListViewQuery,
  GetSpeciesListViewQueryVariables
>[] = [
  {
    delay: 1500,
    request: {
      query: GetSpeciesListViewDocument,
      variables: {
        name: () => true,
      },
    },
    result: ({ variables: { name } }) => ({
      data: {
        species: name
          ? species.filter((s) =>
              s.name.toLowerCase().includes(name.toLowerCase())
            )
          : [...species],
      },
    }),
  },
];

Usage.parameters = {
  apolloClient: link(mocks),
};
