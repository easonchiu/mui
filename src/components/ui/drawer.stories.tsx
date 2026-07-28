import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"
import { Drawer } from "./drawer"

const meta = {
  title: "浮层组件/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  args: {
    title: "组件设置",
    description: "在抽屉中完成次要任务。",
    placement: "right",
  },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Drawer
      {...args}
      trigger={<Button variant="outline">打开抽屉</Button>}
      footer={<Button>保存设置</Button>}
    >
      这里放置抽屉的主体内容。
    </Drawer>
  ),
}

export const Left: Story = {
  args: {
    placement: "left",
  },
  render: (args) => (
    <Drawer {...args} trigger={<Button variant="outline">从左侧打开</Button>}>
      Drawer 支持四个打开方向。
    </Drawer>
  ),
}
