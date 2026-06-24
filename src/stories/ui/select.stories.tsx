import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "@/components/ui/select";

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
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
type Story = StoryObj<typeof Select>;

const fruitOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
  { value: "watermelon", label: "Watermelon" },
];

export const Default: Story = {
  args: {
    options: fruitOptions,
    placeholder: "Select a fruit...",
  },
};

export const WithValue: Story = {
  args: {
    options: fruitOptions,
    value: "banana",
    placeholder: "Select a fruit...",
  },
};

export const Searchable: Story = {
  args: {
    options: fruitOptions,
    placeholder: "Search fruits...",
  },
};

export const Clearable: Story = {
  args: {
    options: fruitOptions,
    placeholder: "Select (clearable)...",
  },
};

export const Disabled: Story = {
  args: {
    options: fruitOptions,
    placeholder: "Disabled",
    disabled: true,
  },
};
