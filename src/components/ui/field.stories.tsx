import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"

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

export const Required: Story = {
  render: () => (
    <Field
      label="组件名称"
      description="请输入容易识别的名称。"
      required
      className="w-80"
    >
      <Input placeholder="例如 Button" />
    </Field>
  ),
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("textbox", { name: "组件名称" })
    await expect(input).toBeRequired()
    await expect(input).toBeInvalid()
    await userEvent.click(canvas.getByText("组件名称"))
    await expect(input).toHaveFocus()
    await userEvent.type(input, "Button")
    await expect(input).toBeValid()
  },
}

export const Error: Story = {
  render: () => (
    <Field
      label="组件名称"
      description="请输入容易识别的名称。"
      error="组件名称不能为空。"
      required
      className="w-80"
    >
      <Input defaultValue="" />
    </Field>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole("textbox", { name: "组件名称" })
    await expect(input).toHaveAttribute("aria-invalid", "true")
    await expect(input).toHaveAccessibleDescription("组件名称不能为空。")
    await expect(canvas.getByRole("alert")).toHaveTextContent(
      "组件名称不能为空。"
    )
    await expect(canvas.queryByText("请输入容易识别的名称。")).toBeNull()
  },
}

export const ErrorRecovery: Story = {
  render: function ErrorRecoveryStory() {
    const [error, setError] = React.useState<string | undefined>(
      "组件名称不能为空。"
    )

    return (
      <Field
        label="组件名称"
        description="请输入容易识别的名称。"
        error={error}
        className="w-80"
      >
        <Input onChange={() => setError(undefined)} />
      </Field>
    )
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("textbox", { name: "组件名称" })
    await expect(input).toHaveAttribute("aria-invalid", "true")
    await userEvent.type(input, "Button")
    await expect(input).not.toHaveAttribute("aria-invalid")
    await expect(input).toHaveAccessibleDescription("请输入容易识别的名称。")
    await expect(canvas.queryByRole("alert")).toBeNull()
  },
}

export const ErrorWithDescription: Story = {
  render: () => (
    <div className="w-80">
      <p
        id="component-name-help"
        className="mb-3 text-sm text-muted-foreground"
      >
        组件名称用于在项目中引用。
      </p>
      <Field label="组件名称" error="组件名称不能为空。">
        <Input aria-describedby="component-name-help" />
      </Field>
    </div>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole("textbox", { name: "组件名称" })
    await expect(input).toHaveAccessibleDescription(
      "组件名称用于在项目中引用。 组件名称不能为空。"
    )
    await expect(input).toHaveAttribute("aria-invalid", "true")
  },
}

export const DarkTheme: Story = {
  ...Default,
  tags: ["!autodocs"],
  globals: {
    theme: "dark",
  },
}

export const ErrorDarkTheme: Story = {
  ...Error,
  tags: ["!autodocs"],
  globals: {
    theme: "dark",
  },
}
