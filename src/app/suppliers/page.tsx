"use client";
import { CustomTable } from "@/components/common";
import { AddFarm } from "@/components/popups";
import { useApi } from "@/hooks";
import { RootState } from "@/redux/store";
import { SUPPLIERS } from "@/utils/endpoints";
import { createDataColumns, formatDate } from "@/utils/helper";
import { supplierProps } from "@/utils/types";
import { Tooltip } from "@mui/material";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const suppliers = useSelector((state: RootState) => state.suppliers);
  const { t } = useTranslation();
  // const { get } = useApi();
  // const [tableData, setTableData] = useState<null | supplierProps[]>(null);
  const [editData, setEditData] = useState<null | supplierProps>(null);
  const [showEdit, setShowEdit] = useState(false);
  // useEffect(() => {
  //   get({ url: SUPPLIERS.getAll }).then((res) => {
  //     console.log("SUPPLIERS.getAll", { res });

  //     if (!res.status || Array.isArray(res)) {
  //       setTableData(res);
  //     } else {
  //       setTableData([]);
  //       alert("Error " + res.status + ": " + res.data);
  //     }
  //   });
  // }, []);

  const handleRowEdit = (row: supplierProps) => {
    setEditData(row);
    setShowEdit(true);
  };

  const columns: GridColDef[] =
    !suppliers || suppliers?.length <= 0
      ? []
      : createDataColumns(suppliers[0], (s: string) => t("table." + s));

  const customeColumns = useMemo(() => {
    if (columns?.length <= 0) {
      return [];
    }

    return [
      ...columns.map((col) =>
        col.field === "date"
          ? {
              ...col,
              valueFormatter: ({ value }: any) => value ?? formatDate(value),
              width: 150,
              type: "date",
              align: "center",
              headerAlign: "center",
            }
          : col.field === "name"
            ? { ...col, width: 200 }
            : col,
      ),
      {
        field: "action",
        headerName: t("table.actions"),
        width: 150,
        type: "actions",
        getActions: (params: any) => {
          const { id, row } = params;

          return [
            <Tooltip key={1} title={t("common.edit")}>
              <GridActionsCellItem
                icon={<FaRegEdit size={16} />}
                label="Edit"
                sx={{ color: "primary.main" }}
                onClick={() => handleRowEdit(row)}
              />
            </Tooltip>,
            <Tooltip key={2} title={t("common.show")}>
              <GridActionsCellItem
                icon={<FaEye size={16} />}
                label="show"
                sx={{ color: "primary.main" }}
                onClick={() => router.push("/farm-details?id=" + id)}
              />
            </Tooltip>,
          ];
        },
      },
    ];
  }, [columns]);

  // if (!tableData) {
  //   return (
  //     <main className="flex min-h-screen flex-col">
  //       <LinearProgress
  //         sx={{ minWidth: "100%" }}
  //         className="absolute top-0 rounded"
  //       />
  //     </main>
  //   );
  // }

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-2">
      <div className="mb-4">
        {/* <AddFarm showButtonTitle /> */}
        <AddFarm
          showButtonTitle
          editData={editData}
          setEditData={(data) => setEditData(data)}
          show={showEdit}
          onClose={() => setShowEdit(false)}
          onShowClick={() => setShowEdit(true)}
        />
      </div>

      <div className="grid grid-cols-1">
        <CustomTable
          rows={suppliers || []}
          columns={customeColumns as any}
          getRowId={(item) => item.id}
        />
      </div>
    </main>
  );
}
