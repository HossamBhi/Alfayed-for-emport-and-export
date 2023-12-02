"use client";
import { PageHeader, SideMenu } from "@/components";
import { CircularProgress } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
// import { RootState } from "../redux/store";
const  App = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  // const { isLoad } = useSelector((state: RootState) => state.appSettings);
  const [wait, setWait] = useState(true);
  const pathname = usePathname();
  // const profile = useSelector((state: RootState) => state.auth);
  const route = useRouter();
  // useEffect(() => {
  //   if (profile === null) route.push("/login");
  // }, [profile]);

  useEffect(() => {
    setTimeout(() => {
      setWait(false);
    }, 100);
  }, []);

  return (
    <>
      {/* {(wait || isLoad) && (
        <div className="bg-black-100  bg-opacity-55 absolute top-0 h-[100vh] w-full justify-center items-center flex-1 flex z-50">
          <CircularProgress size={50} thickness={4} value={100} />
        </div>
      )} */}
      {!wait && (
        <>
          {pathname.includes("/login") ? (
            <>{children}</>
          ) : (
            <>
              <SideMenu />
              <div
                className={`bg-gray-100 ${
                  i18n.dir() === "rtl" ? "mr-20" : "ml-20"
                }`}
              >
                <PageHeader />
                {children}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default App;
