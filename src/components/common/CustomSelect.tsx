import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import React from "react";

type CustomSelectProps = {
  label: string;
  items: { value: number | string; label: string }[];
};

const CustomSelect = ({
  label,
  items,
  ...props
}: SelectProps & CustomSelectProps) => {
  return (
    <FormControl fullWidth variant="standard">
      <InputLabel id={label}>{label}</InputLabel>
      <Select labelId={label} id={label} label={label} {...props}>
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
