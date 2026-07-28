import type { Meta, StoryObj } from "@storybook/react-vite"

import { Field } from "./field"
import { Slider } from "./slider"

const meta = {
  title: "表单组件/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Field className="max-w-md" label="界面密度">
      <Slider defaultValue={[40]} max={100} step={10} />
    </Field>
  ),
}

export const Range: Story = {
  render: () => (
    <Field className="max-w-md" label="额度范围">
      <Slider defaultValue={[25, 75]} max={100} step={5} />
    </Field>
  ),
}
