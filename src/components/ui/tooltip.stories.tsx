import type { Meta, StoryObj } from "@storybook/react-vite"
import { CreditCardIcon } from "lucide-react"

import { Button } from "./button"
import { Tooltip, TooltipProvider } from "./tooltip"

const meta = {
  title: "浮层组件/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    sideOffset: {
      control: { type: "number", min: 0, step: 1 },
    },
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip
        trigger={
          <Button size="icon" variant="outline" aria-label="支付设置">
            <CreditCardIcon />
          </Button>
        }
      >
        支付设置
      </Tooltip>
    </TooltipProvider>
  ),
}

export const IncreasedOffset: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip
        sideOffset={12}
        trigger={<Button variant="outline">增加间距</Button>}
      >
        sideOffset: 12px
      </Tooltip>
    </TooltipProvider>
  ),
}
