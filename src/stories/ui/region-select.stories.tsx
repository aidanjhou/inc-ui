import type { Meta, StoryObj } from "@storybook/react";
import { RegionSelect } from "@/components/ui/region-select";

const meta: Meta<typeof RegionSelect> = {
  title: "UI/RegionSelect",
  component: RegionSelect,
  argTypes: {
    placeholder: { control: "text" },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RegionSelect>;

export const Default: Story = {
  args: {
    placeholder: "Select a country...",
  },
};

export const WithValue: Story = {
  args: {
    value: "US",
    placeholder: "Select a country...",
  },
};
