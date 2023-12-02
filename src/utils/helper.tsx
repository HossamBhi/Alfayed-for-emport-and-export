import { TFunction } from "i18next";
import { BsInboxes, BsInboxesFill } from "react-icons/bs";
import { MdAddCircle, MdAddCircleOutline } from "react-icons/md";
import { RiBankFill, RiBankLine } from "react-icons/ri";

export const SIDEMENU_LINKS = [
  {
    title: "addToStock",
    url: "/add-to-stock",
    InActiveIcon: MdAddCircleOutline,
    ActiveIcon: MdAddCircle,
  },
  {
    title: "stock",
    url: "/stock",
    InActiveIcon: BsInboxes,
    ActiveIcon: BsInboxesFill,
  },
  {
    title: "accounts",
    url: "/accounts",
    InActiveIcon: RiBankLine,
    ActiveIcon: RiBankFill,
  },
];

export const createDataColumns = (
  data: any[],
  t: (s: string) => void
): {
  field: string;
  headerName: string;
  width: number;
}[] => {
  const keys = Object?.keys(data[0]);
  const result = keys.reduce((prev: any, curr) => {
    return [
      ...prev,
      ...[
        {
          field: curr,
          headerName: t(curr + "") + "",
          width: 100,
        },
      ],
    ];
  }, []);
  return result;
};

export const formatDate = (date: Date) => {
  // "2023-11-16"
  const d = new Date(date);
  return `${d.toISOString().substring(0, 10)}`;
  // return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};
