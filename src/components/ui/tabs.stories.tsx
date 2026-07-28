import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Tabs, type TabsItem } from "./tabs"

const items: TabsItem[] = [
  {
    key: "overview",
    label: "概览",
  },
  {
    key: "usage",
    label: "用法",
  },
  {
    key: "api",
    label: "API",
  },
]

const content: Record<string, React.ReactNode> = {
  overview: "所有组件使用同一套语义化主题变量。",
  usage: "从 mui 包入口直接导入组件。",
  api: "底层交互能力由 Base UI 提供。",
}

const meta = {
  title: "导航组件/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    items,
    activeKey: "overview",
    className: "w-96",
  },
  render: (args) => <TabsStory {...args} />,
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

function TabsStory(props: React.ComponentProps<typeof Tabs>) {
  const [activeKey, setActiveKey] = React.useState(props.activeKey)

  return (
    <Tabs {...props} activeKey={activeKey} onChange={setActiveKey}>
      {content[activeKey]}
    </Tabs>
  )
}

export const Default: Story = {}

export const Line: Story = {
  args: {
    variant: "line",
  },
}

export const WithDisabledItem: Story = {
  args: {
    items: items.map((item) =>
      item.key === "usage" ? { ...item, disabled: true } : item
    ),
  },
}

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
}

export const DarkTheme: Story = {
  globals: {
    theme: "dark",
  },
}
