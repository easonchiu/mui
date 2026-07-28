import type { Meta, StoryObj } from "@storybook/react-vite"

import { Progress } from "./progress"

const meta = {
  title: "反馈组件/Progress",
  component: Progress,
  tags: ["autodocs"],
  args: {
    className: "max-w-md",
    label: "组件覆盖率",
    value: 68,
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutValue: Story = {
  args: {
    label: "文件上传",
    showValue: false,
    value: 42,
  },
}

export const Indeterminate: Story = {
  args: {
    label: "正在处理",
    value: null,
  },
}

export const DarkTheme: Story = {
  globals: {
    theme: "dark",
  },
}
