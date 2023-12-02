"use client";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { CustomButton, CustomDialog, CustomInput } from "../common";
import { PopupButton } from ".";

type AddFarmProps = {
  onClose?: () => void;
  show?: boolean;
  hideShowBtn?: boolean;
  editData?: any;
  showButtonTitle?: boolean;
};

const AddFarm = ({
  onClose,
  show,
  hideShowBtn = false,
  editData,
  showButtonTitle,
}: AddFarmProps) => {
  const { t } = useTranslation();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [name, setName] = useState(editData?.name ? editData?.name : "");
  const handleOnCloseAddProduct = () =>
    onClose ? onClose() : setShowAddProduct(false);

  const callAPI = () => {
    if (editData) {
      alert("Update data");
    } else {
      alert("Add data");
    }
  };

  return (
    <div>
      {!hideShowBtn && (
        <PopupButton onClick={() => setShowAddProduct(true)}>
          {showButtonTitle && (
            <>
              <BsFillPlusCircleFill className="ltr:mr-4 rtl:ml-4" />{" "}
              {t("AddFarm.addSupplier")}
            </>
          )}
        </PopupButton>
      )}
      <CustomDialog
        open={show != undefined ? show : showAddProduct}
        onClose={handleOnCloseAddProduct}
      >
        <DialogTitle>
          {editData ? t("AddFarm.editFarm") : t("AddFarm.addFarm")}
        </DialogTitle>
        <DialogContent sx={{ width: "100%" }}>
          <CustomInput
            autoFocus
            margin="dense"
            id="name"
            label={t("AddFarm.farmName")}
            type="text"
            fullWidth
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={handleOnCloseAddProduct}>
            {t("close")}
          </CustomButton>
          <CustomButton
            onClick={() => {
              callAPI();
              handleOnCloseAddProduct();
            }}
          >
            {editData ? t("edit") : t("save")}
          </CustomButton>
        </DialogActions>
      </CustomDialog>
    </div>
  );
};

export default AddFarm;
