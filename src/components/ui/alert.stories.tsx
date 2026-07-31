import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
  SparklesIcon,
} from "lucide-react"

import { Alert } from "./alert"
import { Button } from "./button"

const meta = {
  title: "反馈组件/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Alert
      className="max-w-xl"
      icon={<CircleCheckIcon />}
      title="账户更新成功"
      description="你的个人资料已经保存，修改将立即生效。"
    />
  ),
}

export const DescriptionAsChildren: Story = {
  render: () => (
    <Alert className="max-w-xl" icon={<InfoIcon />} title="提示">
      你可以通过简化 API 直接将 children 作为描述内容。
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert
      className="max-w-xl"
      variant="destructive"
      icon={<CircleXIcon />}
      title="支付失败"
      description="无法处理本次付款，请检查支付方式后重试。"
    />
  ),
}

export const WithAction: Story = {
  render: () => (
    <Alert
      className="max-w-xl"
      icon={<SparklesIcon />}
      title="新功能已上线"
      description="现在可以在个人设置中启用深色模式。"
      action={
        <Button size="xs" variant="outline">
          启用
        </Button>
      }
    />
  ),
}

export const DarkTheme: Story = {
  ...Default,
  globals: {
    theme: "dark",
  },
}
