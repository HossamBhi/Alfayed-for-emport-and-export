"use client";
import { Farmcard } from "@/components/cards";
import { CustomTable } from "@/components/common";
import { DATA } from "@/data";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  const searchQuiry = new URLSearchParams(window.location.search);

  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="m-0">
        {searchQuiry.get("id") != null && (
          <Farmcard
            item={DATA.find((item) => item.id == (searchQuiry.get("id") || 0))}
            containerStyle={"bg-white hover:bg-white mt-0"}
          />
        )}
      </div>

      <div className="grid grid-cols-1">
        <CustomTable />
      </div>
    </main>
  );
}
