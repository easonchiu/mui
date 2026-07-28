import type { Meta, StoryObj } from "@storybook/react-vite"
import { SearchIcon } from "lucide-react"

import { Button } from "./button"
import { Input } from "./input"
import { Popover } from "./popover"

const meta = {
  title: "浮层组件/Popover",
  component: Popover,
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Popover
      trigger={<Button variant="outline">打开浮层</Button>}
      title="快捷搜索"
      description="输入名称查找组件。"
    >
      <Input
        aria-label="搜索组件"
        prefix={<SearchIcon />}
        placeholder="搜索组件"
      />
    </Popover>
  ),
}
