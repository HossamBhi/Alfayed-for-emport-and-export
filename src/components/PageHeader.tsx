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
    <header
      className={`flex min-h-[48px] flex-1 items-center bg-white px-4 py-2 md:bg-transparent md:px-4 ${
        title
          ? "justify-between"
          : isShowMenu
            ? "justify-end"
            : "justify-between"
      }`}
    >
      {!isShowMenu && <AppLogo className="!mb-0 me-4 !inline md:!hidden" />}
      {title && (
        <h2 className="text-md flex-1 font-bold text-black md:text-lg">
          {t(`menu.${title}`)}
        </h2>
      )}
      {isShowMenu ? (
        <IoClose
          className={"inline cursor-pointer md:hidden"}
          size={24}
          onClick={() => {
            setIsShowMenu(!isShowMenu);
          }}
        />
      ) : (
        <IoMenu
          className={"inline cursor-pointer md:hidden"}
          size={24}
          onClick={() => {
            setIsShowMenu(!isShowMenu);
          }}
        />
      )}
      {/* <h2 className="text-black text-sm md:text-lg">Welcome {profile?.name}</h2> */}
    </header>
  );
};

export default PageHeader;
