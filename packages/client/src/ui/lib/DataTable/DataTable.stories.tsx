import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DataTable } from "./DataTable";
import * as React from "react";
import { UserIcon, UserIconSize } from "../../UserIcon/UserIcon";

const meta: ComponentMeta<typeof DataTable> = {
  component: DataTable,
  title: "CloverCoin/DataTable",
};

export default meta;

const Template: ComponentStory<typeof DataTable> = (args) => (
  <DataTable {...args} />
);

export const Usage = Template.bind({});
Usage.args = {
  data: [
    { id: 1, name: "Provinite", icon: "http://placekitten.com/90/90" },
    { id: 2, name: "A2J", icon: "http://placekitten.com/80/80" },
  ],
  columns: [
    {
      name: "",
      selector: (s: any) => <UserIcon url={s.icon} size={UserIconSize.small} />,
      width: 1,
    },
    {
      name: "ID",
      selector: (s: any) => s.id,
      width: 1,
    },
    {
      name: "Name",
      selector: (s: any) => s.name,
      width: 10,
    },
  ],
};
