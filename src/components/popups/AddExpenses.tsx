"use client";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFillPlusCircleFill } from "react-icons/bs";
import {
  CustomButton,
  CustomDialog,
  CustomInput,
  CustomSelect,
} from "../common";
import { EXPENSES_CATEGORIES } from "@/data";
import { PopupButton } from ".";

type AddExpensesProps = {
  onClose?: () => void;
};

const AddExpenses = ({ onClose }: AddExpensesProps) => {
  const { t } = useTranslation();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const handleOnCloseAddProduct = () =>
    onClose ? onClose : setShowAddProduct(false);
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent<any>) => {
    console.log({ event });
    setAge(event.target.value);
  };

  return (
    <div>
      <PopupButton onClick={() => setShowAddProduct(true)} />

      <CustomDialog open={showAddProduct} onClose={handleOnCloseAddProduct}>
        <DialogTitle>{t("addExpenses")}</DialogTitle>
        <DialogContent sx={{ width: "100%" }}>
          <CustomInput
            autoFocus
            margin="dense"
            id="name"
            label={t("expensesName")}
            type="text"
            fullWidth
            variant="standard"
          />
          <CustomSelect
            label={t("expenseCategroy")}
            items={EXPENSES_CATEGORIES}
            value={age}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={handleOnCloseAddProduct}>
            {t("close")}
          </CustomButton>
          <CustomButton onClick={handleOnCloseAddProduct}>
            {t("save")}
          </CustomButton>
        </DialogActions>
      </CustomDialog>
    </div>
  );
};

export default AddExpenses;
