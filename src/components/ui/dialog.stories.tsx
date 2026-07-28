import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import { Field, FieldGroup, FieldLabel } from "./field"
import { Input } from "./input"

const meta = {
  title: "浮层组件/Dialog",
  component: Dialog,
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        打开对话框
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>编辑组件信息</DialogTitle>
          <DialogDescription>修改组件的显示名称。</DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="dialog-component-name">名称</FieldLabel>
            <Input id="dialog-component-name" defaultValue="Button" />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button>保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
