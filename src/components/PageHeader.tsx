"use client";
import { RootState } from "@/redux/store";
// import { SIDEMENU_LINKS } from "@/utils/helper";
import { usePathname } from "next/navigation";
// import { useSelector } from "react-redux";

const PageHeader = () => {
  const pathname = usePathname();
  // const profile = useSelector((state: RootState) => state.auth);

  if (pathname.includes("/login")) {
    return;
  }

  return (
    <div className="flex flex-1 justify-between md:py-2 pt-4 px-4">
      <h2 className="text-black text-sm md:text-lg">
        {/* {SIDEMENU_LINKS.find((item) => item.url === pathname)?.title} */}
      </h2>
      {/* <h2 className="text-black text-sm md:text-lg">Welcome {profile?.name}</h2> */}
    </div>
  );
};

export default PageHeader;
