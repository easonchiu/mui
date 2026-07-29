import type { Meta, StoryObj } from "@storybook/react-vite"

import { AlertDialog } from "./alert-dialog"
import { Button } from "./button"

const meta = {
  title: "浮层组件/Alert Dialog",
  component: AlertDialog,
  tags: ["autodocs"],
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "确认发布组件？",
    description: "发布后，使用当前版本的项目会收到组件更新。",
    okText: "确认发布",
  },
  render: (args) => (
    <AlertDialog
      {...args}
      trigger={<Button variant="outline">打开确认对话框</Button>}
    />
  ),
}
