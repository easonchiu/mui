import type { Meta, StoryObj } from "@storybook/react-vite"

import { Separator } from "./separator"

const meta = {
  title: "基础组件/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-4">
      <p className="text-sm">组件信息</p>
      <Separator />
      <p className="text-sm text-muted-foreground">由 Base UI 提供交互基础。</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-6 items-center gap-4">
      <span>文档</span>
      <Separator orientation="vertical" />
      <span>示例</span>
      <Separator orientation="vertical" />
      <span>API</span>
    </div>
  ),
}
