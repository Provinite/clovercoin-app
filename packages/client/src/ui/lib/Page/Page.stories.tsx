import { ComponentMeta, ComponentStory } from "@storybook/react";
import { StyleSheet } from "aphrodite";
import * as React from "react";
import { useMemo } from "react";
import { Color } from "../styles/colors";
import { Page } from "./Page";

const meta: ComponentMeta<typeof Page> = {
  title: "CloverCoin/lib/Page",
  component: Page,
  argTypes: {
    styles: {
      control: { type: null },
    },
  },
};

export default meta;

const Template: ComponentStory<typeof Page> = (args) => {
  const ss = useMemo(() => {
    return StyleSheet.create({
      visiblePage: {
        backgroundColor: Color.List.cellBorder,
        border: "1px solid black",
      },
    });
  }, []);

  return <Page {...args} styles={[ss.visiblePage]} />;
};
export const Usage = Template.bind({});
Usage.args = {};
