import type { Meta, StoryObj } from "@storybook/react";
import { CalendarSelect } from "@/components/ui/calendar-select";

const meta: Meta<typeof CalendarSelect> = {
  title: "UI/CalendarSelect",
  component: CalendarSelect,
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
type Story = StoryObj<typeof CalendarSelect>;

export const Default: Story = {
  args: {
    placeholder: "Pick a date...",
  },
};

export const WithValue: Story = {
  args: {
    value: String(new Date().getTime()),
    placeholder: "Pick a date...",
  },
};
