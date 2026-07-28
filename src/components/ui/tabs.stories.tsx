import type { Meta, StoryObj } from "@storybook/react-vite"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

const meta = {
  title: "导航组件/Tabs",
  component: Tabs,
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-96">
      <TabsList>
        <TabsTrigger value="overview">概览</TabsTrigger>
        <TabsTrigger value="usage">用法</TabsTrigger>
        <TabsTrigger value="api">API</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        所有组件使用同一套语义化主题变量。
      </TabsContent>
      <TabsContent value="usage">从 mui 包入口直接导入组件。</TabsContent>
      <TabsContent value="api">底层交互能力由 Base UI 提供。</TabsContent>
    </Tabs>
  ),
}

export const Line: Story = {
  render: () => (
    <Tabs defaultValue="preview" className="w-96">
      <TabsList variant="line">
        <TabsTrigger value="preview">预览</TabsTrigger>
        <TabsTrigger value="code">源码</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">组件预览区域。</TabsContent>
      <TabsContent value="code">组件源码区域。</TabsContent>
    </Tabs>
  ),
}
