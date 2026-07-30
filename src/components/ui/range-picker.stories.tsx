import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import type { DateRange } from "react-day-picker"
import { zhCN } from "react-day-picker/locale"
import { expect, fn, waitFor } from "storybook/test"

import { RangePicker } from "./range-picker"

const meta = {
  title: "表单组件/RangePicker",
  component: RangePicker,
  tags: ["autodocs"],
  args: {
    placeholder: "选择日期范围",
  },
  argTypes: {
    align: {
      control: "select",
      options: ["start", "center", "end"],
    },
  },
} satisfies Meta<typeof RangePicker>

export default meta
type Story = StoryObj<typeof meta>

function ControlledRangePicker() {
  const [value, setValue] = React.useState<DateRange>()

  return <RangePicker value={value} onChange={setValue} locale={zhCN} />
}

function getDayButton(canvasElement: HTMLElement, date: Date) {
  const selector = `[data-day="${date.toLocaleDateString()}"]`
  const button =
    canvasElement.ownerDocument.querySelector<HTMLButtonElement>(selector)

  if (!button) {
    throw new Error(`找不到日期按钮：${date.toLocaleDateString()}`)
  }

  return button
}

export const Default: Story = {
  args: {
    defaultValue: {
      from: new Date(2026, 0, 20),
      to: new Date(2026, 1, 9),
    },
  },
}

export const Controlled: Story = {
  render: () => <ControlledRangePicker />,
}

export const Chinese: Story = {
  args: {
    defaultValue: {
      from: new Date(2026, 6, 20),
      to: new Date(2026, 6, 29),
    },
    format: "yyyy年MM月dd日",
    locale: zhCN,
  },
}

export const SingleMonth: Story = {
  args: {
    calendarProps: {
      numberOfMonths: 1,
    },
  },
}

export const Alignments: Story = {
  render: (args) => (
    <div className="m-12 flex w-5xl items-center justify-between">
      <RangePicker {...args} align="start" placeholder="左对齐" />
      <RangePicker {...args} align="center" placeholder="居中对齐" />
      <RangePicker {...args} align="end" placeholder="右对齐" />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DarkTheme: Story = {
  ...Default,
  globals: {
    theme: "dark",
  },
}

export const SelectionRules: Story = {
  args: {
    defaultOpen: true,
    onChange: fn(),
    onOpenChange: fn(),
    calendarProps: {
      defaultMonth: new Date(2026, 0),
      numberOfMonths: 1,
    },
  },
  play: async ({ args, canvas, canvasElement, userEvent }) => {
    const january18 = new Date(2026, 0, 18)
    const january20 = new Date(2026, 0, 20)
    const january22 = new Date(2026, 0, 22)

    await userEvent.click(getDayButton(canvasElement, january20))
    await expect(args.onChange).toHaveBeenLastCalledWith({
      from: january20,
      to: undefined,
    })

    await userEvent.click(getDayButton(canvasElement, january18))
    await expect(args.onChange).toHaveBeenLastCalledWith({
      from: january18,
      to: undefined,
    })
    await expect(args.onOpenChange).not.toHaveBeenCalled()

    await userEvent.click(getDayButton(canvasElement, january18))
    await expect(args.onChange).toHaveBeenLastCalledWith({
      from: january18,
      to: january18,
    })
    await expect(args.onOpenChange).toHaveBeenLastCalledWith(false)

    await userEvent.click(canvas.getByRole("button"))
    await userEvent.click(getDayButton(canvasElement, january20))
    await expect(args.onChange).toHaveBeenLastCalledWith({
      from: january20,
      to: undefined,
    })

    await userEvent.click(getDayButton(canvasElement, january22))
    await expect(args.onChange).toHaveBeenLastCalledWith({
      from: january20,
      to: january22,
    })
    await expect(args.onOpenChange).toHaveBeenLastCalledWith(false)
    await waitFor(() => {
      const popup = canvasElement.ownerDocument.querySelector(
        '[data-slot="popover-content"]'
      )
      expect(popup).toBeNull()
    })
  },
}
