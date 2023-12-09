"use client";
import { ExpensesCard, UserCard } from "@/components/cards";
import { CustomTable } from "@/components/common";
import { AddExpenses, AddFarm } from "@/components/popups";
import { useApi } from "@/hooks";
import { EXPENSES, SUPPLIERS } from "@/utils/endpoints";
import { createDataColumns, formatDate } from "@/utils/helper";
import { supplierDataProps, supplierProps } from "@/utils/types";
import { LinearProgress } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { GiFarmer } from "react-icons/gi";

export default function Home() {
  const { t } = useTranslation();
  const [showEdit, setShowEdit] = useState(false);
  // const [id, setId] = useState<null | string>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { get } = useApi();
  const [supplier, setSupplier] = useState<null | supplierProps>(null);
  const [supplierData, setSupplierData] = useState<null | supplierDataProps[]>(
    null
  );
  useEffect(() => {
    // const searchQuiry = new URLSearchParams(window.location.search);
    // const ID = searchQuiry.get("id");
    if (id != null) {
      // setId(ID);
      get({ url: EXPENSES.getById, params: { id } }).then((res) => {
        console.log("SUPPLIERS.getById", { res });
        // if (Array.isArray(res)) {
        if (!res.status) {
          setSupplier(res);
          setSupplierData(res?.farmRecords || []);
        } else {
          setSupplierData([]);
          alert("Error " + res.status + ": " + res.data);
        }
      });
    }
  }, [id]);

  const columns: GridColDef[] =
    !supplierData || supplierData?.length <= 0
      ? []
      : createDataColumns(supplierData[0], (s: string) =>
          t("supplierTable." + s)
        );

  const customeColumns = useMemo(() => {
    return columns
      .filter(
        (col) =>
          col.field !== "farmsID" &&
          col.field !== "productID" &&
          col.field !== "created_Date"
      )
      .map((col) =>
        col.field === "supplyDate"
          ? {
              ...col,
              valueFormatter: (params: any) => formatDate(params.value),
              width: 150,
              type: "date",
              align: "center",
              headerAlign: "center",
            }
          : col.field === "farmsNotes"
          ? { ...col, width: 200 }
          : col
      );
  }, [columns]);

  if (id === null || !supplier || !supplierData) {
    return (
      <main className="flex min-h-screen flex-col">
        <LinearProgress
          sx={{ minWidth: "100%" }}
          className="absolute top-0 rounded"
        />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="m-0">
        {id != null && (
          <ExpensesCard
            item={supplier}
            containerStyle={"bg-white hover:bg-white mt-0"}
            // showEdit
            // Icon={GiFarmer}
            // onEdit={() => setShowEdit(true)}
            // onClick={() => setShowEdit(true)}
          />
        )}
        <AddExpenses
          hideShowBtn={true}
          editData={supplier}
          setEditData={(data) => setSupplier(data)}
          show={showEdit}
          onClose={() => setShowEdit(false)}
        />
      </div>

      <div className="grid grid-cols-1">
        <CustomTable
          rows={supplierData || []}
          columns={customeColumns as any}
          getRowId={(item) => item.farmRecordID}
        />
      </div>
    </main>
  );
}
