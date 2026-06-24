import type { Meta, StoryObj } from "@storybook/react";
import { Loading } from "@/components/ui/loading";

const meta: Meta<typeof Loading> = {
  title: "UI/Loading",
  component: Loading,
  argTypes: {
    variant: {
      control: "select",
      options: ["none", "success", "error", "warning", "info", "loading"],
    },
    open: { control: "boolean" },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  args: {
    open: true,
    children: "Loading...",
  },
};

export const Success: Story = {
  args: {
    open: true,
    variant: "success",
    children: "Done!",
  },
};

export const Error: Story = {
  args: {
    open: true,
    variant: "error",
    children: "Failed to load",
  },
};

export const CustomLabel: Story = {
  args: {
    open: true,
    children: "Please wait...",
    label: "Custom accessible label",
  },
};
