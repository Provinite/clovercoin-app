import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { CardTitle } from "./CardHeader";

const meta: ComponentMeta<typeof CardTitle> = {
  title: "CloverCoin/CardHeader",
  component: CardTitle,
  argTypes: {},
};

export default meta;

const Template: ComponentStory<typeof CardTitle> = (args) => (
  <CardTitle {...args} />
);
export const Usage = Template.bind({});
Usage.args = {};
