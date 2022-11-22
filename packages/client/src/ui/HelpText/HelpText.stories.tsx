import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { HelpText } from "./HelpText";

const meta: ComponentMeta<typeof HelpText> = {
  title: "CloverCoin/HelpText",
  component: HelpText,
  argTypes: {},
};

export default meta;

const Template: ComponentStory<typeof HelpText> = (args) => (
  <HelpText {...args} />
);
export const Usage = Template.bind({});
Usage.args = {
  children:
    "The <HelpText> component renders text in a callout with a help icon. " +
    "Use this to provide helpful context to a user. This component is stylable " +
    "using aphrodite overrides on the `styles` prop.",
};

export const RichUsage = Template.bind({});
RichUsage.args = {
  children: (
    <>
      This component can be used with any react child, not just string nodes. So
      you can include <a href="#">Links</a> or whatever using JSX.
    </>
  ),
};
