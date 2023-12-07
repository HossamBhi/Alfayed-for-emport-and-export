"use client";
import { SIDEMENU_LINKS } from "@/utils/helper";
// import { SIDEMENU_LINKS } from "@/utils/helper";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";

const PageHeader = () => {
  const pathname = usePathname();
  const { t } = useTranslation();
  // const profile = useSelector((state: RootState) => state.user);

  const title = SIDEMENU_LINKS.find((item) => item.url === pathname)?.title;
  if (pathname.includes("/login") || !title) {
    return;
  }

  return (
    <div className="flex flex-1 justify-between md:py-2 pt-4 px-4">
      <h2 className="text-black text-sm md:text-lg">{t(`menu.${title}`)}</h2>
      {/* <h2 className="text-black text-sm md:text-lg">Welcome {profile?.name}</h2> */}
    </div>
  );
};

export default PageHeader;
