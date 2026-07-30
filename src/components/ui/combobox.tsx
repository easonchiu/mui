import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react"

import { cn } from "../../lib/utils"
import { Input } from "./input"

type ComboboxOption<Value> = {
  label: string
  value: Value
  disabled?: boolean
  render?: React.ReactNode
}

type ComboboxProps<Value> = Omit<
  ComboboxPrimitive.Root.Props<Value, false>,
  | "children"
  | "items"
  | "multiple"
  | "itemToStringLabel"
  | "itemToStringValue"
  | "onValueChange"
  | "onInputValueChange"
> & {
  options: ReadonlyArray<ComboboxOption<Value>>
  placeholder?: string
  emptyText?: React.ReactNode
  allowClear?: boolean
  showTrigger?: boolean
  className?: string
  contentClassName?: string
  "aria-label"?: string
  onChange?: (value: Value | null) => void
  onSearch?: (value: string) => void
}

function Combobox<Value>({
  options,
  placeholder,
  emptyText = "暂无匹配结果",
  allowClear = false,
  showTrigger = true,
  disabled = false,
  className,
  contentClassName,
  "aria-label": ariaLabel,
  onChange,
  onSearch,
  ...props
}: ComboboxProps<Value>) {
  const anchorRef = React.useRef<HTMLDivElement | null>(null)
  const values = options.map((option) => option.value)
  const getOption = (value: Value) =>
    options.find((option) => Object.is(option.value, value))

  return (
    <ComboboxPrimitive.Root
      items={values}
      disabled={disabled}
      itemToStringLabel={(value) => getOption(value)?.label ?? ""}
      itemToStringValue={(value) => String(value)}
      onValueChange={(value) => onChange?.(value)}
      onInputValueChange={(value) => onSearch?.(value)}
      {...props}
    >
      <div ref={anchorRef} className={cn("w-full", className)}>
        <ComboboxPrimitive.Input
          aria-label={ariaLabel}
          placeholder={placeholder}
          render={
            <Input
              disabled={disabled}
              suffix={
                <div className="flex items-center has-[>[data-slot=combobox-clear]]:[&>[data-slot=combobox-trigger]]:hidden">
                  {showTrigger && (
                    <ComboboxPrimitive.Trigger
                      data-slot="combobox-trigger"
                      disabled={disabled}
                      aria-label={
                        ariaLabel ? `打开${ariaLabel}选项` : "打开选项"
                      }
                      className="group/combobox-trigger flex size-6 items-center justify-center rounded-sm outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 data-pressed:bg-transparent"
                    >
                      <ChevronDownIcon className="pointer-events-none size-3.5 text-muted-foreground transition-transform group-data-[popup-open]/combobox-trigger:rotate-180" />
                    </ComboboxPrimitive.Trigger>
                  )}

                  {allowClear && (
                    <ComboboxPrimitive.Clear
                      data-slot="combobox-clear"
                      disabled={disabled}
                      aria-label="清除"
                      className="flex size-6 items-center justify-center rounded-sm outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50"
                    >
                      <XIcon className="pointer-events-none size-3.5" />
                    </ComboboxPrimitive.Clear>
                  )}
                </div>
              }
            />
          }
        />
      </div>

      <ComboboxPrimitive.Portal>
        <ComboboxPrimitive.Positioner
          anchor={anchorRef}
          side="bottom"
          sideOffset={6}
          align="start"
          className="isolate z-50"
        >
          <ComboboxPrimitive.Popup
            data-slot="combobox-content"
            className={cn(
              "group/combobox-content relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) origin-(--transform-origin) overflow-hidden rounded-sm bg-popover text-popover-foreground shadow-lg/5 ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
              contentClassName
            )}
          >
            <ComboboxPrimitive.Empty className="hidden w-full justify-center py-3 text-center text-sm text-muted-foreground group-data-empty/combobox-content:flex">
              {emptyText}
            </ComboboxPrimitive.Empty>

            <ComboboxPrimitive.List className="no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1.5 overflow-y-auto overscroll-contain p-1.5 data-empty:p-0">
              <ComboboxPrimitive.Collection>
                {(value: Value, index: number) => {
                  const option = getOption(value)

                  if (!option) {
                    return null
                  }

                  return (
                    <ComboboxPrimitive.Item
                      key={String(option.value)}
                      value={option.value}
                      index={index}
                      disabled={option.disabled}
                      data-slot="combobox-item"
                      className="relative flex w-full cursor-pointer items-center gap-2.5 rounded-sm transition-all py-2 pr-8 pl-3 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&:not([data-disabled]):hover]:bg-accent [&:not([data-disabled]):hover]:text-accent-foreground"
                    >
                      {option.render ?? option.label}
                      <ComboboxPrimitive.ItemIndicator
                        render={
                          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
                        }
                      >
                        <CheckIcon className="pointer-events-none size-3.5" />
                      </ComboboxPrimitive.ItemIndicator>
                    </ComboboxPrimitive.Item>
                  )
                }}
              </ComboboxPrimitive.Collection>
            </ComboboxPrimitive.List>
          </ComboboxPrimitive.Popup>
        </ComboboxPrimitive.Positioner>
      </ComboboxPrimitive.Portal>
    </ComboboxPrimitive.Root>
  )
}

export { Combobox }
export type { ComboboxOption, ComboboxProps }
