import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "../../lib/utils"

type SliderProps = SliderPrimitive.Root.Props & {
  showTooltip?: boolean
  tooltipPrefix?: React.ReactNode
  tooltipSuffix?: React.ReactNode
}

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  orientation = "horizontal",
  disabled,
  showTooltip = true,
  tooltipPrefix,
  tooltipSuffix,
  ...props
}: SliderProps) {
  const [activeTooltipIndex, setActiveTooltipIndex] = React.useState<
    number | null
  >(null)
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max]

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (disabled || event.button !== 0) {
      return
    }

    const thumbs = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        '[data-slot="slider-thumb"]'
      )
    )
    const target = event.target as Node
    const pressedThumbIndex = thumbs.findIndex((thumb) =>
      thumb.contains(target)
    )

    if (pressedThumbIndex >= 0) {
      setActiveTooltipIndex(pressedThumbIndex)
      return
    }

    const pointerPosition =
      orientation === "vertical" ? event.clientY : event.clientX
    let closestThumbIndex = -1
    let closestDistance = Number.POSITIVE_INFINITY

    thumbs.forEach((thumb, index) => {
      if (thumb.hasAttribute("data-disabled")) {
        return
      }

      const rect = thumb.getBoundingClientRect()
      const thumbCenter =
        orientation === "vertical"
          ? rect.top + rect.height / 2
          : rect.left + rect.width / 2
      const distance = Math.abs(pointerPosition - thumbCenter)

      if (distance <= closestDistance) {
        closestDistance = distance
        closestThumbIndex = index
      }
    })

    if (closestThumbIndex >= 0) {
      setActiveTooltipIndex(closestThumbIndex)
    }
  }

  function hideTooltip() {
    setActiveTooltipIndex(null)
  }

  return (
    <SliderPrimitive.Root
      className={cn("data-horizontal:w-full data-vertical:h-full", className)}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      orientation={orientation}
      disabled={disabled}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control
        className="relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col"
        onPointerDownCapture={handlePointerDown}
        onPointerUp={hideTooltip}
        onPointerCancel={hideTooltip}
        onLostPointerCapture={hideTooltip}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative grow overflow-hidden bg-input/50 select-none data-horizontal:h-0.5 data-horizontal:w-full data-vertical:h-full data-vertical:w-0.5"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="bg-primary select-none data-horizontal:h-full data-vertical:w-full"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            index={index}
            className="block size-4 shrink-0 rounded-full border-none bg-primary transition-colors select-none hover:ring-3 hover:ring-ring/30 focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-horizontal:cursor-ew-resize data-vertical:cursor-ns-resize"
          >
            {showTooltip && (
              <SliderPrimitive.Value
                data-slot="slider-value-tooltip"
                render={<span aria-hidden="true" />}
                className={cn(
                  "pointer-events-none absolute z-50 inline-flex w-max items-center rounded-sm bg-foreground px-3 py-1.5 text-xs text-background shadow-lg/10 transition-[opacity,scale] duration-100",
                  orientation === "horizontal"
                    ? "bottom-full left-1/2 mb-3 -translate-x-1/2"
                    : "top-1/2 left-full ml-3 -translate-y-1/2",
                  activeTooltipIndex === index
                    ? "visible scale-100 opacity-100"
                    : "invisible scale-95 opacity-0"
                )}
              >
                {(formattedValues, values) => (
                  <>
                    {tooltipPrefix}
                    {formattedValues[index] ?? values[index]}
                    {tooltipSuffix}
                    <span
                      data-slot="slider-value-tooltip-arrow"
                      className={cn(
                        "absolute size-2.5 rotate-45 rounded-none bg-foreground",
                        orientation === "horizontal"
                          ? "top-full left-1/2 -translate-x-1/2 -translate-y-[calc(50%+2px)] rounded-br-xs"
                          : "top-1/2 right-full translate-x-[calc(50%+2px)] -translate-y-1/2 rounded-bl-xs"
                      )}
                    />
                  </>
                )}
              </SliderPrimitive.Value>
            )}
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
export type { SliderProps }
