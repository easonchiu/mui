import type { Meta, StoryObj } from "@storybook/react-vite"

import { Field, FieldLabel } from "./field"
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
    <Field className="max-w-md">
      <FieldLabel id="slider-density-label">界面密度</FieldLabel>
      <Slider
        aria-labelledby="slider-density-label"
        defaultValue={[40]}
        max={100}
        step={10}
      />
    </Field>
  ),
}

export const Range: Story = {
  render: () => (
    <Field className="max-w-md">
      <FieldLabel id="slider-range-label">额度范围</FieldLabel>
      <Slider
        aria-labelledby="slider-range-label"
        defaultValue={[25, 75]}
        max={100}
        step={5}
      />
    </Field>
  ),
}
