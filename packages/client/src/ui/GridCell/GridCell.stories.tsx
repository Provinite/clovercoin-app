import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { GridCell } from "./GridCell";

const meta: ComponentMeta<typeof GridCell> = {
  title: "CloverCoin/GridCell",
  component: GridCell,
  argTypes: {},
};

export default meta;

const Template: ComponentStory<typeof GridCell> = (args) => (
  <GridCell {...args} />
);
export const Usage = Template.bind({});
Usage.args = {};
