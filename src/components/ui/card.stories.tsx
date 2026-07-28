import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"

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
    <Card className="w-96">
      <CardHeader>
        <CardTitle>组件卡片</CardTitle>
        <CardDescription>用于承载一组相关信息和操作。</CardDescription>
      </CardHeader>
      <CardContent>
        <p>内容区域使用组件库统一的主题、间距和字体。</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">确认</Button>
      </CardFooter>
    </Card>
  ),
}

export const Small: Story = {
  render: () => (
    <Card className="w-96" size="sm">
      <CardHeader>
        <CardTitle>紧凑卡片</CardTitle>
        <CardDescription>使用较小的内容间距。</CardDescription>
      </CardHeader>
      <CardContent>适合信息密度较高的界面。</CardContent>
    </Card>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>账户额度</CardTitle>
        <CardDescription>当前可用额度为 1,280 Credits。</CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">
            查看明细
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <strong className="text-2xl font-semibold">1,280</strong>
      </CardContent>
    </Card>
  ),
}

export const DarkTheme: Story = {
  ...Default,
  globals: {
    theme: "dark",
  },
}
