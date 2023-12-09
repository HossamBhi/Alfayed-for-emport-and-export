"use client";
import { CustomTable, PageTitle } from "@/components/common";
import { AddExpenseToStock } from "@/components/popups";
import { useApi } from "@/hooks";
// import { PRODUCTS } from "@/data";
import { RootState } from "@/redux/store";
import { EXPENSES } from "@/utils/endpoints";
import { createDataColumns, formatDate } from "@/utils/helper";
import { expenseProps } from "@/utils/types";
import { Tooltip } from "@mui/material";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

const AddExpensesCard = ({ farmId }: { farmId: null | number | string }) => {
  // const expenses = useSelector((state: RootState) => state.expenses.expenses);
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { get } = useApi();
  const [expensesData, setExpensesData] = useState<expenseProps[] | null>([]);
  const [editData, setEditData] = useState<null | expenseProps>(null);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    if (id != null) {
      get({ url: EXPENSES.getExpensesForFarmRecord, params: { id } }).then(
        (res) => {
          console.log("EXPENSES.getRecordById: ", { res });
          if (res.status) {
            setExpensesData([]);
          } else {
            setExpensesData(res);
          }
        }
      );
    }
  }, [id]);

  const handleEditExpense = useCallback(() => {}, []);

  const columns: GridColDef[] =
    !expensesData || expensesData?.length <= 0
      ? []
      : createDataColumns(expensesData[0], (s: string) => t("table." + s));
  const customeColumns = useMemo(() => {
    if (columns.length <= 0) return columns;
    return [
      ...columns
        .filter(
          (col) =>
            col.field !== "expenseID" &&
            col.field !== "farmRecordID" &&
            col.field !== "created_Date" &&
            col.field !== "expenseID"
          // col.field !== "expenseRecordID"
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
            : col.field === "additionalNotes"
            ? { ...col, width: 150 }
            : col
        ),
      {
        field: "actions",
        headerName: t("table.actions"),
        width: 150,
        type: "actions",
        getActions: (params: any) => {
          const { row, id } = params;
          return [
            <Tooltip key={id} title={t("common.edit")}>
              <GridActionsCellItem
                icon={<FaRegEdit size={16} />}
                label="Edit"
                sx={{ color: "primary.main" }}
                onClick={() => {
                  setShowEdit(true);
                  setEditData(row);
                }}
              />
            </Tooltip>,
          ];
        },
      },
    ];
  }, [columns]);
  return (
    <div>
      <PageTitle
        className={`mb-4 col-span-1 flex justify-between items-center`}
        title={t("AddToStock.expenses")}
      >
        <AddExpenseToStock
          showButtonTitle
          farmId={farmId}
          setExpensesData={setExpensesData}
          expensesData={expensesData}
          onShowPress={() => setShowEdit(true)}
          show={showEdit}
          onClose={() => setShowEdit(false)}
          editData={editData}
          setEditData={setEditData}
        />
      </PageTitle>
      <div className="grid grid-cols-1">
        <CustomTable
          rows={expensesData || []}
          columns={customeColumns as any}
          getRowId={(item) => item.expenseRecordID}
        />
      </div>
    </div>
  );
};

export default AddExpensesCard;
