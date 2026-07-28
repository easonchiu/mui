import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "./avatar"

const meta = {
  title: "数据展示/Avatar",
  component: Avatar,
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback className="text-foreground">MU</AvatarFallback>
      <AvatarBadge />
    </Avatar>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarFallback className="text-foreground">S</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="text-foreground">M</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback className="text-foreground">L</AvatarFallback>
      </Avatar>
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar>
        <AvatarFallback className="text-foreground">A</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="text-foreground">B</AvatarFallback>
      </Avatar>
      <AvatarGroupCount className="text-foreground">+3</AvatarGroupCount>
    </AvatarGroup>
  ),
}
