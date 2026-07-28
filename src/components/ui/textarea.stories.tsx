import type { Meta, StoryObj } from "@storybook/react-vite"

import { Field, FieldDescription, FieldLabel } from "./field"
import { Textarea } from "./textarea"

const meta = {
  title: "表单组件/Textarea",
  component: Textarea,
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Field className="w-96">
      <FieldLabel htmlFor="textarea-description">组件说明</FieldLabel>
      <Textarea
        id="textarea-description"
        placeholder="输入组件的适用场景和注意事项"
      />
      <FieldDescription>建议控制在 200 字以内。</FieldDescription>
    </Field>
  ),
}
