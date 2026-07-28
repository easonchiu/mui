import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Combobox } from "./combobox"
import { Field } from "./field"

const options = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular", disabled: true },
]

const meta = {
  title: "表单组件/Combobox",
  component: Combobox<string>,
  tags: ["autodocs"],
  args: {
    options,
    placeholder: "搜索技术栈",
    "aria-label": "技术栈",
    className: "w-72",
  },
} satisfies Meta<typeof Combobox<string>>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Field className="w-72" label="技术栈">
      <Combobox {...args} />
    </Field>
  ),
}

function ControlledCombobox(
  props: React.ComponentProps<typeof Combobox<string>>
) {
  const [value, setValue] = React.useState<string | null>("react")

  return <Combobox {...props} value={value} onChange={setValue} allowClear />
}

export const Controlled: Story = {
  render: (args) => <ControlledCombobox {...args} />,
}

export const Empty: Story = {
  args: {
    options: [],
    emptyText: "没有找到技术栈",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "react",
  },
}

export const DarkTheme: Story = {
  globals: {
    theme: "dark",
  },
}
