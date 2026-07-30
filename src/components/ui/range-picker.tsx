import * as React from "react"
import {
  format as formatDate,
  isBefore,
  startOfDay,
  type Locale,
} from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Popover, type PopoverAlign } from "./popover"

type RangePickerProps = {
  value?: DateRange
  defaultValue?: DateRange
  onChange?: (range: DateRange | undefined) => void
  placeholder?: React.ReactNode
  calendarLabel?: string
  format?: string | ((range: DateRange) => React.ReactNode)
  separator?: React.ReactNode
  locale?: Locale
  disabled?: boolean
  className?: string
  size?: React.ComponentProps<typeof Button>["size"]
  align?: PopoverAlign
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  calendarProps?: Omit<
    React.ComponentProps<typeof Calendar>,
    "mode" | "selected" | "onSelect" | "locale" | "showOutsideDays"
  >
}

function RangePicker(props: RangePickerProps) {
  const {
    value,
    defaultValue,
    onChange,
    placeholder = "选择日期范围",
    calendarLabel = "选择日期范围",
    format = "LLL dd, y",
    separator = " - ",
    locale,
    disabled,
    className,
    size = "default",
    align = "start",
    open,
    defaultOpen = false,
    onOpenChange,
    calendarProps,
  } = props
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const isValueControlled = Object.prototype.hasOwnProperty.call(props, "value")
  const isOpenControlled = Object.prototype.hasOwnProperty.call(props, "open")
  const selectedRange = isValueControlled ? value : internalValue
  const popoverOpen = isOpenControlled ? open : internalOpen
  const { numberOfMonths = 2, ...rangeCalendarProps } = calendarProps ?? {}

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isOpenControlled) {
      setInternalOpen(nextOpen)
    }
    onOpenChange?.(nextOpen)
  }

  const handleSelect = (_range: DateRange | undefined, triggerDate: Date) => {
    const start = selectedRange?.from
    const isSelectingStart =
      !start ||
      !!selectedRange.to ||
      isBefore(startOfDay(triggerDate), startOfDay(start))
    const range = isSelectingStart
      ? { from: triggerDate, to: undefined }
      : { from: start, to: triggerDate }

    if (!isValueControlled) {
      setInternalValue(range)
    }
    onChange?.(range)

    if (range?.from && range.to) {
      handleOpenChange(false)
    }
  }

  const displayValue = (() => {
    if (!selectedRange?.from) {
      return placeholder
    }

    if (typeof format === "function") {
      return format(selectedRange)
    }

    const from = formatDate(selectedRange.from, format, { locale })

    if (!selectedRange.to) {
      return from
    }

    const to = formatDate(selectedRange.to, format, { locale })
    return (
      <>
        {from}
        {separator}
        {to}
      </>
    )
  })()

  return (
    <Popover
      open={popoverOpen}
      onOpenChange={handleOpenChange}
      align={align}
      trigger={
        <Button
          variant="outline"
          size={size}
          disabled={disabled}
          data-empty={!selectedRange?.from || undefined}
          className={cn(
            "min-w-72 justify-start rounded-sm text-left font-normal tracking-normal normal-case hover:border-ring/50 hover:bg-input/10 data-empty:text-muted-foreground",
            className
          )}
        >
          <CalendarIcon data-icon="inline-start" />
          <span className="truncate">{displayValue}</span>
        </Button>
      }
      contentProps={{
        "aria-label": calendarLabel,
        className: "w-auto gap-0 p-0",
      }}
    >
      <Calendar
        mode="range"
        defaultMonth={selectedRange?.from}
        selected={selectedRange}
        onSelect={handleSelect}
        numberOfMonths={numberOfMonths}
        showOutsideDays={numberOfMonths === 1}
        locale={locale}
        {...rangeCalendarProps}
      />
    </Popover>
  )
}

export { RangePicker }
export type { RangePickerProps }
