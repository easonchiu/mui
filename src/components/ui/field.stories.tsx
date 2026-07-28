import type { Meta, StoryObj } from "@storybook/react-vite"

import { Field } from "./field"
import { Input } from "./input"
import { Textarea } from "./textarea"

const meta = {
  title: "表单组件/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  args: {
    label: "邮箱",
    children: <Input />,
  },
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-10">
      <Field label="邮箱" description="用于接收组件发布通知。">
        <Input type="email" placeholder="name@example.com" />
      </Field>

      <Field label="说明">
        <Textarea placeholder="输入组件说明" />
      </Field>
    </div>
  ),
}

export const Invalid: Story = {
  render: () => (
    <Field
      label="组件名称"
      description="组件名称不能为空。"
      data-invalid
      className="w-80"
    >
      <Input aria-invalid defaultValue="" />
    </Field>
  ),
}

export const DarkTheme: Story = {
  ...Default,
  globals: {
    theme: "dark",
  },
}
