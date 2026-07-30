import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  BookOpenIcon,
  Code2Icon,
  CopyIcon,
  MoreHorizontalIcon,
  Settings2Icon,
  Trash2Icon,
} from "lucide-react"
import { expect, waitFor } from "storybook/test"

import { Button } from "./button"
import { DropdownMenu, type DropdownMenuItemConfig } from "./dropdown-menu"

const items = [
  {
    type: "group",
    key: "common",
    label: "常用操作",
    children: [
      { key: "source", label: "查看源码", icon: <Code2Icon /> },
      {
        key: "copy",
        label: "复制导入语句",
        icon: <CopyIcon />,
        shortcut: "⌘C",
      },
    ],
  },
  { type: "divider" },
  {
    key: "more",
    label: "更多操作",
    icon: <Settings2Icon />,
    children: [
      { key: "docs", label: "打开文档", icon: <BookOpenIcon /> },
      {
        key: "delete",
        label: "删除组件",
        icon: <Trash2Icon />,
        danger: true,
      },
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

export const Hover: Story = {
  render: (args) => (
    <DropdownMenu
      {...args}
      triggerMode="hover"
      trigger={<Button variant="outline">悬停打开菜单</Button>}
    />
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.hover(
      canvas.getByRole("button", { name: "悬停打开菜单" })
    )

    await waitFor(() => {
      const content = canvasElement.ownerDocument.querySelector(
        '[data-slot="dropdown-menu-content"]'
      )
      expect(content).toHaveTextContent("查看源码")
    })
  },
  parameters: {
    a11y: {
      test: "todo",
    },
  },
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
