import type { Meta, StoryObj } from "@storybook/react";
import { Chart } from "@/components/ui/chart";

const meta: Meta<typeof Chart> = {
  title: "UI/Chart",
  component: Chart,
  argTypes: {
    type: {
      control: "select",
      options: ["line", "area", "bar", "pie", "donut", "radialBar", "scatter", "bubble", "heatmap", "candlestick", "rangeBar", "radar", "polarArea"],
    },
    height: { control: "number" },
    loading: { control: "boolean" },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Chart>;

export const Line: Story = {
  args: {
    type: "line",
    series: [
      {
        name: "Series A",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
    options: {
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      },
    },
    height: 350,
  },
};

export const Bar: Story = {
  args: {
    type: "bar",
    series: [
      {
        name: "Sales",
        data: [44, 55, 57, 56, 61, 58],
      },
    ],
    options: {
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      },
    },
    height: 350,
  },
};

export const Pie: Story = {
  args: {
    type: "pie",
    series: [44, 55, 13, 43, 22],
    options: {
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    },
    height: 350,
  },
};

export const Area: Story = {
  args: {
    type: "area",
    series: [
      {
        name: "Visitors",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
    options: {
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    },
    height: 350,
  },
};

export const Loading: Story = {
  args: {
    type: "line",
    loading: true,
    loadingText: "Loading chart...",
    height: 350,
  },
};
