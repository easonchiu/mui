import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, waitFor } from "storybook/test"

import { Button } from "./button"
import { createToastManager, Toaster } from "./toast"

const meta = {
  title: "反馈组件/Toast",
  component: Toaster,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

function ToastDemo({ mode = "default" }: { mode?: "default" | "action" }) {
  const manager = React.useMemo(() => createToastManager(), [])

  const showDefault = () => {
    manager.add({
      title: "操作已完成",
      description: "数据已经成功保存。",
    })
  }

  const showAction = () => {
    const id = manager.add({
      title: "记录已删除",
      description: "你可以撤销本次操作。",
      type: "success",
      actionProps: {
        children: "撤销",
        onClick() {
          manager.close(id)
        },
      },
    })
  }

  return (
    <Toaster toastManager={manager}>
      <Button onClick={mode === "action" ? showAction : showDefault}>
        显示通知
      </Button>
    </Toaster>
  )
}

function ToastTypesDemo() {
  const manager = React.useMemo(() => createToastManager(), [])

  return (
    <Toaster toastManager={manager}>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() => manager.add({ title: "默认通知" })}
        >
          默认
        </Button>
        <Button
          variant="outline"
          onClick={() => manager.add({ title: "保存成功", type: "success" })}
        >
          成功
        </Button>
        <Button
          variant="outline"
          onClick={() => manager.add({ title: "提示信息", type: "info" })}
        >
          信息
        </Button>
        <Button
          variant="outline"
          onClick={() => manager.add({ title: "请注意", type: "warning" })}
        >
          警告
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            manager.add({ title: "操作失败", type: "error", priority: "high" })
          }
        >
          错误
        </Button>
        <Button
          variant="outline"
          onClick={() => manager.add({ title: "处理中", type: "loading" })}
        >
          加载
        </Button>
      </div>
    </Toaster>
  )
}

export const Default: Story = {
  render: () => <ToastDemo />,
}

export const Types: Story = {
  render: () => <ToastTypesDemo />,
}

export const WithAction: Story = {
  render: () => <ToastDemo mode="action" />,
}

export const DarkTheme: Story = {
  ...Types,
  globals: {
    theme: "dark",
  },
}

export const Interaction: Story = {
  render: () => <ToastDemo />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "显示通知" }))

    await waitFor(() => {
      const document = canvasElement.ownerDocument
      const viewport = document.querySelector('[data-slot="toast-viewport"]')
      const toast = document.querySelector('[data-slot="toast"]')

      expect(viewport).toHaveClass("top-4")
      expect(viewport).not.toHaveClass("bottom-4")
      expect(viewport).not.toHaveClass("w-auto")
      expect(toast).toHaveTextContent("操作已完成")
    })
  },
}
