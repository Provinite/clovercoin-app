import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { FC } from "react";
import { SpeciesListPage, SpeciesListPageProps } from "./SpeciesListPage";

import { flatten, unflatten } from "flat";
import { Flatten } from "../../typing/types";
import { SpeciesListProps } from "../SpeciesList/SpeciesList";
import * as SpeciesListStories from "../SpeciesList/SpeciesList.stories";
import * as HeaderBarStories from "../HeaderBar/HeaderBar.stories";
const delimiter = ".";

type FlatProps = Flatten<SpeciesListPageProps, ".">;
const Template: ComponentStory<FC<FlatProps>> = (args) => (
  <SpeciesListPage
    {...unflatten<FlatProps, SpeciesListPageProps>(args, { delimiter })}
  />
);
const meta: ComponentMeta<FC<FlatProps>> = {
  title: "CloverCoin/Pages/SpeciesListPage",
  component: Template,
  argTypes: {
    "speciesListProps.onEditClick": {},
    "speciesListProps.onRemoveClick": {},
    "speciesListProps.onSearchTextChange": {},
  },
  parameters: {
    layout: "fullscreen",
    actions: { argTypesRegex: ".*?\\.on[A-Z].*" },
  },
};
export default meta;

export const Usage = Template.bind({});
Usage.args = flatten<SpeciesListPageProps, FlatProps>(
  {
    headerBarProps: {
      ...HeaderBarStories.Usage.args,
    },
    speciesListProps: {
      ...SpeciesListStories.Usage.args,
      searchText: "",
    } as SpeciesListProps,
  },
  { delimiter, safe: true }
);
