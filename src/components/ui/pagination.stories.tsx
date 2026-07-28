import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Pagination } from "./pagination"

const meta = {
  title: "导航组件/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  args: {
    total: 200,
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

function ControlledPagination(props: React.ComponentProps<typeof Pagination>) {
  const [current, setCurrent] = React.useState(8)

  return (
    <Pagination
      {...props}
      current={current}
      onChange={(page) => setCurrent(page)}
    />
  )
}

export const Controlled: Story = {
  render: (args) => <ControlledPagination {...args} />,
}

export const FewPages: Story = {
  args: {
    total: 30,
  },
}

export const Disabled: Story = {
  args: {
    current: 5,
    disabled: true,
  },
}

export const DarkTheme: Story = {
  globals: {
    theme: "dark",
  },
}
