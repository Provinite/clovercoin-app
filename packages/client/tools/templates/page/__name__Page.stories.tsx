import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { __name__Page } from "./__name__Page";

const meta: ComponentMeta<typeof __name__Page> = {
  title: "CloverCoin/__name__Page",
  component: __name__Page,
  argTypes: {},
};

export default meta;

const Template: ComponentStory<typeof __name__Page> = (args) => (
  <__name__Page {...args} />
);
export const Usage = Template.bind({});
Usage.args = {};
