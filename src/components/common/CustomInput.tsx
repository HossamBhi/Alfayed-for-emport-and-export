import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

const CustomInput = ({ ...props }: TextFieldProps) => {
  return <TextField label="Outlined" variant="outlined" {...props} />;
};

export default CustomInput;
