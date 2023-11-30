"use client";
import { DATA } from "@/data";
import { createDataColumns } from "@/utils/helper";
import { Button, Tooltip } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridToolbar,
} from "@mui/x-data-grid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { AiFillEdit } from "react-icons/ai";
import { BsFillPlusCircleFill } from "react-icons/bs";

const CustomTable = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const handleEditRecord = (id: GridRowId) => {
    console.log({ id });
    router.push(`/add-products?id=${id}`);
  };
  console.log({ showme: createDataColumns(DATA, t) });
  //   const columns: GridColDef[] = [
  //     {
  //       field: "image",
  //       headerName: "Image",
  //       width: 150,
  //       renderCell(params) {
  //         const { value, id, row } = params;
  //         return (
  //           <Image
  //             key={id}
  //             src={value}
  //             alt={row.nameEn}
  //             width={50}
  //             height={50}
  //             className="object-contain mix-blend-color-burn"
  //           />
  //         );
  //       },
  //     },
  //     {
  //       field: "nameEn",
  //       headerName: "Name En",
  //       width: 150,
  //     },
  //     {
  //       field: "nameAr",
  //       headerName: "Name Ar",
  //       width: 150,
  //     },
  //     {
  //       field: "status",
  //       headerName: "Status",
  //       width: 150,
  //       renderCell(params) {
  //         const { value, id } = params;
  //         return (
  //           <p
  //             key={id}
  //             className={`p-2 rounded-lg text-white ${
  //               value === 1 ? "bg-red-600" : "bg-green-400"
  //             }`}
  //           >
  //             {value === 1 ? t("common.support") : t("common.nonsupport")}
  //           </p>
  //         );
  //       },
  //     },
  //     {
  //       field: "categoryEn",
  //       headerName: "Category En",
  //       width: 150,
  //     },
  //     {
  //       field: "categoryAr",
  //       headerName: "Category Ar",
  //       width: 150,
  //     },
  //     {
  //       field: "subcategoryEn",
  //       headerName: "Subcategory En",
  //       width: 150,
  //     },
  //     {
  //       field: "subcategoryAr",
  //       headerName: "Subcategory Ar",
  //       width: 150,
  //     },
  //     {
  //       field: "action",
  //       headerName: "Actions",
  //       width: 150,
  //       type: "actions",
  //       getActions: ({ id }) => {
  //         return [
  //           <Tooltip title="Edit product">
  //             <GridActionsCellItem
  //               icon={<AiFillEdit size={24} />}
  //               label="Edit"
  //               sx={{
  //                 color: "primary.main",
  //               }}
  //               onClick={() => handleEditRecord(id)}
  //             />
  //           </Tooltip>,
  //         ];
  //       },
  //     },
  //   ];

  return (
    <div className="w-full relative overflow-y-auto m-0 bg-white ">
      {/* <Button
        component="label"
        variant="contained"
        startIcon={<BsFillPlusCircleFill />}
        className="mb-4"
      >
        {t("addProduct.addProduct")}
      </Button> */}
      <div style={{ width: "100%" }} className="h-[80vh]">
        <DataGrid
          rows={DATA}
          columns={createDataColumns(DATA, t) || []}
          {...{ rowLength: 5 }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{ toolbar: { showQuickFilter: true } }}
          initialState={{
            filter: {
              filterModel: {
                items: [],
                quickFilterExcludeHiddenColumns: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default CustomTable;
