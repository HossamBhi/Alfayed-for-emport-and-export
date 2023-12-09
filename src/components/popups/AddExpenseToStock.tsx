"use client";
import { DATA } from "@/data";
import { useApi } from "@/hooks";
import { EXPENSES } from "@/utils/endpoints";
import { expenseProps } from "@/utils/types";
import {
  Autocomplete,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AddExpensesCategory, PopupButton } from ".";
import { CustomButton, CustomDialog, CustomInput } from "../common";
import { ExpenseForm } from "../stock";

type AddExpenseToStockProps = {
  onClose?: () => void;
  show?: boolean;
  hideShowBtn?: boolean;
  editData?: any;
  showButtonTitle?: boolean;
  setEditData?: (d: expenseProps) => void;
  farmId: null | number | string;
  setExpensesData: (expensesData: any) => void;
  expensesData: any;
};

const AddExpenseToStock = ({
  onClose,
  show,
  hideShowBtn = false,
  editData,
  showButtonTitle,
  setEditData,
  farmId,
  setExpensesData,
  expensesData,
}: AddExpenseToStockProps) => {
  const { post, put } = useApi();
  const { t } = useTranslation();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [values, setValues] = useState(
    editData
      ? editData
      : {
          farmRecordID: 0,
          expenseID: 0,
          expenseName: "",
          expenseDate: "2023-12-07T17:22:31.679Z",
          created_Date: "2023-12-07T17:22:31.679Z",
          quantity: 0,
          value: 0,
          price: 0,
          additionalPrice: 0,
          additionalNotes: "",
          total: 0,
          paied: 0,
          remaining: 0,
          expenseRecordNotes: "",
        }
  );
  const [errors, setErrors] = useState({
    expenseID: false,
    // expenseDate: "2023-12-07T17:22:31.679Z",
    // created_Date: "2023-12-07T17:22:31.679Z",
    // quantity: 0,
    // value: 0,
    // price: 0,
    // additionalPrice: 0,
    // additionalNotes: "",
    // total: 0,
    // paied: 0,
    // remaining: 0,
  });
  const isValid = () => {
    let isTrue = true;
    if (!values.expenseID) {
      setErrors((v) => ({ ...v, expenseID: true }));
      isTrue = false;
    } else {
      setErrors((v) => ({ ...v, expenseID: false }));
    }

    return isTrue;
  };
  const handleOnCloseAddProduct = () =>
    onClose ? onClose() : setShowAddProduct(false);
  console.log({ expensesData });
  const callAPI = () => {
    if (editData) {
      put({
        url: EXPENSES.updateRecord,
        data: { ...values },
        params: { id: editData.id },
      })
        .then((res) => {
          console.log("EXPENSES.updateRecord: ", res);
          if (res?.id) {
            setEditData && setEditData(res);
          }
        })
        .finally(() => setIsLoad(false));
    } else {
      post({
        url: EXPENSES.addRecord,
        data: { ...values, farmRecordID: farmId },
      })
        .then((res) => {
          console.log("EXPENSES.addRecord: ", res);
          setExpensesData([res, ...expensesData]);
        })
        .finally(() => setIsLoad(false));
    }
  };
  const handleSubmit = () => {
    if (isValid()) {
      setIsLoad(true);
      callAPI();
      handleOnCloseAddProduct();
    }
  };

  return (
    <div>
      {!hideShowBtn && (
        <PopupButton onClick={() => setShowAddProduct(true)} disabled={!farmId}>
          {showButtonTitle && (
            <>
              <BsFillPlusCircleFill className="ltr:mr-4 rtl:ml-4" />{" "}
              {t("AddToStock.addExpenseOnProduct")}
            </>
          )}
        </PopupButton>
      )}
      <CustomDialog
        open={show != undefined ? show : showAddProduct}
        onClose={handleOnCloseAddProduct}
      >
        <DialogTitle>
          {editData ? t("expenses.editExpense") : t("expenses.addExpense")}
        </DialogTitle>
        <DialogContent sx={{ width: "100%", pt: 1 }} className="!pt-1">
          <ExpenseForm
            {...{ values, errors, setValues, setErrors, handleSubmit }}
          />
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={handleOnCloseAddProduct}>
            {t("common.close")}
          </CustomButton>
          {isLoad ? (
            <CircularProgress />
          ) : (
            <CustomButton variant="contained" onClick={handleSubmit}>
              {editData ? t("common.edit") : t("common.save")}
            </CustomButton>
          )}
        </DialogActions>
      </CustomDialog>
    </div>
  );
};

export default AddExpenseToStock;
