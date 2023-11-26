import React from "react";
import { Box, useTheme } from "@mui/material";
import { GiFarmer, GiPayMoney } from "react-icons/gi";

const ExpensesCard = ({ item }: any) => {
  const {
    palette: { primary },
  } = useTheme();
  return (
    <div className="flex hover:bg-gray-100 flex-1 justify-center items-center my-3 bg-gray-50 rounded-lg p-4 cursor-pointer">
      <Box
        className="rounded-lg p-2"
        sx={{ backgroundColor: primary.main + "50" }}
      >
        <GiPayMoney size="28" color={primary.main} />
      </Box>

      <div className="flex-1 px-4">
        <p className="text-sm text-black">{item.name.first}</p>
        <p className="text-xs text-gray-500">Category name</p>
      </div>

      <div className="">
        <p className="font-bold text-lg">{item.total}</p>

        {/* <p>{item.date}</p> */}
      </div>
    </div>
  );
};

export default ExpensesCard;
