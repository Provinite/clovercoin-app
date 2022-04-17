import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { Card } from "./Card";

const meta: ComponentMeta<typeof Card> = {
  title: "CloverCoin/Card",
  component: Card,
  argTypes: {},
};

export default meta;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;
export const Usage = Template.bind({});
Usage.args = {};
