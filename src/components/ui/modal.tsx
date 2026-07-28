import * as React from "react"

import { Dialog } from "./dialog"

type ModalProps = Omit<
  React.ComponentProps<typeof Dialog>,
  "children" | "contentProps" | "onOpenChange"
> & {
  title: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onCancel?: () => void
  onOk?: () => void
  okText?: React.ReactNode
  cancelText?: React.ReactNode
  confirmLoading?: boolean
  closable?: boolean
  footer?: React.ReactNode | false
  className?: string
}

/**
 * 面向业务使用的受控对话框，API 接近 antd Modal。
 * 需要自定义内容结构时，继续使用 Dialog 组合组件。
 */
function Modal({
  title,
  description,
  children,
  open,
  onOpenChange,
  onCancel,
  onOk,
  okText = "确定",
  cancelText = "取消",
  confirmLoading = false,
  closable = true,
  footer,
  className,
  ...props
}: ModalProps) {
  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange?.(nextOpen)
    if (!nextOpen) {
      onCancel?.()
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
      title={title}
      description={description}
      okText={okText}
      cancelText={cancelText}
      onOk={onOk}
      confirmLoading={confirmLoading}
      closable={closable}
      footer={footer}
      contentProps={{ className }}
      {...props}
    >
      {children}
    </Dialog>
  )
}

export { Modal }
export type { ModalProps }
