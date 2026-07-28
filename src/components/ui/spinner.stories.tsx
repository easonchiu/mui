import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"
import { Spinner } from "./spinner"

const meta = {
  title: "反馈组件/Spinner",
  component: Spinner,
  tags: ["autodocs"],
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const InButton: Story = {
  render: () => (
    <Button disabled>
      <Spinner data-icon="inline-start" />
      正在保存
    </Button>
  ),
}
