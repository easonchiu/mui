import type { Meta, StoryObj } from "@storybook/react-vite"

import { Field, FieldDescription, FieldGroup, FieldLabel } from "./field"
import { Input } from "./input"
import { Textarea } from "./textarea"

const meta = {
  title: "表单组件/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <FieldGroup className="max-w-md">
      <Field>
        <FieldLabel htmlFor="field-email">邮箱</FieldLabel>
        <Input id="field-email" type="email" placeholder="name@example.com" />
        <FieldDescription>用于接收组件发布通知。</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="field-description">说明</FieldLabel>
        <Textarea id="field-description" placeholder="输入组件说明" />
      </Field>
    </FieldGroup>
  ),
}

export const Invalid: Story = {
  render: () => (
    <Field data-invalid className="w-80">
      <FieldLabel htmlFor="field-invalid">组件名称</FieldLabel>
      <Input id="field-invalid" aria-invalid defaultValue="" />
      <FieldDescription>组件名称不能为空。</FieldDescription>
    </Field>
  ),
}
