import * as React from "react"
import { format as formatDate, type Locale } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Popover, type PopoverAlign } from "./popover"

type DatePickerProps = {
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: React.ReactNode
  format?: string | ((date: Date) => React.ReactNode)
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
    "mode" | "selected" | "onSelect" | "locale"
  >
}

function DatePicker(props: DatePickerProps) {
  const {
    value,
    defaultValue,
    onChange,
    placeholder = "选择日期",
    format = "PPP",
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
  const selectedDate = isValueControlled ? value : internalValue
  const popoverOpen = isOpenControlled ? open : internalOpen

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isOpenControlled) {
      setInternalOpen(nextOpen)
    }
    onOpenChange?.(nextOpen)
  }

  const handleSelect = (date: Date | undefined) => {
    if (!isValueControlled) {
      setInternalValue(date)
    }
    onChange?.(date)

    if (date) {
      handleOpenChange(false)
    }
  }

  const displayValue = selectedDate
    ? typeof format === "function"
      ? format(selectedDate)
      : formatDate(selectedDate, format, { locale })
    : placeholder

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
          data-empty={!selectedDate || undefined}
          className={cn(
            "min-w-48 justify-start text-left font-normal tracking-normal normal-case hover:border-ring/50 hover:bg-input/10 data-empty:text-muted-foreground",
            className
          )}
        >
          <CalendarIcon data-icon="inline-start" />
          <span className="truncate">{displayValue}</span>
        </Button>
      }
      contentProps={{
        className: "w-auto gap-0 p-0",
      }}
    >
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleSelect}
        locale={locale}
        {...calendarProps}
      />
    </Popover>
  )
}

export { DatePicker }
export type { DatePickerProps }
