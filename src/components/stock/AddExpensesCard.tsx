"use client";
import { CustomTable, PageTitle } from "@/components/common";
import { AddExpenseToStock } from "@/components/popups";
import { useApi } from "@/hooks";
// import { PRODUCTS } from "@/data";
import { RootState } from "@/redux/store";
import { EXPENSES } from "@/utils/endpoints";
import { createDataColumns, formatDate } from "@/utils/helper";
import { GridColDef } from "@mui/x-data-grid";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const AddExpensesCard = ({ farmId }: { farmId: null | number | string }) => {
  // const expenses = useSelector((state: RootState) => state.expenses.expenses);
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { get } = useApi();
  const [expensesData, setExpensesData] = useState([]);
  useEffect(() => {
    if (id != null) {
      get({ url: EXPENSES.getRecordById, params: { id } }).then((res) => {
        console.log("EXPENSES.getRecordById: ", { res });
        if (res.status) {
          setExpensesData([]);
        } else {
          setExpensesData(res);
        }
      });
    }
  }, [window.location]);
  const columns: GridColDef[] =
    !expensesData || expensesData?.length <= 0
      ? []
      : createDataColumns(expensesData[0], (s: string) =>
          t("supplierTable." + s)
        );
  const customeColumns = useMemo(() => {
    return columns
      .filter(
        (col) =>
          col.field !== "expenseID" &&
          col.field !== "farmRecordID" &&
          col.field !== "created_Date"
      )
      .map((col) =>
        col.field === "expenseDate"
          ? {
              ...col,
              valueFormatter: (params: any) => formatDate(params.value),
              width: 150,
              type: "date",
              align: "center",
              headerAlign: "center",
            }
          : col.field === "expenseRecordNotes"
          ? { ...col, width: 150 }
          : col.field === "expenseName"
          ? { ...col, width: 150 }
          : col
      );
  }, [columns]);
  return (
    <div>
      <PageTitle
        className={`mb-4 col-span-1 flex justify-between items-center !text-xl`}
        title={t("AddToStock.expenses")}
      >
        <AddExpenseToStock
          showButtonTitle
          farmId={farmId}
          setExpensesData={setExpensesData}
          expensesData={expensesData}
        />
      </PageTitle>
      <div className="grid grid-cols-1">
        <CustomTable
          rows={expensesData || []}
          columns={customeColumns as any}
          getRowId={(item) => item.farmRecordID}
        />
      </div>
    </div>
  );
};

export default AddExpensesCard;
