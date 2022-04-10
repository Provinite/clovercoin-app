import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { __name__ } from "./__name__";

const meta: ComponentMeta<typeof __name__> = {
  title: "CloverCoin/__name__",
  component: __name__,
  argTypes: {},
};

export default meta;

const Template: ComponentStory<typeof __name__> = (args) => (
  <__name__ {...args} />
);
export const Usage = Template.bind({});
Usage.args = {};
