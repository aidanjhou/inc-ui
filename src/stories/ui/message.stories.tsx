import type { Meta, StoryObj } from "@storybook/react";
import { Message, MessagePrompter } from "@/components/ui/message";
import { Button } from "@/components/ui/button";
import { message } from "@/hooks/message";

const meta: Meta<typeof Message> = {
  title: "UI/Message",
  component: Message,
  argTypes: {
    variant: {
      control: "select",
      options: ["none", "success", "error", "warning", "info", "loading"],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Message>;

export const Info: Story = {
  args: {
    children: "This is an informational message.",
    variant: "info",
  },
};

export const Success: Story = {
  args: {
    children: "Operation completed successfully!",
    variant: "success",
  },
};

export const Error: Story = {
  args: {
    children: "Something went wrong. Please try again.",
    variant: "error",
  },
};

export const Warning: Story = {
  args: {
    children: "Please review your input before submitting.",
    variant: "warning",
  },
};

export const Loading: Story = {
  args: {
    children: "Processing your request...",
    variant: "loading",
  },
};

export const WithDescription: Story = {
  args: {
    children: "Info",
    description: "Additional details about this message can go here.",
    variant: "info",
  },
};

export const UtilityUsage = () => {
  return (
    <div className="flex flex-col gap-4 items-start">
      <MessagePrompter />
      <div className="flex flex-wrap gap-4">
        <Button 
          variant="primary"
          onClick={() => message.success("Operation successful!")}
        >
          Show Success
        </Button>
        <Button 
          variant="destructive"
          onClick={() => message.error("Something went wrong!")}
        >
          Show Error
        </Button>
        <Button 
          variant="secondary"
          onClick={() => message.info("Here is some information.")}
        >
          Show Info
        </Button>
        <Button 
          variant="secondary"
          onClick={() => {
            message.success("Profile updated.", {
              description: "Your changes have been saved successfully.",
            });
          }}
        >
          With Description
        </Button>
        <Button 
          variant="default"
          onClick={() => {
            const id = message.loading("Uploading...");
            setTimeout(() => {
              message.update(id as string | number, "success", "Upload complete!");
            }, 2000);
          }}
        >
          Loading & Update
        </Button>
      </div>
    </div>
  );
};

UtilityUsage.parameters = {
  docs: {
    description: {
      story: "The `message` object from `@/hooks/message` provides an imperative API for triggering toast notifications. **Note:** You must render `<MessagePrompter />` at the root of your application for the toasts to be visible.",
    },
  },
};
