"use client";
import store from "@/redux/store";
// import i18n from "@/langs";
import { cacheLrt, cacheRtl, lightTheme } from "@/utils/schema";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import { ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Provider as ReduxProvider } from "react-redux";
const Provider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n.dir()]);
  return (
    <CacheProvider value={i18n.dir() === "rtl" ? cacheRtl : cacheLrt}>
      <ReduxProvider store={store}>
        <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
      </ReduxProvider>
    </CacheProvider>
  );
};

export default Provider;
