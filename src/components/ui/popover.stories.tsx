import type { Meta, StoryObj } from "@storybook/react-vite"
import { SearchIcon } from "lucide-react"

import { Button } from "./button"
import { Input } from "./input"
import { Popover } from "./popover"

const meta = {
  title: "浮层组件/Popover",
  component: Popover,
  tags: ["autodocs"],
  argTypes: {
    align: {
      control: "select",
      options: ["start", "center", "end"],
    },
  },
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

export const Alignments: Story = {
  render: (args) => (
    <div className="m-12 flex w-lg items-center justify-between">
      <Popover
        {...args}
        align="start"
        trigger={<Button variant="outline">左对齐</Button>}
        title="左对齐"
        description="Popup 左边缘与按钮左边缘对齐。"
      />
      <Popover
        {...args}
        align="center"
        trigger={<Button variant="outline">居中对齐</Button>}
        title="居中对齐"
        description="Popup 中心与按钮中心对齐。"
      />
      <Popover
        {...args}
        align="end"
        trigger={<Button variant="outline">右对齐</Button>}
        title="右对齐"
        description="Popup 右边缘与按钮右边缘对齐。"
      />
    </div>
  ),
}
