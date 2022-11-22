import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { TraitListListCard } from "./TraitListListCard";

const meta: ComponentMeta<typeof TraitListListCard> = {
  title: "CloverCoin/TraitListListCard",
  component: TraitListListCard,
  argTypes: {},
};

export default meta;

const Template: ComponentStory<typeof TraitListListCard> = (args) => (
  <TraitListListCard {...args} />
);
export const Usage = Template.bind({});
Usage.args = {};
