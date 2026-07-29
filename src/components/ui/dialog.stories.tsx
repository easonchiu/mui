import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"
import { Dialog } from "./dialog"
import { Field } from "./field"
import { Input } from "./input"

const meta = {
  title: "浮层组件/Dialog",
  component: Dialog,
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "编辑组件信息",
    description: "修改组件的显示名称。",
    okText: "保存",
    actionProps: {
      variant: "destructive",
    }
  },
  render: (args) => (
    <Dialog {...args} trigger={<Button variant="outline">打开对话框</Button>}>
      <Field label="名称">
        <Input defaultValue="Button" />
      </Field>
    </Dialog>
  ),
}
