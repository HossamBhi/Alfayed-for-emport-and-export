"use client";
import { SIDEMENU_LINKS } from "@/utils/helper";
// import { SIDEMENU_LINKS } from "@/utils/helper";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
import { IoClose, IoMenu } from "react-icons/io5";
import { AppLogo } from "./SideMenu";
const PageHeader = ({
  isShowMenu,
  setIsShowMenu,
}: {
  isShowMenu: boolean;
  setIsShowMenu: (b: boolean) => void;
}) => {
  const pathname = usePathname();
  const { t } = useTranslation();
  // const profile = useSelector((state: RootState) => state.user);

  const title = SIDEMENU_LINKS.find((item) => item.url === pathname)?.title;
  if (pathname.includes("/login")) {
    // if (pathname.includes("/login") || !title) {
    return;
  }

  return (
    <div
      className={`flex flex-1  md:py-2 md:px-4 px-2 md:bg-transparent bg-white items-center pt-2 py-2 ${
        title ? "justify-between" : "justify-end"
      }`}
    >
      {/* <AppLogo className="mb-0" /> */}
      {title && (
        <h2 className="text-black text-sm md:text-lg flex-1">
          {t(`menu.${title}`)}
        </h2>
      )}
      {isShowMenu ? (
        <IoClose
          className={"cursor-pointer self-end md:hidden inline"}
          size={24}
          onClick={() => {
            setIsShowMenu(!isShowMenu);
          }}
        />
      ) : (
        <IoMenu
          className={"cursor-pointer self-end md:hidden inline"}
          size={24}
          onClick={() => {
            setIsShowMenu(!isShowMenu);
          }}
        />
      )}
      {/* <h2 className="text-black text-sm md:text-lg">Welcome {profile?.name}</h2> */}
    </div>
  );
};

export default PageHeader;
