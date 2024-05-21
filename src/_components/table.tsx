import React from "react";
import { AgGridReact } from "@ag-grid-community/react"; // React Grid Logic
import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme

import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface TableProps<T> {
  data: T[];
  columns: ColDef<T>[];
  onRowClick?: (row: T) => void;
  onCellClick?: (row: T, columnId: string) => void;
}

export default function Table<T>(props: TableProps<T>): React.ReactNode {
  const defaultColDef = {
    flex: 1,
  };

  return (
    <div
      className={"ag-theme-quartz"}
      style={{ width: "100%", height: "100%" }}
    >
      <AgGridReact<T>
        rowData={props.data}
        columnDefs={props.columns}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}
