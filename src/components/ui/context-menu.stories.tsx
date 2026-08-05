import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  CopyIcon,
  EyeIcon,
  FolderIcon,
  FolderOpenIcon,
  LinkIcon,
  PencilIcon,
  Share2Icon,
  Trash2Icon,
} from "lucide-react"
import { expect, fn, waitFor } from "storybook/test"

import { ContextMenu, type ContextMenuItemConfig } from "./context-menu"

const basicItems = [
  { key: "open", label: "打开" },
  { key: "copy", label: "复制" },
  { key: "paste", label: "粘贴", disabled: true },
  { type: "divider" },
  { key: "delete", label: "删除", danger: true },
] satisfies ContextMenuItemConfig[]

const onItemClick = fn()
const resourceTrigger = (
  <div
    aria-label="项目资源区域"
    className="flex h-48 w-72 flex-col items-center justify-center gap-3 rounded-sm border border-dashed border-border bg-muted/30 text-muted-foreground outline-none"
  >
    <FolderIcon className="size-8" />
    <div className="text-center">
      <div className="text-sm font-medium text-foreground">项目资源</div>
      <div className="mt-1 text-xs">4 个文件</div>
    </div>
  </div>
)

const meta = {
  title: "浮层组件/Context Menu",
  component: ContextMenu,
  tags: ["autodocs"],
  args: {
    items: basicItems,
    trigger: <div />,
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
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

function ContextMenuDemo() {
  const [showHiddenFiles, setShowHiddenFiles] = React.useState(true)
  const [sortBy, setSortBy] = React.useState("name")

  const items = [
    {
      type: "group",
      key: "common",
      label: "常用操作",
      children: [
        {
          key: "open",
          label: "打开",
          icon: <FolderOpenIcon />,
          shortcut: "Enter",
        },
        {
          key: "rename",
          label: "重命名",
          icon: <PencilIcon />,
          shortcut: "F2",
        },
        {
          key: "duplicate",
          label: "创建副本",
          icon: <CopyIcon />,
          shortcut: "⌘D",
        },
      ],
    },
    { type: "divider" },
    {
      key: "share",
      label: "共享",
      icon: <Share2Icon />,
      children: [
        { key: "copy-link", label: "复制链接", icon: <LinkIcon /> },
        { key: "access", label: "管理访问权限" },
      ],
    },
    { type: "divider" },
    {
      type: "checkbox",
      key: "show-hidden",
      label: "显示隐藏文件",
      icon: <EyeIcon />,
      checked: showHiddenFiles,
      onCheckedChange: setShowHiddenFiles,
    },
    { type: "divider" },
    {
      type: "radio",
      key: "sort",
      label: "排序方式",
      value: sortBy,
      onValueChange: setSortBy,
      options: [
        { key: "name", label: "名称", value: "name" },
        { key: "updated", label: "修改时间", value: "updated" },
      ],
    },
    { type: "divider" },
    {
      key: "trash",
      label: "移到废纸篓",
      icon: <Trash2Icon />,
      shortcut: "⌘⌫",
      danger: true,
    },
  ] satisfies ContextMenuItemConfig[]

  return (
    <ContextMenu
      trigger={resourceTrigger}
      items={items}
      onItemClick={onItemClick}
    />
  )
}

export const Default: Story = {
  render: () => <ContextMenuDemo />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    onItemClick.mockClear()
    const trigger = canvas.getByLabelText("项目资源区域")

    await userEvent.pointer([
      { target: trigger, keys: "[MouseRight>]" },
      { target: trigger, keys: "[/MouseRight]" },
    ])

    await waitFor(() => {
      const menu = canvasElement.ownerDocument.querySelector(
        '[data-slot="context-menu-content"][data-open]'
      )
      expect(menu).toBeVisible()
      expect(menu).toHaveTextContent("打开")
      expect(menu).toHaveTextContent("显示隐藏文件")
      expect(menu).toHaveTextContent("移到废纸篓")
    })

    const checkbox = canvasElement.ownerDocument.querySelector(
      '[role="menuitemcheckbox"]'
    )
    const checkedRadio = canvasElement.ownerDocument.querySelector(
      '[role="menuitemradio"][aria-checked="true"]'
    )

    expect(checkbox).toHaveAttribute("aria-checked", "true")
    expect(checkedRadio).toHaveTextContent("名称")

    const openItem = Array.from(
      canvasElement.ownerDocument.querySelectorAll<HTMLElement>(
        '[data-slot="context-menu-item"]'
      )
    ).find((item) => item.textContent?.includes("打开"))

    expect(openItem).not.toBeUndefined()
    await userEvent.click(openItem!)
    expect(onItemClick).toHaveBeenCalledWith({ key: "open" })
  },
}

export const Basic: Story = {
  render: (args) => (
    <ContextMenu
      {...args}
      trigger={
        <div className="flex h-36 w-64 items-center justify-center rounded-sm border border-dashed border-border bg-muted/30 text-sm text-muted-foreground">
          文档列表
        </div>
      }
    />
  ),
}

export const DarkTheme: Story = {
  render: () => <ContextMenuDemo />,
  globals: {
    theme: "dark",
  },
}
