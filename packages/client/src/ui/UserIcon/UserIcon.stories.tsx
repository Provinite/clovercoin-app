import { ComponentMeta, ComponentStory } from "@storybook/react";
import { UserIcon, UserIconSize } from "../../ui/UserIcon/UserIcon";
import * as React from "react";
import { Circle } from "../../ui/Circle/Circle";

const meta: ComponentMeta<typeof UserIcon> = {
  title: "CloverCoin/UserIcon",
  component: UserIcon,
  subcomponents: { Circle },
  argTypes: {
    size: {
      defaultValue: UserIconSize.medium,
      description: "Size of the user icon (UserIconSize enum)",
    },
    url: {
      defaultValue: undefined,
      description:
        "URL of the user's profile image. Omit to display an empty circle.",
    },
  },
};

export default meta;

const Template: ComponentStory<typeof UserIcon> = (args) => (
  <UserIcon {...args} />
);
export const Usage = Template.bind({});
Usage.args = {
  url: "http://placekitten.com/100/100",
  size: UserIconSize.medium,
};

export const Small = Template.bind({});
Small.args = {
  url: "http://placekitten.com/60/60",
  size: UserIconSize.small,
};

export const Medium = Template.bind({});
Medium.args = {
  size: UserIconSize.medium,
  url: "http://placekitten.com/100/100",
};

export const Large = Template.bind({});
Large.args = {
  size: UserIconSize.large,
  url: "http://placekitten.com/200/200",
};
export const NoIcon = Template.bind({});
NoIcon.args = {};
