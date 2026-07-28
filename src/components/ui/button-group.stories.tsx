import type { Meta, StoryObj } from "@storybook/react-vite"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "./button"
import { ButtonGroup, ButtonGroupText } from "./button-group"

const meta = {
  title: "基础组件/Button Group",
  component: ButtonGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">预览</Button>
      <Button variant="outline">发布</Button>
      <ButtonGroupText>
        更多
        <ChevronDownIcon />
      </ButtonGroupText>
    </ButtonGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">复制</Button>
      <Button variant="outline">移动</Button>
      <Button variant="outline">归档</Button>
    </ButtonGroup>
  ),
}
