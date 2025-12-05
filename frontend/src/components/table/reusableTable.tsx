"use client";

import React from "react";
import { Card } from "@/src/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import clsx from "clsx";
import { Column } from "@/src/interfaces/column";
<<<<<<< HEAD

// export interface Column<T = any> {
//   key: keyof T | string;
//   label: string;
//   align?: "start" | "center" | "end";
//   render?: (value: any, row: T) => React.ReactNode;
// }
=======
>>>>>>> a23e035820c5b81a223ebe19afbb460fe228e5aa

interface ReusableTableProps<T = any> {
  columns: Column<T>[];
  data: T[];
  className?: string;
  emptyMessage?: string;
}

export function ReusableTable<T>({
  columns,
  data,
  className,
  emptyMessage = "No data available.",
}: ReusableTableProps<T>) {
  return (
    <Card className={clsx("overflow-hidden", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.key as string}
                className={clsx({
                  "text-left": col.align === "start" || !col.align,
                  "text-center": col.align === "center",
                  "text-right": col.align === "end",
                })}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center text-muted-foreground py-6"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="hover:bg-accent/5">
                {columns.map((col) => {
                  const value =
                    typeof col.key === "string"
                      ? (row as any)[col.key]
                      : undefined;

                  return (
                    <TableCell
                      key={col.key as string}
                      className={clsx({
                        "text-left": col.align === "start" || !col.align,
                        "text-center": col.align === "center",
                        "text-right": col.align === "end",
                      })}
                    >
                      {col.render ? col.render(value, row) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
