import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { zhCN } from "react-day-picker/locale"

import { DatePicker } from "./date-picker"

const meta = {
  title: "表单组件/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  args: {
    placeholder: "选择日期",
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

function ControlledDatePicker() {
  const [value, setValue] = React.useState<Date>()

  return <DatePicker value={value} onChange={setValue} locale={zhCN} />
}

export const Default: Story = {}

export const Controlled: Story = {
  render: () => <ControlledDatePicker />,
}

export const WithValue: Story = {
  args: {
    defaultValue: new Date(2026, 6, 29),
    format: "yyyy-MM-dd",
    locale: zhCN,
  },
}

export const DateOfBirth: Story = {
  args: {
    placeholder: "选择出生日期",
    locale: zhCN,
    calendarProps: {
      captionLayout: "dropdown",
      startMonth: new Date(1950, 0),
      endMonth: new Date(),
    },
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DarkTheme: Story = {
  ...WithValue,
  globals: {
    theme: "dark",
  },
}
