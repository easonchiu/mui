import type { Meta, StoryObj } from "@storybook/react-vite"
import { zhCN } from "react-day-picker/locale"

import { Calendar } from "./calendar"

const meta = {
  title: "表单组件/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  args: {
    mode: "single",
    defaultMonth: new Date(2026, 6),
    selected: new Date(2026, 6, 29),
  },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MonthAndYearSelector: Story = {
  args: {
    captionLayout: "dropdown",
    startMonth: new Date(1950, 0),
    endMonth: new Date(2030, 11),
  },
}

export const Chinese: Story = {
  args: {
    locale: zhCN,
  },
}

export const DarkTheme: Story = {
  ...Default,
  globals: {
    theme: "dark",
  },
}
