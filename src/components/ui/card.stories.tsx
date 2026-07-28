import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"
import { Card } from "./card"

const meta = {
  title: "基础组件/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card
      className="w-96"
      title="组件卡片"
      description="用于承载一组相关信息和操作。"
      footer={<Button size="sm">确认</Button>}
    >
      内容区域使用组件库统一的主题、间距和字体。
    </Card>
  ),
}

export const Small: Story = {
  render: () => (
    <Card
      className="w-96"
      size="sm"
      title="紧凑卡片"
      description="使用较小的内容间距。"
    >
      适合信息密度较高的界面。
    </Card>
  ),
}

export const WithExtra: Story = {
  render: () => (
    <Card
      className="w-96"
      title="账户额度"
      description="当前可用额度为 1,280 Credits。"
      extra={
        <Button size="sm" variant="outline">
          查看明细
        </Button>
      }
    >
      <strong className="text-2xl font-semibold">1,280</strong>
    </Card>
  ),
}

export const ContentOnly: Story = {
  render: () => <Card className="w-96">仅包含内容的简单卡片。</Card>,
}

export const DarkTheme: Story = {
  ...Default,
  globals: {
    theme: "dark",
  },
}
