import type { Meta, StoryObj } from "@storybook/react-vite"
import { BadgeCheckIcon } from "lucide-react"

import { Badge } from "./badge"

const meta = {
  title: "数据展示/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "已发布",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
      ],
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>默认</Badge>
      <Badge variant="secondary">次要</Badge>
      <Badge variant="outline">柔和</Badge>
      <Badge variant="ghost">强调</Badge>
      <Badge variant="link">链接</Badge>
    </div>
  ),
}

export const DarkTheme: Story = {
  ...Variants,
  globals: {
    theme: "dark",
  },
}

export const WithIcon: Story = {
  render: () => (
    <Badge>
      <BadgeCheckIcon data-icon="inline-start" />
      已验证
    </Badge>
  ),
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "已停用",
  },
  parameters: {
    a11y: {
      test: "todo",
    },
  },
}
