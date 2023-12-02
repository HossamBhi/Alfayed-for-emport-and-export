"use client";
import { ExpensesCard } from "@/components/cards";
import { CustomTable } from "@/components/common";
import { DATA } from "@/data";
import { createDataColumns } from "@/utils/helper";
import { GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  const searchQuiry = new URLSearchParams(window.location.search);
  const item = DATA.find((item) => item.id == (searchQuiry.get("id") || 0));

  const columns: GridColDef[] = createDataColumns(
    item?.data || [],
    (s: string) => t("AddToStock." + s)
  );
  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="m-0">
        {searchQuiry.get("id") != null && (
          <ExpensesCard
            item={item}
            containerStyle={"bg-white hover:bg-white mt-0"}
          />
        )}
      </div>

      <div className="grid grid-cols-1">
        <CustomTable rows={item?.data || []} columns={columns} />
      </div>
    </main>
  );
}
