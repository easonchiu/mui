import type { Meta, StoryObj } from "@storybook/react-vite"

import { Field, FieldDescription, FieldLabel } from "./field"
import { Input } from "./input"

const meta = {
  title: "表单组件/Input",
  component: Input,
  tags: ["autodocs"],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Field className="w-80">
      <FieldLabel htmlFor="input-email">邮箱</FieldLabel>
      <Input id="input-email" type="email" placeholder="name@example.com" />
      <FieldDescription>请输入常用邮箱地址。</FieldDescription>
    </Field>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Field data-disabled className="w-80">
      <FieldLabel htmlFor="input-disabled">不可编辑</FieldLabel>
      <Input id="input-disabled" disabled defaultValue="mui" />
    </Field>
  ),
}
