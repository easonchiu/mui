import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

const meta = {
  title: "数据展示/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>最近发布的组件</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>组件</TableHead>
          <TableHead>分类</TableHead>
          <TableHead className="text-right">状态</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          ["Dialog", "浮层"],
          ["Select", "表单"],
          ["Table", "数据展示"],
        ].map(([name, category]) => (
          <TableRow key={name}>
            <TableCell className="font-medium">{name}</TableCell>
            <TableCell>{category}</TableCell>
            <TableCell className="text-right">可用</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}
