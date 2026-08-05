import * as React from "react"
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu"
import { CheckIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "../../lib/utils"

type ContextMenuClickInfo = {
  key: React.Key
}

type ContextMenuAlign = NonNullable<
  ContextMenuPrimitive.Positioner.Props["align"]
>

type ContextMenuBaseItem = {
  key: React.Key
  label: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
  shortcut?: React.ReactNode
}

type ContextMenuActionItem = ContextMenuBaseItem & {
  type?: "item"
  danger?: boolean
  onClick?: (info: ContextMenuClickInfo) => void
  children?: ReadonlyArray<ContextMenuItemConfig>
}

type ContextMenuCheckboxConfig = ContextMenuBaseItem & {
  type: "checkbox"
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
}

type ContextMenuRadioConfig = {
  type: "radio"
  key: React.Key
  label?: React.ReactNode
  value: string
  onValueChange?: (value: string) => void
  options: ReadonlyArray<ContextMenuBaseItem & { value: string }>
}

type ContextMenuGroupConfig = {
  type: "group"
  key: React.Key
  label?: React.ReactNode
  children: ReadonlyArray<ContextMenuItemConfig>
}

type ContextMenuDividerConfig = {
  type: "divider"
  key?: React.Key
}

type ContextMenuItemConfig =
  | ContextMenuActionItem
  | ContextMenuCheckboxConfig
  | ContextMenuRadioConfig
  | ContextMenuGroupConfig
  | ContextMenuDividerConfig

type ContextMenuProps = Omit<ContextMenuPrimitive.Root.Props, "children"> & {
  trigger: React.ReactElement
  items: ReadonlyArray<ContextMenuItemConfig>
  align?: ContextMenuAlign
  sideOffset?: number
  onItemClick?: (info: ContextMenuClickInfo) => void
  contentProps?: Omit<
    React.ComponentProps<typeof ContextMenuContent>,
    "children"
  >
}

function ContextMenu({
  trigger,
  items,
  align,
  sideOffset,
  onItemClick,
  contentProps,
  ...props
}: ContextMenuProps) {
  return (
    <ContextMenuPrimitive.Root data-slot="context-menu" {...props}>
      <ContextMenuTrigger render={trigger} />
      <ContextMenuContent
        {...contentProps}
        align={align ?? contentProps?.align}
        sideOffset={sideOffset ?? contentProps?.sideOffset}
      >
        {renderContextMenuItems(items, onItemClick)}
      </ContextMenuContent>
    </ContextMenuPrimitive.Root>
  )
}

function renderContextMenuItems(
  items: ReadonlyArray<ContextMenuItemConfig>,
  onItemClick?: (info: ContextMenuClickInfo) => void
): React.ReactNode {
  return items.map((item, index) => {
    if (item.type === "divider") {
      return <ContextMenuSeparator key={item.key ?? `divider-${index}`} />
    }

    if (item.type === "group") {
      return (
        <ContextMenuGroup key={item.key}>
          {item.label && <ContextMenuLabel>{item.label}</ContextMenuLabel>}
          {renderContextMenuItems(item.children, onItemClick)}
        </ContextMenuGroup>
      )
    }

    if (item.type === "checkbox") {
      return (
        <ContextMenuCheckboxItem
          key={item.key}
          checked={item.checked}
          disabled={item.disabled}
          onCheckedChange={(checked) => item.onCheckedChange?.(checked)}
        >
          {item.icon}
          {item.label}
          {item.shortcut && (
            <ContextMenuShortcut>{item.shortcut}</ContextMenuShortcut>
          )}
        </ContextMenuCheckboxItem>
      )
    }

    if (item.type === "radio") {
      return (
        <ContextMenuGroup key={item.key}>
          {item.label && <ContextMenuLabel>{item.label}</ContextMenuLabel>}
          <ContextMenuRadioGroup
            value={item.value}
            onValueChange={(value) => item.onValueChange?.(String(value))}
          >
            {item.options.map((option) => (
              <ContextMenuRadioItem
                key={option.key}
                value={option.value}
                disabled={option.disabled}
              >
                {option.icon}
                {option.label}
                {option.shortcut && (
                  <ContextMenuShortcut>{option.shortcut}</ContextMenuShortcut>
                )}
              </ContextMenuRadioItem>
            ))}
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
      )
    }

    if (item.children?.length) {
      return (
        <ContextMenuSub key={item.key}>
          <ContextMenuSubTrigger disabled={item.disabled}>
            {item.icon}
            {item.label}
            {item.shortcut && (
              <ContextMenuShortcut>{item.shortcut}</ContextMenuShortcut>
            )}
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            {renderContextMenuItems(item.children, onItemClick)}
          </ContextMenuSubContent>
        </ContextMenuSub>
      )
    }

    const clickInfo = { key: item.key }

    return (
      <ContextMenuItem
        key={item.key}
        disabled={item.disabled}
        variant={item.danger ? "destructive" : "default"}
        onClick={() => {
          item.onClick?.(clickInfo)
          onItemClick?.(clickInfo)
        }}
      >
        {item.icon}
        {item.label}
        {item.shortcut && (
          <ContextMenuShortcut>{item.shortcut}</ContextMenuShortcut>
        )}
      </ContextMenuItem>
    )
  })
}

function ContextMenuTrigger({
  className,
  ...props
}: ContextMenuPrimitive.Trigger.Props) {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      className={cn("select-none", className)}
      {...props}
    />
  )
}

