"use client";
// import i18n from "@/langs";
import { cacheLrt, cacheRtl, darkTheme, lightTheme } from "@/utils/schema";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import React, { ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Provider = ({ children }: { children: ReactNode }) => {
  const {i18n} = useTranslation()
  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n.dir()]);
  return (
    <CacheProvider value={i18n.dir() === "rtl" ? cacheRtl : cacheLrt}>
      <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
    </CacheProvider>
  );
};

export default Provider;
