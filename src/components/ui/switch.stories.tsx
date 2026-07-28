import type { Meta, StoryObj } from "@storybook/react-vite"

import { Label } from "./label"
import { Switch } from "./switch"

const meta = {
  title: "表单组件/Switch",
  component: Switch,
  tags: ["autodocs"],
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Switch id="switch-public" defaultChecked />
      <Label htmlFor="switch-public">公开展示</Label>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-3">
        <Switch id="switch-small" size="sm" defaultChecked />
        <Label htmlFor="switch-small">小尺寸</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="switch-default" defaultChecked />
        <Label htmlFor="switch-default">默认尺寸</Label>
      </div>
    </div>
  ),
}
