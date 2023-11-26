import React from "react";
import { CustomButton } from "../common";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { ButtonProps } from "@mui/material";

const PopupButton = ({ onClick, children }: ButtonProps) => {
  return (
    <CustomButton
      sx={{ minWidth: "auto" }}
      variant="contained"
      onClick={onClick}
    >
      {children ? children : <BsFillPlusCircleFill />}
    </CustomButton>
  );
};

export default PopupButton;
