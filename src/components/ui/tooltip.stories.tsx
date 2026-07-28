import type { Meta, StoryObj } from "@storybook/react-vite"
import { CreditCardIcon } from "lucide-react"

import { Button } from "./button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

const meta = {
  title: "浮层组件/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button size="icon" variant="outline" aria-label="支付设置" />
          }
        >
          <CreditCardIcon />
        </TooltipTrigger>
        <TooltipContent>支付设置</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}
