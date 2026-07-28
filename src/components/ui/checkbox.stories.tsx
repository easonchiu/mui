import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Checkbox } from "./checkbox"

const meta = {
  title: "表单组件/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    text: "接收更新通知",
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultChecked: true,
  },
}

function ControlledCheckbox(props: React.ComponentProps<typeof Checkbox>) {
  const [checked, setChecked] = React.useState(false)

  return (
    <Checkbox
      {...props}
      checked={checked}
      onCheckedChange={setChecked}
      text={checked ? "已开启通知" : "开启通知"}
    />
  )
}

export const Controlled: Story = {
  render: (args) => <ControlledCheckbox {...args} />,
}

export const Disabled: Story = {
  args: {
    disabled: true,
    text: "不可用选项",
  },
}

export const WithoutText: Story = {
  args: {
    "aria-label": "选择项目",
    text: undefined,
  },
}

export const DarkTheme: Story = {
  args: {
    defaultChecked: true,
  },
  globals: {
    theme: "dark",
  },
}
