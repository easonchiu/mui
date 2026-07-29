import type { Meta, StoryObj } from "@storybook/react-vite"

import { Grid, GridItem } from "./grid"

const items = [
  {
    title: "账户设置",
    description: "完善账户资料和安全设置。",
  },
  {
    title: "API 接入",
    description: "创建密钥并查看开发文档。",
  },
  {
    title: "用量概览",
    description: "查看当前额度和近期使用情况。",
  },
  {
    title: "账单管理",
    description: "管理充值记录和账单信息。",
  },
  {
    title: "团队成员",
    description: "邀请成员并分配访问权限。",
  },
  {
    title: "服务支持",
    description: "查看常见问题或联系支持。",
  },
]

const meta = {
  title: "布局组件/Grid",
  component: Grid,
  tags: ["autodocs"],
  args: {
    columns: 3,
  },
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Grid {...args}>
      {items.map((item) => (
        <GridItem key={item.title} className="min-h-32">
          <h3 className="font-semibold">{item.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {item.description}
          </p>
        </GridItem>
      ))}
    </Grid>
  ),
}

export const TwoColumns: Story = {
  args: {
    columns: 2,
  },
  render: Default.render,
}

export const FourColumns: Story = {
  args: {
    columns: 4,
  },
  render: Default.render,
}

export const IncompleteRow: Story = {
  args: {
    columns: 3,
  },
  render: (args) => (
    <Grid {...args}>
      {items.slice(0, 5).map((item) => (
        <GridItem key={item.title}>
          <h3 className="font-semibold">{item.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {item.description}
          </p>
        </GridItem>
      ))}
    </Grid>
  ),
}

export const CustomContent: Story = {
  args: {
    columns: 3,
  },
  render: (args) => (
    <Grid {...args}>
      <GridItem className="p-4">紧凑内容</GridItem>
      <GridItem className="p-8">宽松内容</GridItem>
      <GridItem className="flex items-center justify-center p-4">
        居中内容
      </GridItem>
    </Grid>
  ),
}

export const DarkTheme: Story = {
  render: Default.render,
  globals: {
    theme: "dark",
  },
}
