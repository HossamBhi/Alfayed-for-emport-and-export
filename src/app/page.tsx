"use client";
import {
  Clients,
  Expenses,
  FarmsAndFarmers,
  Statistics,
} from "@/components/dashboard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Statistics />

      <div className="md:p-4 p-2 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <FarmsAndFarmers />
        <Expenses />
        <Clients />
      </div>
    </main>
  );
}
