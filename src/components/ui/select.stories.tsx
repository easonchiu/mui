import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"
import { Field } from "./field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

const themes = [
  { label: "跟随系统", value: "system" },
  { label: "浅色", value: "light" },
  { label: "深色", value: "dark" },
]

const meta = {
  title: "表单组件/Select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Field className="w-72" label="主题">
      <Select aria-label="主题" options={themes} placeholder="选择主题" />
    </Field>
  ),
}

export const SizeComparison: Story = {
  render: () => (
    <div className="grid w-[28rem] gap-3">
      {(["xs", "sm", "default", "lg"] as const).map((size) => (
        <div key={size} className="flex items-center gap-3">
          <Select
            aria-label={`${size} 尺寸主题`}
            className="flex-1"
            options={themes}
            placeholder="选择主题"
            size={size}
          />
          <Button size={size}>按钮</Button>
        </div>
      ))}
    </div>
  ),
}

export const DarkTheme: Story = {
  ...Default,
  globals: {
    theme: "dark",
  },
}

export const Compound: Story = {
  render: () => (
    <Field className="w-72" label="主题">
      <Select items={themes}>
        <SelectTrigger aria-label="主题" className="w-full">
          <SelectValue placeholder="选择主题" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {themes.map((theme) => (
              <SelectItem key={theme.value} value={theme.value}>
                {theme.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  ),
}
