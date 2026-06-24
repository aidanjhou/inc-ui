import type { Meta, StoryObj } from "@storybook/react";
import { DatetimeSelect } from "@/components/ui/datetime-select";

const meta: Meta<typeof DatetimeSelect> = {
  title: "UI/DatetimeSelect",
  component: DatetimeSelect,
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
type Story = StoryObj<typeof DatetimeSelect>;

export const Default: Story = {
  args: {
    placeholder: "Select date & time...",
  },
};
