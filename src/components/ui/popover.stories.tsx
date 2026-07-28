import type { Meta, StoryObj } from "@storybook/react-vite"
import { SearchIcon } from "lucide-react"

import { Button } from "./button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./popover"

const meta = {
  title: "浮层组件/Popover",
  component: Popover,
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        打开浮层
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>快捷搜索</PopoverTitle>
          <PopoverDescription>输入名称查找组件。</PopoverDescription>
        </PopoverHeader>
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput aria-label="搜索组件" placeholder="搜索组件" />
        </InputGroup>
      </PopoverContent>
    </Popover>
  ),
}
