import { ComponentMeta, ComponentStory } from "@storybook/react";
import { unflatten } from "flat";
import * as React from "react";
import { FC } from "react";
import { flatArgTypes, flattenArgs } from "../../../tools/storybook-utils";
import type { Flatten } from "../../typing/types";
import * as SpeciesListStories from "../SpeciesList/SpeciesList.stories";
import { SpeciesListPage, SpeciesListPageProps } from "./SpeciesListPage";
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
  parameters: {
    layout: "fullscreen",
    actions: { argTypesRegex: ".*?\\.on[A-Z].*" },
  },
  argTypes: flatArgTypes<SpeciesListPageProps>({
    "speciesListProps.onEditClick": {},
    "speciesListProps.onRemoveClick": {},
    "speciesListProps.onSearchTextChange": {},
  }),
};
export default meta;

export const Usage = Template.bind({});
Usage.args = flattenArgs<SpeciesListPageProps>({
  headerBarProps: {
    userIconUrl: "http://placekitten.com/90/90",
    userName: "Mr. Snuggles",
  },
  speciesListProps: {
    ...SpeciesListStories.Usage.args,
    searchText: "",
  },
});
