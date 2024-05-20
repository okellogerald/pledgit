import React, { CSSProperties, useState } from "react";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnSort,
  Cell,
} from "@tanstack/react-table";
import { FaArrowDownLong } from "react-icons/fa6";
import { FaArrowUpLong } from "react-icons/fa6";
import { FilledButton } from "../buttons/filled_button";
import { OutlineButton } from "../buttons/outline_button";

import * as styles from "./styles";

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  onRowClick?: (row: T) => void;
  onCellClick?: (row: T, columnId: string) => void;
}

export function Table<T>(props: TableProps<T>): React.ReactNode {
  const [sorting, setSorting] = useState<ColumnSort[]>([]);

  const table = useReactTable<T>({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <>
      <table style={styles.table}>
        <thead>
          {table.getHeaderGroups().map((g) => (
            <tr key={g.id} style={styles.tableHeaderRow}>
              {g.headers.map(function (h, i) {
                const sortDir = h.column.getIsSorted();
                const firstHeaderStyles: CSSProperties =
                  i === 0
                    ? {
                        ...styles.tableHeader,
                        ...styles.firstHeader,
                      }
                    : styles.tableHeader;

                return (
                  <th
                    key={h.id}
                    style={firstHeaderStyles}
                    onClick={h.column.getToggleSortingHandler()}
                  >
                    {flexRender(h.column.columnDef.header, h.getContext())}
                    {sortDir === "desc" ? (
                      <FaArrowDownLong style={{ color: "red", height: 20 }} />
                    ) : sortDir === "asc" ? (
                      <FaArrowUpLong style={{ color: "green", height: 20 }} />
                    ) : null}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map(function (r) {
            function onRowClick() {
              if (props.onRowClick) props.onRowClick(r.original);
            }

            function onCellClick(c: Cell<T, unknown>) {
              if (props.onCellClick)
                props.onCellClick(r.original, c.column.columnDef.id ?? "");
            }

            return (
              <tr key={r.id} onClick={onRowClick} style={styles.tableDataRow}>
                {r.getVisibleCells().map(function (c, i) {
                  const _styles: CSSProperties =
                    i === 0 ? styles.firstData : {};

                  return (
                    <td
                      key={c.id}
                      style={_styles}
                      onClick={() => onCellClick(c)}
                    >
                      {flexRender(c.column.columnDef.cell, c.getContext())}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {props.data.length > 10 && (
        <>
          <div>
            <div>
              <FilledButton
                label={"First"}
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              />
              <OutlineButton
                label={"Prev"}
                onClick={table.previousPage}
                disabled={!table.getCanPreviousPage()}
              />
            </div>
            <div>
              <OutlineButton
                label={"Next"}
                onClick={table.nextPage}
                disabled={!table.getCanNextPage()}
              />
              <FilledButton
                label={"Last"}
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Table;
