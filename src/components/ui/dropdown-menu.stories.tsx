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
  argTypes: {
    align: {
      control: "select",
      options: ["start", "center", "end"],
    },
    sideOffset: {
      control: { type: "number", min: 0, step: 1 },
    },
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
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "组件操作" }))

    const ownerDocument = canvasElement.ownerDocument
    const submenuTrigger = await waitFor(() => {
      const trigger = ownerDocument.querySelector<HTMLElement>(
        '[data-slot="dropdown-menu-sub-trigger"]'
      )
      expect(trigger).toBeVisible()
      return trigger!
    })

    await userEvent.hover(submenuTrigger)

    await waitFor(() => {
      const mainMenu = ownerDocument.querySelector<HTMLElement>(
        '[data-slot="dropdown-menu-content"][data-open]'
      )
      const submenu = ownerDocument.querySelector<HTMLElement>(
        '[data-slot="dropdown-menu-sub-content"][data-open]'
      )
      const firstSubmenuItem = submenu?.querySelector<HTMLElement>(
        '[data-slot="dropdown-menu-item"]'
      )

      expect(submenu).toBeVisible()

      const mainRect = mainMenu!.getBoundingClientRect()
      const submenuRect = submenu!.getBoundingClientRect()
      const triggerRect = submenuTrigger.getBoundingClientRect()
      const firstSubmenuItemRect = firstSubmenuItem!.getBoundingClientRect()
      const horizontalGap = Math.max(
        submenuRect.left - mainRect.right,
        mainRect.left - submenuRect.right
      )

      expect(horizontalGap).toBeGreaterThanOrEqual(4)
      expect(firstSubmenuItemRect.top).toBeCloseTo(triggerRect.top, 0)
    })

    const sourceItem = Array.from(
      ownerDocument.querySelectorAll<HTMLElement>(
        '[data-slot="dropdown-menu-item"]'
      )
    ).find((item) => item.textContent?.includes("查看源码"))

    expect(sourceItem).not.toBeUndefined()
    await userEvent.hover(sourceItem!)
    await waitFor(() => {
      const submenu = ownerDocument.querySelector(
        '[data-slot="dropdown-menu-sub-content"]'
      )
      expect(submenu).not.toBeInTheDocument()
    })
    await userEvent.click(sourceItem!)
    await waitFor(() => {
      const menu = ownerDocument.querySelector(
        '[data-slot="dropdown-menu-content"]'
      )
      expect(menu).not.toBeInTheDocument()
    })
  },
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
    await userEvent.hover(canvas.getByRole("button", { name: "悬停打开菜单" }))

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

export const Offset: Story = {
  args: {
    sideOffset: 12,
  },
  render: (args) => (
    <DropdownMenu
      {...args}
      trigger={<Button variant="outline">带间距的菜单</Button>}
    />
  ),
}

export const Alignments: Story = {
  render: (args) => (
    <div className="flex w-lg items-center justify-between">
      <DropdownMenu
        {...args}
        align="start"
        trigger={<Button variant="outline">左对齐</Button>}
      />
      <DropdownMenu
        {...args}
        align="center"
        trigger={<Button variant="outline">居中对齐</Button>}
      />
      <DropdownMenu
        {...args}
        align="end"
        trigger={<Button variant="outline">右对齐</Button>}
      />
    </div>
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
