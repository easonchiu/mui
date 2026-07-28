import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { MoreHorizontalIcon } from "lucide-react"

import { Button } from "./button"
import { DropdownMenu, type DropdownMenuItemConfig } from "./dropdown-menu"

const items = [
  {
    type: "group",
    key: "common",
    label: "常用操作",
    children: [
      { key: "source", label: "查看源码" },
      { key: "copy", label: "复制导入语句", shortcut: "⌘C" },
    ],
  },
  { type: "divider" },
  {
    key: "more",
    label: "更多操作",
    children: [
      { key: "docs", label: "打开文档" },
      { key: "delete", label: "删除组件", danger: true },
    ],
  },
] satisfies DropdownMenuItemConfig[]

const meta = {
  title: "浮层组件/Dropdown Menu",
  component: DropdownMenu,
  tags: ["autodocs"],
  args: {
    items,
  },
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <DropdownMenu
      {...args}
      trigger={
        <Button variant="outline">
          组件操作
          <MoreHorizontalIcon data-icon="inline-end" />
        </Button>
      }
    />
  ),
}

export const Selectable: Story = {
  render: function SelectableStory() {
    const [showIcons, setShowIcons] = React.useState(true)
    const [density, setDensity] = React.useState("comfortable")

    const selectableItems: DropdownMenuItemConfig[] = [
      {
        type: "checkbox",
        key: "show-icons",
        label: "显示图标",
        checked: showIcons,
        onCheckedChange: setShowIcons,
      },
      { type: "divider" },
      {
        type: "radio",
        key: "density",
        label: "界面密度",
        value: density,
        onValueChange: setDensity,
        options: [
          { key: "compact", label: "紧凑", value: "compact" },
          { key: "comfortable", label: "舒适", value: "comfortable" },
        ],
      },
    ]

    return (
      <DropdownMenu
        trigger={<Button variant="outline">显示设置</Button>}
        items={selectableItems}
      />
    )
  },
}
