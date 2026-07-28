import * as React from "react"
import { Dialog as DrawerPrimitive } from "@base-ui/react/dialog"

import { cn } from "../../lib/utils"
import { Button } from "./button"
import { XIcon } from "lucide-react"

type DrawerProps = Omit<DrawerPrimitive.Root.Props, "children"> & {
  children?: React.ReactNode
  trigger?: React.ReactElement
  title: React.ReactNode
  description?: React.ReactNode
  placement?: "top" | "right" | "bottom" | "left"
  footer?: React.ReactNode
  closable?: boolean
  onClose?: () => void
  contentProps?: Omit<React.ComponentProps<typeof DrawerContent>, "children">
}

function Drawer({
  trigger,
  title,
  description,
  placement = "right",
  footer,
  closable = true,
  onClose,
  onOpenChange,
  contentProps,
  children,
  ...props
}: DrawerProps) {
  const handleOpenChange: DrawerPrimitive.Root.Props["onOpenChange"] = (
    open,
    eventDetails
  ) => {
    onOpenChange?.(open, eventDetails)
    if (!open) {
      onClose?.()
    }
  }

  return (
    <DrawerPrimitive.Root
      data-slot="drawer"
      onOpenChange={handleOpenChange}
      {...props}
    >
      {trigger && (
        <DrawerPrimitive.Trigger data-slot="drawer-trigger" render={trigger} />
      )}
      <DrawerContent
        {...contentProps}
        placement={placement}
        showCloseButton={closable && contentProps?.showCloseButton !== false}
      >
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        <div
          data-slot="drawer-body"
          className="min-h-0 flex-1 overflow-y-auto p-8"
        >
          {children}
        </div>
        {footer && <DrawerFooter>{footer}</DrawerFooter>}
      </DrawerContent>
    </DrawerPrimitive.Root>
  )
}

type DrawerContentProps = DrawerPrimitive.Popup.Props & {
  placement?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}

function DrawerContent({
  className,
  children,
  placement = "right",
  showCloseButton = true,
  ...props
}: DrawerContentProps) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Backdrop
        data-slot="drawer-overlay"
        className="fixed inset-0 z-50 bg-black/20 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-sm"
      />
      <DrawerPrimitive.Popup
        data-slot="drawer-content"
        data-placement={placement}
        className={cn(
          "fixed z-50 flex flex-col bg-popover bg-clip-padding text-sm text-popover-foreground shadow-md transition duration-200 ease-in-out outline-none data-ending-style:opacity-0 data-starting-style:opacity-0",
          "data-[placement=bottom]:inset-x-0 data-[placement=bottom]:bottom-0 data-[placement=bottom]:max-h-[80dvh] data-[placement=bottom]:data-ending-style:translate-y-10 data-[placement=bottom]:data-starting-style:translate-y-10",
          "data-[placement=left]:inset-y-0 data-[placement=left]:left-0 data-[placement=left]:h-full data-[placement=left]:w-3/4 data-[placement=left]:data-ending-style:-translate-x-10 data-[placement=left]:data-starting-style:-translate-x-10 data-[placement=left]:sm:max-w-sm",
          "data-[placement=right]:inset-y-0 data-[placement=right]:right-0 data-[placement=right]:h-full data-[placement=right]:w-3/4 data-[placement=right]:data-ending-style:translate-x-10 data-[placement=right]:data-starting-style:translate-x-10 data-[placement=right]:sm:max-w-sm",
          "data-[placement=top]:inset-x-0 data-[placement=top]:top-0 data-[placement=top]:max-h-[80dvh] data-[placement=top]:data-ending-style:-translate-y-10 data-[placement=top]:data-starting-style:-translate-y-10",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DrawerPrimitive.Close
            data-slot="drawer-close"
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute top-4 right-4 bg-secondary"
              />
            }
          >
            <XIcon />
            <span className="sr-only">关闭</span>
          </DrawerPrimitive.Close>
        )}
      </DrawerPrimitive.Popup>
    </DrawerPrimitive.Portal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("flex flex-col gap-1.5 p-8 pb-0", className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("flex justify-end gap-2 p-8 pt-0", className)}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        "font-heading text-lg font-semibold tracking-wider text-foreground uppercase",
        className
      )}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn(
        "mt-0.5 text-sm leading-relaxed text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Drawer }
export type { DrawerProps }
