"use client"

import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"

import { cn } from "../../lib/utils"
import { Button } from "./button"

type AlertDialogProps = Omit<AlertDialogPrimitive.Root.Props, "children"> & {
  children?: React.ReactNode
  trigger?: React.ReactElement
  title: React.ReactNode
  description?: React.ReactNode
  okText?: React.ReactNode
  cancelText?: React.ReactNode
  onOk?: () => void
  onCancel?: () => void
  confirmLoading?: boolean
  showCancel?: boolean
  footer?: React.ReactNode | false
  actionProps?: Omit<React.ComponentProps<typeof Button>, "children">
  cancelProps?: Omit<React.ComponentProps<typeof Button>, "children">
  contentProps?: Omit<
    React.ComponentProps<typeof AlertDialogContent>,
    "children"
  >
}

function AlertDialog({
  trigger,
  contentProps,
  children,
  title,
  description,
  okText = "确定",
  cancelText = "取消",
  onOk,
  onCancel,
  confirmLoading = false,
  showCancel = true,
  footer,
  actionProps,
  cancelProps,
  ...props
}: AlertDialogProps) {
  return (
    <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props}>
      {trigger && <AlertDialogTrigger render={trigger} />}
      <AlertDialogContent {...contentProps}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        {children}
        {footer !== false && (
          <AlertDialogFooter>
            {footer ?? (
              <>
                {showCancel && (
                  <AlertDialogCancel onClick={onCancel} {...cancelProps}>
                    {cancelText}
                  </AlertDialogCancel>
                )}
                <AlertDialogAction
                  loading={confirmLoading}
                  onClick={onOk}
                  {...actionProps}
                >
                  {okText}
                </AlertDialogAction>
              </>
            )}
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialogPrimitive.Root>
  )
}

function AlertDialogTrigger({ ...props }: AlertDialogPrimitive.Trigger.Props) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal({ ...props }: AlertDialogPrimitive.Portal.Props) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

function AlertDialogOverlay({
  className,
  ...props
}: AlertDialogPrimitive.Backdrop.Props) {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/20 duration-100 supports-backdrop-filter:backdrop-blur-sm data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogContent({
  className,
  size = "default",
  ...props
}: AlertDialogPrimitive.Popup.Props & {
  size?: "default" | "sm"
}) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        data-slot="alert-dialog-content"
        data-size={size}
        className={cn(
          "group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-6 rounded-lg bg-popover p-6 text-popover-foreground shadow-lg/5 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-md data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("grid place-items-start gap-2 text-left", className)}
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        "font-heading text-lg font-semibold tracking-wider uppercase",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(
        "mt-0.5 text-sm leading-relaxed text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-action"
      render={<Button className={cn(className)} {...props} />}
    />
  )
}

function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      render={
        <Button
          className={cn(className)}
          variant={variant}
          size={size}
          {...props}
        />
      }
    />
  )
}

export { AlertDialog }
export type { AlertDialogProps }
