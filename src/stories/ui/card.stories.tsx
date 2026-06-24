import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  argTypes: {
    glass: { control: "boolean" },
    hoverable: { control: "boolean" },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content area. You can put any content here.</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">Card footer</p>
      </CardFooter>
    </Card>
  ),
};

export const Glass: Story = {
  args: { glass: true },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Glass Card</CardTitle>
        <CardDescription>With frosted glass effect</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card has the glass effect applied.</p>
      </CardContent>
    </Card>
  ),
};

export const Hoverable: Story = {
  args: { hoverable: true },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Hoverable Card</CardTitle>
        <CardDescription>Hover over me</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card lifts on hover.</p>
      </CardContent>
    </Card>
  ),
};
