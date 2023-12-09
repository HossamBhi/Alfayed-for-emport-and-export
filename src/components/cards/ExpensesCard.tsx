import React, { ComponentProps } from "react";
import { Box, useTheme } from "@mui/material";
import { GiFarmer, GiPayMoney } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { t } from "i18next";

interface ExpensesCardProps {
  item: any;
  containerStyle: ComponentProps<"div">["className"];
}

const ExpensesCard = ({ item, containerStyle }: ExpensesCardProps) => {
  const router = useRouter();
  const {
    palette: { primary },
  } = useTheme();

  return (
    <div
      className={`flex hover:bg-gray-100 flex-1 justify-center items-center my-3 bg-gray-50 rounded-lg p-4 cursor-pointer ${containerStyle}`}
      onClick={() => router.push("expenses-details?id=" + item.id)}
    >
      <Box
        className="rounded-lg p-2"
        sx={{ backgroundColor: primary.main + "50" }}
      >
        <GiPayMoney size="28" color={primary.main} />
      </Box>

      <div className="flex-1 px-4">
        <p className="text-sm text-black">{item.name}</p>
        <p className="text-xs text-gray-500">{item.expenseTypeName}</p>
      </div>

      <div className="text-center">
        <p className="text-gray-400 text-sm">{t("common.total")}</p>
        <p className="font-bold text-lg">{item.totalRemaining || 0}</p>
      </div>
    </div>
  );
};

export default ExpensesCard;
