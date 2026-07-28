import type { Meta, StoryObj } from "@storybook/react-vite"

import { Checkbox } from "./checkbox"
import { Label } from "./label"

const meta = {
  title: "表单组件/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Checkbox id="checkbox-notifications" defaultChecked />
      <Label htmlFor="checkbox-notifications">接收更新通知</Label>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Checkbox id="checkbox-disabled" disabled />
      <Label htmlFor="checkbox-disabled">不可用选项</Label>
    </div>
  ),
}
