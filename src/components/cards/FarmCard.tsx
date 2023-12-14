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
      className={`my-3 flex flex-1 cursor-pointer items-center justify-center rounded-lg bg-gray-50 p-4 hover:bg-gray-100 ${containerStyle}`}
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
        <p className="text-sm text-gray-400">{t("common.total")}</p>
        <p className="text-lg font-bold">{item.total}</p>

        {/* <p>{item.date}</p> */}
      </div>
    </div>
  );
};

export default Farmcard;
