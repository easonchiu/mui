import type { Meta, StoryObj } from "@storybook/react-vite"

import { Field } from "./field"
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
    <Field
      className="w-96"
      label="组件说明"
      description="建议控制在 200 字以内。"
    >
      <Textarea placeholder="输入组件的适用场景和注意事项" />
    </Field>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="grid w-96 gap-3">
      <Textarea size="xs" aria-label="超小文本域" placeholder="超小文本域" />
      <Textarea size="sm" aria-label="小文本域" placeholder="小文本域" />
      <Textarea aria-label="默认文本域" placeholder="默认文本域" />
      <Textarea size="lg" aria-label="大文本域" placeholder="大文本域" />
    </div>
  ),
}

export const Error: Story = {
  render: () => (
    <Field
      data-invalid
      className="w-96"
      label="组件说明"
      description="组件说明格式不正确。"
    >
      <Textarea error defaultValue="内容格式不正确" />
    </Field>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Textarea
      className="w-96"
      aria-label="禁用文本域"
      disabled
      defaultValue="不可编辑的内容"
    />
  ),
}

export const DarkTheme: Story = {
  ...Default,
  globals: {
    theme: "dark",
  },
}

export const ErrorDarkTheme: Story = {
  ...Error,
  globals: {
    theme: "dark",
  },
}
