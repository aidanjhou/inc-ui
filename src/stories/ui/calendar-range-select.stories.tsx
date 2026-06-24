import type { Meta, StoryObj } from "@storybook/react";
import { RangeCalendarSelect } from "@/components/ui/calendar-range-select";

const meta: Meta<typeof RangeCalendarSelect> = {
  title: "UI/RangeCalendarSelect",
  component: RangeCalendarSelect,
  argTypes: {
    variant: {
      control: "select",
      options: ["dropdown", "picker", "action-sheet", "bottom-modal", "center-modal"],
    },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RangeCalendarSelect>;

export const Default: Story = {
  args: {
    placeholder: "Pick a date range...",
  },
};

export const WithValue: Story = {
  args: {
    value: `${String(new Date().getTime())},${String(new Date(new Date().setDate(new Date().getDate() + 3)).getTime())}`,
    placeholder: "Pick a date range...",
  },
};
