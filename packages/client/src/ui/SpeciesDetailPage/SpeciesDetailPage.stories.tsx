import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { SpeciesDetailPage } from "./SpeciesDetailPage";

const meta: ComponentMeta<typeof SpeciesDetailPage> = {
  title: "CloverCoin/SpeciesDetailPagePage",
  component: SpeciesDetailPage,
  argTypes: {},
};

export default meta;

const Template: ComponentStory<typeof SpeciesDetailPage> = (args) => (
  <SpeciesDetailPage {...args} />
);
export const Usage = Template.bind({});
Usage.args = {};
