import * as React from "react"

import { cn } from "../../lib/utils"
import { Spinner } from "./spinner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

type DataTableColumn<RecordType> = {
  key?: React.Key
  title: React.ReactNode
  dataIndex?: keyof RecordType
  render?: (
    value: RecordType[keyof RecordType] | undefined,
    record: RecordType,
    index: number
  ) => React.ReactNode
  align?: "left" | "center" | "right"
  width?: string | number
  className?: string
}

type DataTableProps<RecordType> = {
  columns: ReadonlyArray<DataTableColumn<RecordType>>
  dataSource: ReadonlyArray<RecordType>
  rowKey?: keyof RecordType | ((record: RecordType) => React.Key)
  loading?: boolean
  emptyText?: React.ReactNode
  className?: string
}

function DataTable<RecordType>({
  columns,
  dataSource,
  rowKey,
  loading = false,
  emptyText = "暂无数据",
  className,
}: DataTableProps<RecordType>) {
  const getRowKey = (record: RecordType, index: number): React.Key => {
    if (typeof rowKey === "function") {
      return rowKey(record)
    }
    if (rowKey) {
      return record[rowKey] as React.Key
    }
    return (record as { key?: React.Key }).key ?? index
  }

  return (
    <Table className={className} aria-busy={loading || undefined}>
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead
              key={
                column.key ??
                (column.dataIndex ? String(column.dataIndex) : index)
              }
              className={cn(
                column.align === "center" && "text-center",
                column.align === "right" && "text-right",
                column.className
              )}
              style={{ width: column.width }}
            >
              {column.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              <Spinner className="mx-auto" />
            </TableCell>
          </TableRow>
        ) : dataSource.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-24 text-center text-muted-foreground"
            >
              {emptyText}
            </TableCell>
          </TableRow>
        ) : (
          dataSource.map((record, rowIndex) => (
            <TableRow key={getRowKey(record, rowIndex)}>
              {columns.map((column, columnIndex) => {
                const value = column.dataIndex
                  ? record[column.dataIndex]
                  : undefined

                return (
                  <TableCell
                    key={
                      column.key ??
                      (column.dataIndex
                        ? String(column.dataIndex)
                        : columnIndex)
                    }
                    className={cn(
                      column.align === "center" && "text-center",
                      column.align === "right" && "text-right",
                      column.className
                    )}
                  >
                    {column.render
                      ? column.render(value, record, rowIndex)
                      : (value as React.ReactNode)}
                  </TableCell>
                )
              })}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}

export { DataTable }
export type { DataTableColumn, DataTableProps }
