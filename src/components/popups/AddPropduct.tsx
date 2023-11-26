"use client";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { CustomButton, CustomDialog, CustomInput } from "../common";
import { PopupButton } from ".";

type AddPropductProps = {
  onClose?: () => void;
};

const AddPropduct = ({ onClose }: AddPropductProps) => {
  const { t } = useTranslation();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const handleOnCloseAddProduct = () =>
    onClose ? onClose : setShowAddProduct(false);
  return (
    <div>
      <PopupButton onClick={() => setShowAddProduct(true)}>
        <BsFillPlusCircleFill className="ltr:mr-4 rtl:ml-4" />{" "}
        {t("addPropduct")}
      </PopupButton>
      <CustomDialog open={showAddProduct} onClose={handleOnCloseAddProduct}>
        <DialogTitle>{t("addPropduct")}</DialogTitle>
        <DialogContent sx={{ width: "100%" }}>
          <CustomInput
            autoFocus
            margin="dense"
            id="name"
            label={t("productName")}
            type="text"
            fullWidth
            variant="standard"
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

export default AddPropduct;