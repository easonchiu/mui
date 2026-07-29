import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"

import { Radio, RadioGroup } from "./radio"

const meta = {
  title: "表单组件/Radio",
  component: Radio,
  tags: ["autodocs"],
  args: {
    text: "标准选项",
    value: "default",
  },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <Radio value="default" text="默认" />
      <Radio value="comfortable" text="舒适" />
      <Radio value="compact" text="紧凑" />
    </RadioGroup>
  ),
}

function ControlledRadioGroup() {
  const [value, setValue] = React.useState("email")

  return (
    <div className="grid gap-4">
      <RadioGroup value={value} onValueChange={setValue}>
        <Radio value="email" text="邮件" />
        <Radio value="sms" text="短信" />
        <Radio value="phone" text="电话" />
      </RadioGroup>
      <p className="text-sm text-muted-foreground">当前选择：{value}</p>
    </div>
  )
}

export const Controlled: Story = {
  render: () => <ControlledRadioGroup />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText("短信"))
    await expect(canvas.getByText("当前选择：sms")).toBeInTheDocument()
  },
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="selected" disabled>
      <Radio value="selected" text="已选择" />
      <Radio value="unselected" text="未选择" />
    </RadioGroup>
  ),
}

export const WithoutText: Story = {
  render: () => (
    <RadioGroup defaultValue="first" className="flex w-auto gap-6">
      <Radio value="first" aria-label="第一个选项" />
      <Radio value="second" aria-label="第二个选项" />
    </RadioGroup>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="all" className="flex w-auto gap-6">
      <Radio value="all" text="全部" />
      <Radio value="enabled" text="启用" />
      <Radio value="disabled" text="停用" />
    </RadioGroup>
  ),
}

export const DarkTheme: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <Radio value="default" text="默认" />
      <Radio value="comfortable" text="舒适" />
      <Radio value="compact" text="紧凑" />
    </RadioGroup>
  ),
  globals: {
    theme: "dark",
  },
}
