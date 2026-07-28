import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet"

const meta = {
  title: "浮层组件/Sheet",
  component: Sheet,
  tags: ["autodocs"],
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        打开侧边面板
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>组件设置</SheetTitle>
          <SheetDescription>在侧边面板中完成次要任务。</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button>保存设置</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        从左侧打开
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>导航面板</SheetTitle>
          <SheetDescription>Sheet 支持四个打开方向。</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
}
