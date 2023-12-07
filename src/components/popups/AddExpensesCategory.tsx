"use client";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { CustomButton, CustomDialog, CustomInput } from "../common";
import { PopupButton } from ".";

type AddExpensesCategoryProps = {
  onClose?: () => void;
};

const AddExpensesCategory = ({ onClose }: AddExpensesCategoryProps) => {
  const { t } = useTranslation();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const handleOnCloseAddProduct = () =>
    onClose ? onClose : setShowAddProduct(false);
  return (
    <div>
      <PopupButton onClick={() => setShowAddProduct(true)}>
        <BsFillPlusCircleFill className="ltr:mr-4 rtl:ml-4" />{" "}
        {t("expenses.addExpensesCategory")}
      </PopupButton>
      <CustomDialog open={showAddProduct} onClose={handleOnCloseAddProduct}>
        <DialogTitle>{t("expenses.addExpensesCategory")}</DialogTitle>
        <DialogContent sx={{ width: "100%" }}>
          <CustomInput
            autoFocus
            margin="dense"
            id="name"
            label={t("expensesCategoryName")}
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={handleOnCloseAddProduct}>
            {t("common.close")}
          </CustomButton>
          <CustomButton onClick={handleOnCloseAddProduct}>
            {t("common.save")}
          </CustomButton>
        </DialogActions>
      </CustomDialog>
    </div>
  );
};

export default AddExpensesCategory;
