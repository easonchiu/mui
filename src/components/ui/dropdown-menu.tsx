import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"

import { cn } from "../../lib/utils"
import { ChevronRightIcon, CheckIcon } from "lucide-react"

type DropdownMenuClickInfo = {
  key: React.Key
}

type DropdownMenuTriggerMode = "click" | "hover"

type DropdownMenuAlign = NonNullable<MenuPrimitive.Positioner.Props["align"]>

type DropdownMenuBaseItem = {
  key: React.Key
  label: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
  shortcut?: React.ReactNode
}

type DropdownMenuActionItem = DropdownMenuBaseItem & {
  type?: "item"
  danger?: boolean
  onClick?: (info: DropdownMenuClickInfo) => void
  children?: ReadonlyArray<DropdownMenuItemConfig>
}

type DropdownMenuCheckboxConfig = DropdownMenuBaseItem & {
  type: "checkbox"
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
}

type DropdownMenuRadioConfig = {
  type: "radio"
  key: React.Key
  label?: React.ReactNode
  value: string
  onValueChange?: (value: string) => void
  options: ReadonlyArray<DropdownMenuBaseItem & { value: string }>
}

type DropdownMenuGroupConfig = {
  type: "group"
  key: React.Key
  label?: React.ReactNode
  children: ReadonlyArray<DropdownMenuItemConfig>
}

type DropdownMenuDividerConfig = {
  type: "divider"
  key?: React.Key
}

type DropdownMenuItemConfig =
  | DropdownMenuActionItem
  | DropdownMenuCheckboxConfig
  | DropdownMenuRadioConfig
  | DropdownMenuGroupConfig
  | DropdownMenuDividerConfig

type DropdownMenuProps = Omit<MenuPrimitive.Root.Props, "children"> & {
  items: ReadonlyArray<DropdownMenuItemConfig>
  trigger?: React.ReactElement
  triggerMode?: DropdownMenuTriggerMode
  align?: DropdownMenuAlign
  sideOffset?: number
  onItemClick?: (info: DropdownMenuClickInfo) => void
  contentProps?: Omit<
    React.ComponentProps<typeof DropdownMenuContent>,
    "children"
  >
}

function DropdownMenu({
  trigger,
  triggerMode = "click",
  align,
  sideOffset,
  items,
  onItemClick,
  contentProps,
  ...props
}: DropdownMenuProps) {
  return (
    <MenuPrimitive.Root data-slot="dropdown-menu" {...props}>
      {trigger && (
        <DropdownMenuTrigger
          render={trigger}
          openOnHover={triggerMode === "hover"}
        />
      )}
      <DropdownMenuContent
        {...contentProps}
        align={align ?? contentProps?.align}
        sideOffset={sideOffset ?? contentProps?.sideOffset}
      >
        {renderMenuItems(items, onItemClick)}
      </DropdownMenuContent>
    </MenuPrimitive.Root>
  )
}

function renderMenuItems(
  items: ReadonlyArray<DropdownMenuItemConfig>,
  onItemClick?: (info: DropdownMenuClickInfo) => void
): React.ReactNode {
  return items.map((item, index) => {
    if (item.type === "divider") {
      return <DropdownMenuSeparator key={item.key ?? `divider-${index}`} />
    }

    if (item.type === "group") {
      return (
        <DropdownMenuGroup key={item.key}>
          {item.label && <DropdownMenuLabel>{item.label}</DropdownMenuLabel>}
          {renderMenuItems(item.children, onItemClick)}
        </DropdownMenuGroup>
      )
    }

    if (item.type === "checkbox") {
      return (
        <DropdownMenuCheckboxItem
          key={item.key}
          checked={item.checked}
          disabled={item.disabled}
          onCheckedChange={(checked) => item.onCheckedChange?.(checked)}
        >
          {item.icon}
          {item.label}
          {item.shortcut && (
            <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
          )}
        </DropdownMenuCheckboxItem>
      )
    }

    if (item.type === "radio") {
      return (
        <DropdownMenuGroup key={item.key}>
          {item.label && <DropdownMenuLabel>{item.label}</DropdownMenuLabel>}
          <DropdownMenuRadioGroup
            value={item.value}
            onValueChange={(value) => item.onValueChange?.(String(value))}
          >
            {item.options.map((option) => (
              <DropdownMenuRadioItem
                key={option.key}
                value={option.value}
                disabled={option.disabled}
              >
                {option.icon}
                {option.label}
                {option.shortcut && (
                  <DropdownMenuShortcut>{option.shortcut}</DropdownMenuShortcut>
                )}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      )
    }

    if (item.children?.length) {
      return (
        <DropdownMenuSub key={item.key}>
          <DropdownMenuSubTrigger disabled={item.disabled}>
            {item.icon}
            {item.label}
            {item.shortcut && (
              <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
            )}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {renderMenuItems(item.children, onItemClick)}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      )
    }

    const clickInfo = { key: item.key }

    return (
      <DropdownMenuItem
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
          <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
        )}
      </DropdownMenuItem>
    )
  })
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "z-50 max-h-(--available-height) w-(--anchor-width) min-w-48 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-sm bg-popover p-1.5 text-popover-foreground shadow-lg/15 ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-3 py-2 text-xs tracking-wider text-muted-foreground uppercase data-inset:pl-9.5",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/dropdown-menu-item relative flex cursor-pointer items-center gap-2.5 rounded-sm pl-3 pr-2 py-2 text-sm tracking-wider uppercase outline-hidden transition-colors delay-0 duration-100 select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-9.5 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive motion-reduce:transition-none dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 [&:focus:hover]:delay-75 data-[variant=destructive]:*:[svg]:text-destructive",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center gap-2 rounded-sm pl-3 pr-2 py-2 text-sm tracking-wider uppercase outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-9.5 data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "w-auto min-w-36 rounded-sm bg-popover p-1.5 text-popover-foreground shadow-lg/15 ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        className
      )}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-2.5 rounded-sm py-2 pr-8 pl-3 text-sm tracking-wider uppercase outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-9.5 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-2.5 rounded-sm py-2 pr-8 pl-3 text-sm tracking-wider uppercase outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-9.5 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1.5 my-1.5 h-px bg-border/50", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto rounded-sm text-[11px] leading-none tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

export { DropdownMenu }
export type {
  DropdownMenuClickInfo,
  DropdownMenuAlign,
  DropdownMenuItemConfig,
  DropdownMenuProps,
  DropdownMenuTriggerMode,
}
