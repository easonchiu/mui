import type { Meta, StoryObj } from "@storybook/react-vite"
import { MailIcon, SearchIcon } from "lucide-react"

import { Button } from "./button"
import { Field } from "./field"
import { Input } from "./input"

const meta = {
  title: "表单组件/Input",
  component: Input,
  tags: ["autodocs"],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Field className="w-80" label="邮箱" description="请输入常用邮箱地址。">
      <Input type="email" placeholder="name@example.com" />
    </Field>
  ),
}

export const WithPrefix: Story = {
  render: () => (
    <Input
      aria-label="搜索"
      containerClassName="w-80"
      prefix={<SearchIcon />}
      placeholder="搜索组件"
    />
  ),
}

export const WithSuffix: Story = {
  render: () => (
    <Input
      aria-label="邮箱用户名"
      containerClassName="w-80"
      prefix={<MailIcon />}
      suffix="@mui.dev"
      placeholder="用户名"
    />
  ),
}

export const Disabled: Story = {
  render: () => (
    <Field data-disabled className="w-80" label="不可编辑">
      <Input disabled defaultValue="mui" prefix={<MailIcon />} />
    </Field>
  ),
}

export const Error: Story = {
  render: () => (
    <Field
      data-invalid
      className="w-80"
      label="邮箱"
      description="请输入有效的邮箱地址。"
    >
      <Input error defaultValue="invalid-email" />
    </Field>
  ),
}

export const SizeComparison: Story = {
  render: () => (
    <div className="grid w-[28rem] gap-3">
      <div className="flex items-center gap-3">
        <Input size="xs" aria-label="超小输入框" placeholder="超小输入框" />
        <Button size="xs">超小按钮</Button>
      </div>
      <div className="flex items-center gap-3">
        <Input size="sm" aria-label="小输入框" placeholder="小输入框" />
        <Button size="sm">小按钮</Button>
      </div>
      <div className="flex items-center gap-3">
        <Input aria-label="默认输入框" placeholder="默认输入框" />
        <Button>默认按钮</Button>
      </div>
      <div className="flex items-center gap-3">
        <Input size="lg" aria-label="大输入框" placeholder="大输入框" />
        <Button size="lg">大按钮</Button>
      </div>
    </div>
  ),
}

export const DarkTheme: Story = {
  ...WithSuffix,
  globals: {
    theme: "dark",
  },
}

export const ErrorDarkTheme: Story = {
  ...Error,
  globals: {
    theme: "dark",
  },
}