function ContextMenuContent({
  className,
  align = "start",
  alignOffset = 4,
  side = "right",
  sideOffset = 0,
  ...props
}: ContextMenuPrimitive.Popup.Props &
  Pick<
    ContextMenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <ContextMenuPrimitive.Popup
          data-slot="context-menu-content"
          className={cn(
            "z-50 max-h-(--available-height) min-w-48 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-sm bg-popover p-1.5 text-popover-foreground shadow-lg/15 ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        />
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  )
}

function ContextMenuGroup({ ...props }: ContextMenuPrimitive.Group.Props) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  )
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: ContextMenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.GroupLabel
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        "px-3 py-2 text-xs tracking-wider text-muted-foreground uppercase data-inset:ps-9.5",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: ContextMenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/context-menu-item relative flex cursor-pointer items-center gap-2.5 rounded-sm pl-3 pr-2 py-2 text-sm tracking-wider uppercase outline-hidden transition-colors delay-0 duration-100 select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-inset:ps-9.5 data-[variant=destructive]:text-destructive data-[variant=destructive]:data-highlighted:bg-destructive/10 data-[variant=destructive]:data-highlighted:text-destructive motion-reduce:transition-none dark:data-[variant=destructive]:data-highlighted:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 data-highlighted:*:[svg]:text-accent-foreground data-[variant=destructive]:*:[svg]:text-destructive",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuSub({ ...props }: ContextMenuPrimitive.SubmenuRoot.Props) {
  return (
    <ContextMenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />
  )
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: ContextMenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center gap-2.5 rounded-sm pl-3 pr-2 py-2 text-sm tracking-wider uppercase outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-inset:ps-9.5 data-popup-open:bg-accent data-popup-open:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ms-auto rtl:rotate-180" />
    </ContextMenuPrimitive.SubmenuTrigger>
  )
}

function ContextMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuContent>) {
  return (
    <ContextMenuContent
      data-slot="context-menu-sub-content"
      className={cn("min-w-36 shadow-lg", className)}
      side="right"
      {...props}
    />
  )
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: ContextMenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-2.5 rounded-sm py-2 ps-3 pe-8 text-sm tracking-wider uppercase outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-inset:ps-9.5 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute end-2 flex items-center justify-center"
        data-slot="context-menu-checkbox-item-indicator"
      >
        <ContextMenuPrimitive.CheckboxItemIndicator>
          <CheckIcon />
        </ContextMenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

function ContextMenuRadioGroup({
  ...props
}: ContextMenuPrimitive.RadioGroup.Props) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  )
}

function ContextMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: ContextMenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-2.5 rounded-sm py-2 ps-3 pe-8 text-sm tracking-wider uppercase outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-inset:ps-9.5 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute end-2 flex items-center justify-center"
        data-slot="context-menu-radio-item-indicator"
      >
        <ContextMenuPrimitive.RadioItemIndicator>
          <CheckIcon />
        </ContextMenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

function ContextMenuSeparator({
  className,
  ...props
}: ContextMenuPrimitive.Separator.Props) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("-mx-1.5 my-1.5 h-px bg-border/50", className)}
      {...props}
    />
  )
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "ms-auto rounded-sm text-[11px] leading-none tracking-widest text-muted-foreground group-data-highlighted/context-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

export { ContextMenu }
export type {
  ContextMenuAlign,
  ContextMenuClickInfo,
  ContextMenuItemConfig,
  ContextMenuProps,
}
