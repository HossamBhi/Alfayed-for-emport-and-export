"use client";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="grid grid-cols-1">{/* <CustomTable /> */}</div>
    </main>
  );
}
