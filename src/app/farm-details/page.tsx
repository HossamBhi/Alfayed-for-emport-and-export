"use client";
import { UserCard } from "@/components/cards";
import { CustomTable } from "@/components/common";
import { AddFarm } from "@/components/popups";
import { DATA } from "@/data";
import { createDataColumns } from "@/utils/helper";
import { LinearProgress } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { GiFarmer } from "react-icons/gi";

export default function Home() {
  const { t } = useTranslation();
  const searchQuiry = new URLSearchParams(window.location.search);
  const id = searchQuiry.get("id");
  const router = useRouter();
  const [showEdit, setShowEdit] = useState(false);
  
  if (id === null) {
    return (
      <main className="flex min-h-screen flex-col">
        <LinearProgress
          sx={{ minWidth: "100%" }}
          className="absolute top-0 rounded"
        />
      </main>
    );
  }

  const item = DATA.find((item) => item.id == (searchQuiry.get("id") || 0));
  const columns: GridColDef[] = createDataColumns(
    item?.data || [],
    (s: string) => t("AddToStock." + s)
  );
  // [
  //   {
  //     field: "nameEn",
  //     headerName: "Name En",
  //     width: 100,
  //   },
  //   {
  //     field: "nameAr",
  //     headerName: "Name Ar",
  //     width: 100,
  //   },
  //   {
  //     field: "status",
  //     headerName: "Status",
  //     width: 100,
  //     renderCell(params) {
  //       const { value, id } = params;
  //       return (
  //         <p
  //           key={id}
  //           className={`p-2 rounded-lg text-white ${
  //             value === 1 ? "bg-red-600" : "bg-green-400"
  //           }`}
  //         >
  //           {value === 1 ? t("common.support") : t("common.nonsupport")}
  //         </p>
  //       );
  //     },
  //   },
  // ];
  
  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="m-0">
        {searchQuiry.get("id") != null && (
          <UserCard
            item={item}
            containerStyle={"bg-white hover:bg-white mt-0"}
            showEdit
            onClick={(item) => router.push("farm-details?id=" + item.id)}
            Icon={GiFarmer}
            onEdit={() => setShowEdit(true)}
          />
        )}
        <AddFarm
          hideShowBtn={true}
          editData={item}
          show={showEdit}
          onClose={() => setShowEdit(false)}
        />
      </div>

      <div className="grid grid-cols-1">
        <CustomTable rows={item?.data || []} columns={columns} />
      </div>
    </main>
  );
}
