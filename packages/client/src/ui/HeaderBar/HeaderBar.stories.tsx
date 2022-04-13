import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { HeaderBar } from "./HeaderBar";
import { UserNameDisplay } from "../lib/UserNameDisplay/UserNameDisplay";

const meta: ComponentMeta<typeof HeaderBar> = {
  title: "CloverCoin/lib/HeaderBar",
  component: HeaderBar,
  subcomponents: { UserNameDisplay },
  argTypes: {
    title: {
      description: "Page Title",
    },
    userIconUrl: {
      description: "Icon of logged in user (if any)",
    },
    userName: {
      description: "Display name of logged in user (if any)",
    },
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const Template: ComponentStory<typeof HeaderBar> = (args) => (
  <HeaderBar {...args} />
);
export const Usage = Template.bind({});
Usage.args = {
  title: "Dashboard",
  userIconUrl: "http://placekitten.com/100/100",
  userName: "Provinite",
};
