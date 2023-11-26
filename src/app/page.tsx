"use client";
import {
  Clients,
  Expenses,
  FarmsAndFarmers,
  Statistics,
} from "@/components/dashboard";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <main className="flex min-h-screen flex-col ">
      <Statistics />
      
      <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <FarmsAndFarmers />
        <Expenses />
        <Clients />
      </div>
    </main>
  );
}
