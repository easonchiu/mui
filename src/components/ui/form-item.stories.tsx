import type { Meta, StoryObj } from "@storybook/react-vite"

import { FormItem } from "./form-item"
import { Input } from "./input"

const meta = {
  title: "表单组件/Form Item",
  component: FormItem,
  tags: ["autodocs"],
  args: {
    label: "组件名称",
    htmlFor: "component-name",
    help: "请输入容易识别的名称。",
    children: <Input id="component-name" placeholder="例如 Button" />,
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Required: Story = {
  args: {
    required: true,
  },
}

export const Error: Story = {
  args: {
    required: true,
    error: "组件名称不能为空。",
  },
}
