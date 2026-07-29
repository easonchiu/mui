import type { Meta, StoryObj } from "@storybook/react-vite"
import { CalendarDaysIcon } from "lucide-react"
import { expect, waitFor } from "storybook/test"

import { Avatar } from "./avatar"
import { Button } from "./button"
import { HoverCard } from "./hover-card"

const meta = {
  title: "浮层组件/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
  args: {
    trigger: <Button variant="outline">悬停查看</Button>,
    title: "mui",
    description: "基于 shadcn/ui 与 Base UI 的共享 React 组件库。",
  },
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const UserProfile: Story = {
  args: {
    trigger: (
      <Button variant="link" className="normal-case">
        @eason
      </Button>
    ),
    title: (
      <div className="flex items-center gap-3">
        <Avatar fallback="EC" alt="Eason" />
        <div>
          <div className="font-semibold">Eason</div>
          <div className="text-xs font-normal text-muted-foreground">
            @eason
          </div>
        </div>
      </div>
    ),
    description: "负责维护 mui 组件库和统一的产品界面规范。",
    children: (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <CalendarDaysIcon className="size-3.5" />
        2026 年 7 月加入
      </div>
    ),
    contentProps: {
      align: "start",
      className: "w-80",
    },
  },
}

export const CustomDelay: Story = {
  args: {
    trigger: <Button variant="outline">延迟打开</Button>,
    delay: 500,
    closeDelay: 200,
    title: "延迟控制",
    description: "悬停 500ms 后打开，移开 200ms 后关闭。",
  },
}

export const TopAligned: Story = {
  args: {
    trigger: <Button variant="outline">显示在上方</Button>,
    title: "自定义位置",
    description: "通过 contentProps 设置浮层方向和对齐方式。",
    contentProps: {
      side: "top",
      align: "start",
    },
  },
}

export const DarkTheme: Story = {
  ...UserProfile,
  globals: {
    theme: "dark",
  },
}

export const HoverInteraction: Story = {
  args: {
    trigger: <Button variant="outline">交互测试</Button>,
    delay: 0,
    title: "已打开",
    description: "Hover Card 可以通过鼠标悬停和键盘聚焦打开。",
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.hover(canvas.getByRole("button", { name: "交互测试" }))

    await waitFor(() => {
      const content = canvasElement.ownerDocument.querySelector(
        '[data-slot="hover-card-content"]'
      )
      expect(content).toHaveTextContent("已打开")
    })
  },
}
