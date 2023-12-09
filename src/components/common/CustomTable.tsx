"use client";
import {
  DataGrid,
  DataGridProps,
  GridRowId,
  GridToolbar,
} from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const CustomTable = ({ rows, ...props }: DataGridProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const handleEditRecord = (id: GridRowId) => {
    console.log({ id });
    router.push(`/add-to-stock?id=${id}`);
  };

  return (
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
};

export default CustomTable;
