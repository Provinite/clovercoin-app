import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { UserList } from "./UserList";

const meta: ComponentMeta<typeof UserList> = {
  title: "CloverCoin/UserList",
  component: UserList,
  argTypes: {},
};

export default meta;

const Template: ComponentStory<typeof UserList> = (args) => (
  <UserList {...args} />
);
export const Usage = Template.bind({});
Usage.args = {};
