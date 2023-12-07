"use client";
import { DATA, EXPENSES_CATEGORIES } from "@/data";
import { expenseProps } from "@/utils/types";
import {
  Autocomplete,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AddExpensesCategory, PopupButton } from ".";
import {
  CustomButton,
  CustomDialog,
  CustomInput,
  CustomSelect,
} from "../common";
import { useApi } from "@/hooks";
import { EXPENSES } from "@/utils/endpoints";
import { BsFillPlusCircleFill } from "react-icons/bs";

type AddExpensesProps = {
  onClose?: () => void;
  show?: boolean;
  hideShowBtn?: boolean;
  editData?: any;
  showButtonTitle?: boolean;
  setEditData?: (d: expenseProps) => void;
};

const AddExpenses = ({
  onClose,
  show,
  hideShowBtn = false,
  editData,
  showButtonTitle,
  setEditData,
}: AddExpensesProps) => {
  const { post, put } = useApi();
  const { t } = useTranslation();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [name, setName] = useState(editData?.name ? editData?.name : "");
  const [expenseType, setExpenseType] = useState(
    editData?.type ? editData?.type : ""
  );
  const handleOnCloseAddProduct = () =>
    onClose ? onClose() : setShowAddProduct(false);

  const callAPI = () => {
    if (editData) {
      put({
        url: EXPENSES.update,
        data: { name },
        params: { id: editData.id },
      }).then((res) => {
        console.log("Update EXPENSES: ", res);
        if (res?.id) {
          setEditData && setEditData(res);
        }
      });
    } else {
      post({ url: EXPENSES.add, data: { name } }).then((res) => {
        console.log("get EXPENSES: ", res);
      });

      setName("");
    }
  };

  return (
    <div>
      {!hideShowBtn && (
        <PopupButton onClick={() => setShowAddProduct(true)}>
          {showButtonTitle && (
            <>
              <BsFillPlusCircleFill className="ltr:mr-4 rtl:ml-4" />{" "}
              {t("expenses.addExpense")}
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
        <DialogContent sx={{ width: "100%" }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <CustomInput
              autoFocus
              margin="dense"
              id="name"
              label={t("expenses.expensesName")}
              type="text"
              fullWidth
              // variant="standard"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </FormControl>

          <div className="md:col-span-2 col-span-1 flex flex-row justify-between gap-2 border rounded-md items-center ltr:pr-1 rtl:pl-1">
            <Autocomplete
              className="flex-1"
              clearOnEscape
              options={DATA}
              getOptionLabel={(item) => item.name}
              id="type"
              onChange={(e, value) => {
                setExpenseType(value);
              }}
              renderInput={(params) => (
                <CustomInput
                  {...params}
                  id="type"
                  label={t("expenses.expenseCategroy")}
                />
              )}
            />
            <AddExpensesCategory />
          </div>
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={handleOnCloseAddProduct}>
            {t("common.close")}
          </CustomButton>
          <CustomButton
            onClick={() => {
              callAPI();
              handleOnCloseAddProduct();
            }}
          >
            {editData ? t("common.edit") : t("common.save")}
          </CustomButton>
        </DialogActions>
      </CustomDialog>
    </div>
  );
};

export default AddExpenses;
