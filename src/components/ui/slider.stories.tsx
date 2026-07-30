import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, waitFor } from "storybook/test"

import { Field } from "./field"
import { Slider } from "./slider"

const meta = {
  title: "表单组件/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    showTooltip: {
      control: "boolean",
    },
    tooltipPrefix: {
      control: "text",
    },
    tooltipSuffix: {
      control: "text",
    },
  },
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
  play: async ({ canvasElement, userEvent }) => {
    const thumbs = Array.from(
      canvasElement.querySelectorAll<HTMLElement>('[data-slot="slider-thumb"]')
    )
    const tooltips = Array.from(
      canvasElement.querySelectorAll<HTMLElement>(
        '[data-slot="slider-value-tooltip"]'
      )
    )

    expect(thumbs).toHaveLength(2)
    expect(tooltips).toHaveLength(2)

    const rect = thumbs[0].getBoundingClientRect()
    const start = {
      clientX: rect.left + rect.width / 2,
      clientY: rect.top + rect.height / 2,
    }

    await userEvent.pointer([
      { keys: "[MouseLeft>]", target: thumbs[0], coords: start },
      {
        target: thumbs[0],
        coords: { clientX: start.clientX + 30, clientY: start.clientY },
      },
      {
        target: thumbs[0],
        coords: { clientX: start.clientX + 60, clientY: start.clientY },
      },
    ])

    await waitFor(() => {
      expect(tooltips[0]).toBeVisible()
      expect(tooltips[1]).not.toBeVisible()
    })

    await userEvent.pointer({ keys: "[/MouseLeft]" })
    await waitFor(() => expect(tooltips[0]).not.toBeVisible())
  },
}

export const ValueTooltip: Story = {
  render: () => (
    <Field className="max-w-md" label="温度">
      <Slider
        defaultValue={[24]}
        min={-10}
        max={40}
        tooltipPrefix="约 "
        tooltipSuffix="°C"
      />
    </Field>
  ),
  play: async ({ canvasElement, userEvent }) => {
    const thumb = canvasElement.querySelector<HTMLElement>(
      '[data-slot="slider-thumb"]'
    )
    const tooltip = canvasElement.querySelector<HTMLElement>(
      '[data-slot="slider-value-tooltip"]'
    )

    expect(thumb).not.toBeNull()
    expect(tooltip).not.toBeNull()
    expect(tooltip).not.toBeVisible()

    const rect = thumb!.getBoundingClientRect()
    const start = {
      clientX: rect.left + rect.width / 2,
      clientY: rect.top + rect.height / 2,
    }

    await userEvent.pointer({
      keys: "[MouseLeft>]",
      target: thumb!,
      coords: start,
    })

    await waitFor(() => expect(tooltip).toBeVisible())

    await userEvent.pointer([
      {
        target: thumb!,
        coords: { clientX: start.clientX + 40, clientY: start.clientY },
      },
      {
        target: thumb!,
        coords: { clientX: start.clientX + 80, clientY: start.clientY },
      },
    ])

    await waitFor(() => {
      expect(tooltip).toBeVisible()
      expect(tooltip).toHaveTextContent("约 ")
      expect(tooltip).toHaveTextContent("°C")
      expect(tooltip).not.toHaveTextContent("约 24°C")
    })

    const arrow = tooltip!.querySelector<HTMLElement>(
      '[data-slot="slider-value-tooltip-arrow"]'
    )
    expect(arrow).not.toBeNull()

    const tooltipRect = tooltip!.getBoundingClientRect()
    const arrowRect = arrow!.getBoundingClientRect()
    expect(arrowRect.top).toBeGreaterThan(
      tooltipRect.top + tooltipRect.height / 2
    )
    expect(
      Math.abs(
        arrowRect.left +
          arrowRect.width / 2 -
          (tooltipRect.left + tooltipRect.width / 2)
      )
    ).toBeLessThan(2)

    await userEvent.pointer({ keys: "[/MouseLeft]" })
    await waitFor(() => expect(tooltip).not.toBeVisible())
  },
}
