import type { Meta, StoryObj } from "@storybook/react-vite"
import { ArrowUpIcon, BellIcon } from "lucide-react"
import { expect, fn } from "storybook/test"

import { Button } from "./button"

const meta = {
  title: "基础组件/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "按钮",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      control: "select",
      options: [
        "default",
        "xs",
        "sm",
        "lg",
        "icon",
        "icon-xs",
        "icon-sm",
        "icon-lg",
      ],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>默认</Button>
      <Button variant="secondary">次要</Button>
      <Button variant="outline">描边</Button>
      <Button variant="ghost">幽灵</Button>
      <Button variant="link">链接</Button>
    </div>
  ),
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "危险操作",
  },
  parameters: {
    a11y: {
      test: "todo",
    },
  },
}

export const WithIcon: Story = {
  render: () => (
    <Button>
      <ArrowUpIcon data-icon="inline-start" />
      上传
    </Button>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">超小</Button>
      <Button size="sm">小按钮</Button>
      <Button>默认按钮</Button>
      <Button size="lg">大按钮</Button>
      <Button size="icon" aria-label="查看通知">
        <BellIcon />
      </Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "不可用",
  },
}

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button loading>默认</Button>
      <Button variant="secondary" loading>
        次要
      </Button>
      <Button variant="outline" loading>
        描边
      </Button>
      <Button variant="ghost" loading>
        幽灵
      </Button>
      <Button variant="destructive" loading>
        危险
      </Button>
      <Button variant="link" loading>
        链接
      </Button>
    </div>
  ),
  parameters: {
    a11y: {
      test: "todo",
    },
  },
}

export const LoadingDarkTheme: Story = {
  ...Loading,
  globals: {
    theme: "dark",
  },
}

export const DarkTheme: Story = {
  ...AllVariants,
  globals: {
    theme: "dark",
  },
}

export const ClickInteraction: Story = {
  args: {
    onClick: fn(),
    children: "点击测试",
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "点击测试" }))
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}
