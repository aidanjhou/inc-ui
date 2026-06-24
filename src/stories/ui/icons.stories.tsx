import type { Meta, StoryObj } from "@storybook/react";
import {
  CheckCircleIcon,
  InfoCircleIcon,
  ExclamationCircleIcon,
  CloseCircleIcon,
  LoadingIcon,
} from "@/components/ui/icons";

const IconsGallery = () => (
  <div className="flex flex-wrap gap-6 p-4">
    {[
      { name: "CheckCircleIcon", component: <CheckCircleIcon /> },
      { name: "InfoCircleIcon", component: <InfoCircleIcon /> },
      { name: "ExclamationCircleIcon", component: <ExclamationCircleIcon /> },
      { name: "CloseCircleIcon", component: <CloseCircleIcon /> },
      { name: "LoadingIcon", component: <LoadingIcon /> },
    ].map(({ name, component }) => (
      <div key={name} className="flex flex-col items-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-background">
          {component}
        </div>
        <span className="text-xs text-muted-foreground">{name}</span>
      </div>
    ))}
  </div>
);

const meta: Meta = {
  title: "UI/Icons",
  component: IconsGallery,
  tags: ["autodocs"],
};

export default meta;

export const AllIcons: StoryObj = {
  render: () => <IconsGallery />,
};
