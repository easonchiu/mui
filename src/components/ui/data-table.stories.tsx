import type { Meta, StoryObj } from "@storybook/react-vite"

import { Badge } from "./badge"
import { DataTable, type DataTableColumn } from "./data-table"

type ComponentRecord = {
  id: number
  name: string
  category: string
  enabled: boolean
}

const columns: DataTableColumn<ComponentRecord>[] = [
  { title: "名称", dataIndex: "name" },
  { title: "分类", dataIndex: "category" },
  {
    title: "状态",
    dataIndex: "enabled",
    render: (enabled) => (
      <Badge variant={enabled ? "default" : "secondary"}>
        {enabled ? "启用" : "停用"}
      </Badge>
    ),
  },
]

const dataSource: ComponentRecord[] = [
  { id: 1, name: "Button", category: "基础组件", enabled: true },
  { id: 2, name: "Select", category: "表单组件", enabled: true },
]

const meta = {
  title: "数据展示/Data Table",
  component: DataTable<ComponentRecord>,
  tags: ["autodocs"],
  args: {
    columns,
    dataSource,
    rowKey: "id",
  },
  decorators: [
    (Story) => (
      <div className="w-160">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DataTable<ComponentRecord>>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    dataSource: [],
  },
}
