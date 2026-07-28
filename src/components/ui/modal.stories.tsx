import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"
import { FormItem } from "./form-item"
import { Input } from "./input"
import { Modal } from "./modal"

const meta = {
  title: "浮层组件/Modal",
  component: Modal,
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "编辑组件信息",
  },
  render: function ModalStory() {
    const [open, setOpen] = React.useState(false)

    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          打开弹窗
        </Button>
        <Modal
          title="编辑组件信息"
          description="使用受控 API，无需手动组合 Dialog 子组件。"
          open={open}
          onOpenChange={setOpen}
          onOk={() => setOpen(false)}
        >
          <FormItem label="名称" htmlFor="modal-component-name">
            <Input id="modal-component-name" defaultValue="Button" />
          </FormItem>
        </Modal>
      </>
    )
  },
}
