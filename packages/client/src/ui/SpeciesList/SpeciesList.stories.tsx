import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SpeciesList } from "./SpeciesList";
import * as React from "react";
import { v4 } from "uuid";
import { useCallback, useState } from "react";
const meta: ComponentMeta<typeof SpeciesList> = {
  title: "CloverCoin/SpeciesList",
  component: SpeciesList,
  argTypes: {
    onEditClick: {
      description: "Event handler fired when user clicks to edit a species.",
      type: "function",
    },
    onRemoveClick: {
      description: "Event handler fired when user deletes a species.",
      type: "function",
    },
    onSearchTextChange: {
      description:
        "Event handler for changes to the search text. Standard keyboard event handler for an <code>&lt;input&gt;</code> element.",
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
  ],
};

const StandardUsageTemplate: ComponentStory<typeof SpeciesList> = () => {
  const [searchText, setSearchText] = useState("");
  const handler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }, []);
  return (
    <SpeciesList
      onEditClick={() => {}}
      onRemoveClick={() => {}}
      onSearchTextChange={handler}
      searchText={searchText}
      species={[
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
      ]}
    />
  );
};

export const AdvancedUsage = StandardUsageTemplate.bind({});
