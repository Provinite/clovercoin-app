import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { CSSProperties } from "react";
import { GridTable } from "./GridTable";

const meta: ComponentMeta<typeof GridTable> = {
  title: "CloverCoin/GridTable",
  component: GridTable,
  argTypes: {},
};

export default meta;

const Template: ComponentStory<typeof GridTable> = (args) => {
  return <GridTable {...args} />;
};

export const Usage = Template.bind({});
const stylesheet: Record<string, CSSProperties> = {
  gridCell: {
    backgroundColor: "rgba(255, 128, 0, 0.6)",
    border: "1px solid rgba(255, 0, 0, 0.1)",
    margin: "8px",
    padding: "16px",
    borderRadius: "15px",
    textAlign: "center",
  },
};

Usage.args = {
  children: Array(10 * 4)
    .fill(undefined)
    .map((_, i) => {
      return (
        <div key={i} style={{ ...stylesheet.gridCell }}>
          Grid Cell {i}
        </div>
      );
    }),
  numCols: 4,
};
