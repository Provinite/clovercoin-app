import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { GridTable } from "./GridTable";

const meta: ComponentMeta<typeof GridTable> = {
  title: "CloverCoin/GridTable",
  component: GridTable,
  argTypes: {},
};

export default meta;

const Template: ComponentStory<typeof GridTable> = (args) => (
  <GridTable {...args} />
);
export const Usage = Template.bind({});
Usage.args = {};
