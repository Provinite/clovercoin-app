import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { UserIcon } from "../UserIcon/UserIcon";
import { UserNameDisplay } from "./UserNameDisplay";

const meta: ComponentMeta<typeof UserNameDisplay> = {
  title: "CloverCoin/lib/UserNameDisplay",
  component: UserNameDisplay,
  subcomponents: { UserIcon },
  argTypes: {
    name: {
      description:
        "User display name, shown in large text vertically centered w/ the icon",
    },
    styles: {
      description: "Aphrodite CSS overrides for sub-blocks",
    },
  },
};

export default meta;

const Template: ComponentStory<typeof UserNameDisplay> = (args) => (
  <UserNameDisplay {...args} />
);
export const Usage = Template.bind({});
Usage.args = {
  name: "Pickles",
};
