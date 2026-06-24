import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "@/components/ui/grid";

const meta: Meta<typeof Grid> = {
  title: "UI/Grid",
  component: Grid,
  argTypes: {
    height: { control: "number" },
    autoGenerate: { control: "boolean" },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Grid>;

const sampleData = [
  { name: "Alice", age: 30, city: "New York", role: "Engineer" },
  { name: "Bob", age: 25, city: "San Francisco", role: "Designer" },
  { name: "Charlie", age: 35, city: "London", role: "Manager" },
  { name: "Diana", age: 28, city: "Berlin", role: "Developer" },
  { name: "Eve", age: 32, city: "Tokyo", role: "Analyst" },
];

export const AutoGenerate: Story = {
  args: {
    data: sampleData,
    autoGenerate: true,
    height: 300,
  },
};

export const CustomColumns: Story = {
  args: {
    data: sampleData,
    columns: [
      { key: "name", headerText: "Name", sort: true },
      { key: "age", headerText: "Age", sort: true, filter: true },
      { key: "city", headerText: "City", filter: true },
      { key: "role", headerText: "Role" },
    ],
    height: 300,
  },
};
