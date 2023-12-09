"use client";
import { PageHeader, SideMenu } from "@/components";
import { useApi } from "@/hooks";
import { saveClientsAction } from "@/redux/clients";
import { saveExpensesAction } from "@/redux/expenses";
import { RootState } from "@/redux/store";
import { saveSuppliersAction } from "@/redux/suppliers";
import { CLIENT, EXPENSES, SUPPLIERS } from "@/utils/endpoints";
import { LinearProgress } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
// import { useSelector } from "react-redux";
// import { RootState } from "../redux/store";
const App = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const { isLoad } = useSelector((state: RootState) => state.appSettings);
  const [wait, setWait] = useState(true);
  const pathname = usePathname();
  // const profile = useSelector((state: RootState) => state.user);
  // const router = useRouter();
  // useEffect(() => {
  //   if (profile === null) route.push("/login");
  // }, [profile]);

  const { get } = useApi();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Call me iam all apis statics");
    get({ url: SUPPLIERS.getAll }).then((res) => {
      console.log("SUPPLIERS.getAll: ", { res });
      if (Array.isArray(res)) {
        // setSuppliers(res);
        dispatch(saveSuppliersAction(res));
      } else {
        // alert("Error: get suppliers");
        // setSuppliers([]);
        // if (!suppliers) {
        dispatch(saveSuppliersAction([]));
        // }
      }
    });
    get({ url: EXPENSES.getAll }).then((res) => {
      console.log("EXPENSES.getAll: ", { res });
      if (Array.isArray(res)) {
        // setSuppliers(res);
        dispatch(saveExpensesAction(res));
      } else {
        // alert("Error: get suppliers");
        // setSuppliers([]);
        // if (!suppliers) {
        dispatch(saveExpensesAction([]));
        // }
      }
    });
    get({ url: CLIENT.getAll }).then((res) => {
      console.log("CLIENT.getAll: ", { res });
      if (Array.isArray(res)) {
        // setSuppliers(res);
        dispatch(saveClientsAction(res));
      } else {
        // alert("Error: get suppliers");
        // setSuppliers([]);
        // if (!suppliers) {
        dispatch(saveClientsAction([]));
        // }
      }
    });
  }, []);

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
              <div className="z-20">
                <SideMenu />
              </div>
              <div
                className={`bg-gray-100 ${
                  i18n.dir() === "rtl" ? "mr-20" : "ml-20"
                }`}
              >
                {isLoad && (
                  <div className="absolute top-0 w-full rounded">
                    <LinearProgress className="rounded" />
                  </div>
                )}
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
