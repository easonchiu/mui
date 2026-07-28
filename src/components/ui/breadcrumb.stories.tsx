import type { Meta, StoryObj } from "@storybook/react-vite"

import { Breadcrumb } from "./breadcrumb"

const items = [
  { title: "组件库", href: "#" },
  { title: "数据展示", href: "#" },
  { title: "Badge" },
]

const meta = {
  title: "导航组件/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  args: {
    items,
  },
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomSeparator: Story = {
  args: {
    separator: "/",
  },
}

export const CustomItemRender: Story = {
  args: {
    itemRender: (item) =>
      item.href ? (
        <a href={item.href} className="text-primary hover:underline">
          {item.title}
        </a>
      ) : (
        item.title
      ),
  },
}
