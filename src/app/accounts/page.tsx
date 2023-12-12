"use client";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  const searchQuiry = new URLSearchParams(window.location.search);

  return (
    <main className="flex min-h-screen flex-col md:p-4 p-2">
      <div className="grid grid-cols-1">{/* <CustomTable /> */}</div>
    </main>
  );
}
