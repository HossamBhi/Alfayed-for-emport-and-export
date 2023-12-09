"use client";
import { DataGrid, DataGridProps, GridToolbar } from "@mui/x-data-grid";

const CustomTable = ({ rows, ...props }: DataGridProps) => (
  <div className="w-full relative overflow-y-auto m-0 bg-white ">
    <div style={{ width: "100%" }} className="h-[80vh]">
      <DataGrid
        rows={rows}
        {...{ rowLength: 5 }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{ toolbar: { showQuickFilter: true } }}
        initialState={{
          filter: {
            filterModel: {
              items: [],
              quickFilterExcludeHiddenColumns: true,
            },
          },
        }}
        {...props}
      />
    </div>
  </div>
);

export default CustomTable;
