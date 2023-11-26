"use client";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { CustomButton, CustomDialog, CustomInput } from "../common";
import { PopupButton } from ".";

type AddFarmProps = {
  onClose?: () => void;
};

const AddFarm = ({ onClose }: AddFarmProps) => {
  const { t } = useTranslation();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const handleOnCloseAddProduct = () =>
    onClose ? onClose : setShowAddProduct(false);
  return (
    <div>
      <PopupButton onClick={() => setShowAddProduct(true)} />
      <CustomDialog open={showAddProduct} onClose={handleOnCloseAddProduct}>
        <DialogTitle>{t("addFarm")}</DialogTitle>
        <DialogContent sx={{ width: "100%" }}>
          <CustomInput
            autoFocus
            margin="dense"
            id="name"
            label={t("farmName")}
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

export default AddFarm;
