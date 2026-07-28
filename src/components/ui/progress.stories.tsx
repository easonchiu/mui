import type { Meta, StoryObj } from "@storybook/react-vite"

import { Progress, ProgressLabel, ProgressValue } from "./progress"

const meta = {
  title: "反馈组件/Progress",
  component: Progress,
  tags: ["autodocs"],
  args: {
    value: 68,
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Progress value={68} className="max-w-md">
      <ProgressLabel>组件覆盖率</ProgressLabel>
      <ProgressValue />
    </Progress>
  ),
}

export const Indeterminate: Story = {
  render: () => (
    <Progress value={null} className="max-w-md">
      <ProgressLabel>正在处理</ProgressLabel>
    </Progress>
  ),
}
