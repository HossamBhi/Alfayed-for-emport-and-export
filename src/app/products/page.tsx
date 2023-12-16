"use client";
import { CustomTable } from "@/components/common";
import { AddPropduct } from "@/components/popups";
import { useApi } from "@/hooks";
import { PRODUCTS } from "@/utils/endpoints";
import { createDataColumns, formatDate } from "@/utils/helper";
import { supplierProps } from "@/utils/types";
import { Tooltip } from "@mui/material";
import {
  GridActionsCellItem,
  GridColDef,
  GridValueFormatterParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaRegEdit } from "react-icons/fa";

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation();
  const { get } = useApi();
  const [tableData, setTableData] = useState<null | supplierProps[]>(null);
  useEffect(() => {
    get({ url: PRODUCTS.getAllDetails }).then((res) => {
      console.log("PRODUCTS.getAllDetails", {
        res,
        s: !res.status,
        t: !res.status || Array.isArray(res),
      });
      // if (Array.isArray(res)) {
      if (!res.status || Array.isArray(res)) {
        setTableData(res);
      } else {
        setTableData([]);
        alert("Error " + res.status + ": " + res.data);
      }
    });
  }, []);

  const columns: GridColDef[] =
    !tableData || tableData?.length <= 0
      ? []
      : createDataColumns(tableData[0], (s: string) => t("table." + s));

  const customeColumns = useMemo(() => {
    if (columns?.length <= 0) {
      return [];
    }

    return [
      ...columns
        .filter(
          (col) =>
            col.field !== "farmsID" &&
            col.field !== "productID" &&
            col.field !== "created_Date",
        )
        .map((col) =>
          col.field === "supplyDate"
            ? {
                ...col,
                width: 150,
                type: "date",
                align: "center",
                headerAlign: "center",
                valueFormatter: (params: GridValueFormatterParams) =>
                  formatDate(params.value),
                valueGetter: (params: GridValueGetterParams) =>
                  formatDate(params.value),
              }
            : col.field === "farmsNotes"
              ? { ...col, width: 200 }
              : col.field === "isPercentage"
                ? {
                    ...col,
                    width: 120,
                    headerName: t("AddToStock.discountType"),
                    valueGetter: (params: any) => {
                      if (params.value === 1) {
                        return t("AddToStock.discountPercentage");
                      }
                      return t("AddToStock.discountFlat");
                    },
                  }
                : col,
        ),
      {
        field: "action",
        headerName: t("table.actions"),
        width: 150,
        type: "actions",
        getActions: (params: any) => {
          const { id } = params;

          return [
            <Tooltip key={id} title={t("common.edit")}>
              <GridActionsCellItem
                icon={<FaRegEdit size={16} />}
                label="Edit"
                sx={{ color: "primary.main" }}
                onClick={() => router.push("/add-to-stock?id=" + id)}
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
        <AddPropduct showButtonTitle />
        {/* <AddFarm
          hideShowBtn={true}
          editData={supplier}
          setEditData={(data) => setSupplier(data)}
          show={showEdit}
          onClose={() => setShowEdit(false)}
        /> */}
      </div>

      <div className="grid grid-cols-1">
        <CustomTable
          rows={tableData || []}
          columns={customeColumns as any}
          getRowId={(item) => item.farmRecordID}
        />
      </div>
    </main>
  );
}
