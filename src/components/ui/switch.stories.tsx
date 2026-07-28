import type { Meta, StoryObj } from "@storybook/react-vite"

import { Switch } from "./switch"

const meta = {
  title: "表单组件/Switch",
  component: Switch,
  tags: ["autodocs"],
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: "公开展示",
    defaultChecked: true,
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Switch size="sm" text="小尺寸" defaultChecked />
      <Switch text="默认尺寸" defaultChecked />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    text: "不可用选项",
    disabled: true,
  },
}

export const DarkTheme: Story = {
  args: {
    text: "公开展示",
    defaultChecked: true,
  },
  globals: {
    theme: "dark",
  },
}
