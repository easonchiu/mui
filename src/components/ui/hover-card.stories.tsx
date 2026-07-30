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
  argTypes: {
    align: {
      control: "select",
      options: ["start", "center", "end"],
    },
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

export const BottomAligned: Story = {
  args: {
    trigger: <Button variant="outline">显示在下方</Button>,
    title: "自定义位置",
    description: "通过 contentProps 将浮层方向覆盖为下方。",
    align: "start",
    contentProps: {
      side: "bottom",
    },
  },
}

export const Alignments: Story = {
  render: (args) => (
    <div className="m-12 flex w-lg items-center justify-between">
      <HoverCard
        {...args}
        align="start"
        trigger={<Button variant="outline">左对齐</Button>}
      />
      <HoverCard
        {...args}
        align="center"
        trigger={<Button variant="outline">居中对齐</Button>}
      />
      <HoverCard
        {...args}
        align="end"
        trigger={<Button variant="outline">右对齐</Button>}
      />
    </div>
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    const document = canvasElement.ownerDocument
    const cases = [
      { name: "左对齐", edge: "start" },
      { name: "居中对齐", edge: "center" },
      { name: "右对齐", edge: "end" },
    ] as const

    for (const { name, edge } of cases) {
      const trigger = canvas.getByRole("button", { name })
      await userEvent.click(trigger)

      await waitFor(() => {
        const content = document.querySelector<HTMLElement>(
          '[data-slot="hover-card-content"][data-open]'
        )
        expect(content).not.toBeNull()

        const triggerRect = trigger.getBoundingClientRect()
        const contentRect = content!.getBoundingClientRect()

        if (edge === "start") {
          expect(Math.abs(contentRect.left - triggerRect.left)).toBeLessThan(
            0.5
          )
        } else if (edge === "center") {
          const triggerCenter = (triggerRect.left + triggerRect.right) / 2
          const contentCenter = (contentRect.left + contentRect.right) / 2
          expect(Math.abs(contentCenter - triggerCenter)).toBeLessThan(0.5)
        } else {
          expect(Math.abs(contentRect.right - triggerRect.right)).toBeLessThan(
            0.5
          )
        }
      })
    }
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
      const arrow = canvasElement.ownerDocument.querySelector(
        '[data-slot="hover-card-arrow"]'
      )
      expect(content).toHaveTextContent("已打开")
      expect(arrow).toBeVisible()
    })
  },
}
