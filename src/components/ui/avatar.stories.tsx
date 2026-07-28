import type { Meta, StoryObj } from "@storybook/react-vite"

import { Avatar, AvatarGroup } from "./avatar"

const meta = {
  title: "数据展示/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: {
    "aria-label": "MUI",
    fallback: "MU",
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithBadge: Story = {
  args: {
    badge: true,
  },
}

export const ImageFallback: Story = {
  args: {
    "aria-label": "组件作者",
    alt: "组件作者",
    fallback: undefined,
    src: "/missing-avatar.png",
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar aria-label="小头像" fallback="S" size="sm" />
      <Avatar aria-label="默认头像" fallback="M" />
      <Avatar aria-label="大头像" fallback="L" size="lg" />
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <AvatarGroup extra={3}>
      <Avatar aria-label="用户 A" fallback="A" />
      <Avatar aria-label="用户 B" fallback="B" />
    </AvatarGroup>
  ),
}

export const DarkTheme: Story = {
  args: {
    badge: true,
  },
  globals: {
    theme: "dark",
  },
}
