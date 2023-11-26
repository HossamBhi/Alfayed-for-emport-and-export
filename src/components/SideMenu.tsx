"use client";
import i18n, { LANGUAGES } from "@/langs";
import { SIDEMENU_LINKS } from "@/utils/helper";
import { Box, Tooltip, useTheme } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CustomButton } from "./common";
import { FaCanadianMapleLeaf } from "react-icons/fa";

const SideMenu = () => {
  const pathname = usePathname();
  const {
    palette: { primary },
  } = useTheme();
  const handleChangeLanugage = () => {
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
  };

  if (pathname.includes("/login")) {
    return (
      <div className="flex fixed w-20 bg-gray-100 h-screen flex-col justify-between p-4"></div>
    );
  }
  return (
    <div className="flex fixed w-20 bg-white h-screen flex-col justify-between p-4 border-r-[1px]">
      <div className="flex flex-col items-center">
        <Box
          className={`cursor-pointer p-3 rounded-lg inline-block mb-4 `}
          sx={{ backgroundColor: primary.main }}
        >
          <Link href={"/"}>
            <FaCanadianMapleLeaf size={24} color="#fff" />
          </Link>
        </Box>
        <span className="border-b-[1px] w-full p-2 border-gray-200 mb-6"></span>
        {SIDEMENU_LINKS.map(({ title, url, ActiveIcon, InActiveIcon }, i) => (
          <Link href={url} key={url + " " + i}>
            <Tooltip title={title}>
              <div
                className={`bg-gray-100 hover:bg-gray-200 cursor-pointer  p-3 rounded-lg inline-block mb-4 ${
                  pathname === url
                    ? "bg-blue-200 hover:bg-blue-100"
                    : "text-black"
                }`}
              >
                {pathname === url ? (
                  <ActiveIcon size="24" color={primary.main}/>
                ) : (
                  <InActiveIcon size="20" />
                )}
              </div>
            </Tooltip>
          </Link>
        ))}
        <CustomButton
          // leftIcon={<HiOutlineLanguage />}
          onClick={handleChangeLanugage}
          // containerStyles={`text-sm font-bold bg-gray-100 hover:bg-gray-200 cursor-pointer  p-3 rounded-lg inline-block mb-4 ${"bg-blue-200 hover:bg-blue-100 text-primary"}`}
        >
          {LANGUAGES.find((lang) => lang.code === i18n.language)?.label ||
            LANGUAGES[0].label}
        </CustomButton>
      </div>
    </div>
  );
};

export default SideMenu;
