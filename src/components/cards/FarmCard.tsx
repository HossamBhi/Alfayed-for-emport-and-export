import React, { ComponentProps } from "react";
import { Box, useTheme } from "@mui/material";
import { GiFarmer } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

interface FarmcardProps {
  item: any;
  containerStyle: ComponentProps<"div">["className"];
}

const Farmcard = ({ item, containerStyle }: FarmcardProps) => {
  const {
    palette: { primary },
  } = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <div
      className={`flex hover:bg-gray-100 flex-1 justify-center items-center my-3 bg-gray-50 rounded-lg p-4 cursor-pointer ${containerStyle}`}
      onClick={() => router.push("farm-details?id=" + item.id)}
    >
      <Box
        className="rounded-lg p-2"
        sx={{ backgroundColor: primary.main + "50" }}
      >
        <GiFarmer size="28" color={primary.main} />
      </Box>

      <div className="flex-1 px-4">
        <p className="text-sm text-gray-800">{item.name}</p>
      </div>

      <div className="">
        <p className="text-gray-400 text-sm">{t("common.total")}</p>
        <p className="font-bold text-lg">{item.total}</p>

        {/* <p>{item.date}</p> */}
      </div>
    </div>
  );
};

export default Farmcard;
