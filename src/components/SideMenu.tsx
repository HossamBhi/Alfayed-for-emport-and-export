"use client";
import i18n, { LANGUAGES } from "@/langs";
import { SIDEMENU_LINKS } from "@/utils/helper";
import { Box, Tooltip, useTheme } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";
import { FaCanadianMapleLeaf } from "react-icons/fa";
import { CustomButton } from "./common";

export const AppLogo = ({
  className = "",
}: {
  className?: ComponentProps<"div">["className"];
}) => (
  <Box
    className={`cursor-pointer p-2 rounded-lg inline-block md:mb-3 mb-1 ${className}`}
    sx={{ backgroundColor: "primary.main" }}
  >
    <Link href={"/"}>
      <FaCanadianMapleLeaf
        className="md:text-[24px] text-[16px]"
        color="#fff"
      />
    </Link>
  </Box>
);

const SideMenu = ({
  isShowMenu,
  setIsShowMenu,
}: {
  isShowMenu: boolean;
  setIsShowMenu: (b: boolean) => void;
}) => {
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
    <div
      className={`md:w-20 w-16 bg-white h-screen flex-col justify-between p-4 pt-2 border-r-[1px] md:flex ${
        isShowMenu ? "flex" : "hidden"
      }`}
    >
      {/* <div className="flex fixed w-20 bg-white h-screen flex-col justify-between p-4 border-r-[1px]"> */}
      <div className="flex flex-col items-center">
        <AppLogo />
        <span className="border-b-[1px] w-full p-2 border-gray-200 mb-6"></span>
        {SIDEMENU_LINKS.map(({ title, url, ActiveIcon, InActiveIcon }, i) => (
          <Link href={url} key={url + " " + i}>
            <Tooltip title={title}>
              <div
                className={`bg-gray-100 hover:bg-gray-200 cursor-pointer md:p-3 p-2 rounded-lg inline-block mb-4 ${
                  pathname === url
                    ? "bg-blue-200 hover:bg-blue-100"
                    : "text-black"
                }`}
              >
                {pathname === url ? (
                  <ActiveIcon
                    className="md:text-[24px] text-[16px]"
                    color={primary.main}
                  />
                ) : (
                  <InActiveIcon className="md:text-[20px] text-[16px]" />
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
