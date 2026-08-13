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

import {
  ContextMenu,
  type ContextMenuHandle,
  type ContextMenuItemConfig,
} from "./context-menu"

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
      shortcut: "D",
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

    const submenuTrigger = canvasElement.ownerDocument.querySelector(
      '[data-slot="context-menu-sub-trigger"]'
    )
    expect(submenuTrigger).toBeVisible()
    await userEvent.hover(submenuTrigger!)

    await waitFor(() => {
      const mainMenu = canvasElement.ownerDocument.querySelector<HTMLElement>(
        '[data-slot="context-menu-content"][data-open]'
      )
      const submenu = canvasElement.ownerDocument.querySelector<HTMLElement>(
        '[data-slot="context-menu-sub-content"][data-open]'
      )
      const firstSubmenuItem = submenu?.querySelector<HTMLElement>(
        '[data-slot="context-menu-item"]'
      )

      expect(submenu).toBeVisible()

      const mainRect = mainMenu!.getBoundingClientRect()
      const submenuRect = submenu!.getBoundingClientRect()
      const triggerRect = submenuTrigger!.getBoundingClientRect()
      const firstSubmenuItemRect = firstSubmenuItem!.getBoundingClientRect()
      const horizontalGap = Math.max(
        submenuRect.left - mainRect.right,
        mainRect.left - submenuRect.right
      )

      expect(horizontalGap).toBeGreaterThanOrEqual(4)
      expect(firstSubmenuItemRect.top).toBeCloseTo(triggerRect.top, 0)
    })

    const openItem = Array.from(
      canvasElement.ownerDocument.querySelectorAll<HTMLElement>(
        '[data-slot="context-menu-item"]'
      )
    ).find((item) => item.textContent?.includes("打开"))

    expect(openItem).not.toBeUndefined()
    await userEvent.hover(openItem!)
    await waitFor(() => {
      const submenu = canvasElement.ownerDocument.querySelector(
        '[data-slot="context-menu-sub-content"]'
      )
      expect(submenu).not.toBeInTheDocument()
    })
    await userEvent.click(openItem!)
    expect(onItemClick).toHaveBeenCalledWith({ key: "open" })
    await waitFor(() => {
      const menu = canvasElement.ownerDocument.querySelector(
        '[data-slot="context-menu-content"]'
      )
      expect(menu).not.toBeInTheDocument()
    })
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

function ProgrammaticContextMenuDemo() {
  const menuRef = React.useRef<ContextMenuHandle>(null)

  return (
    <div className="flex h-56 w-96 flex-col items-start gap-6 rounded-sm border border-dashed border-border p-6">
      <button
        className="rounded-sm border border-border bg-background px-3 py-2 text-sm"
        type="button"
        onClick={(event) =>
          menuRef.current?.openAt({
            x: event.clientX + 80,
            y: event.clientY + 40,
          })
        }
      >
        在指定位置打开
      </button>
      <ContextMenu
        ref={menuRef}
        trigger={
          <div className="flex flex-1 items-center text-sm text-muted-foreground">
            也可以在此区域右键
          </div>
        }
        items={basicItems}
      />
    </div>
  )
}

export const Programmatic: Story = {
  render: () => <ProgrammaticContextMenuDemo />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "在指定位置打开" })
    )

    await waitFor(() => {
      const menu = canvasElement.ownerDocument.querySelector(
        '[data-slot="context-menu-content"][data-open]'
      )
      expect(menu).toBeVisible()
      expect(menu).toHaveTextContent("打开")
    })
  },
}

export const DarkTheme: Story = {
  render: () => <ContextMenuDemo />,
  globals: {
    theme: "dark",
  },
}
