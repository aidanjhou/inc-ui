import type { Meta, StoryObj } from "@storybook/react";
import { RangeCalendar } from "@/components/ui/calendar";

const meta: Meta<typeof RangeCalendar> = {
  title: "UI/RangeCalendar",
  component: RangeCalendar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RangeCalendar>;

export const Default: Story = {};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: `${String(new Date().getTime())},${String(new Date(new Date().setDate(new Date().getDate() + 7)).getTime())}`,
  },
};
