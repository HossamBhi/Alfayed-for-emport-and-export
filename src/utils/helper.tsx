import {
    AiFillPlusCircle,
    AiFillShop,
    AiOutlinePlusCircle,
    AiOutlinePullRequest,
    AiOutlineShop,
  } from "react-icons/ai";
  import { BsDatabaseAdd, BsDatabaseFillAdd } from "react-icons/bs";
  import { HiOutlineShoppingBag } from "react-icons/hi";
  import { MdDashboard } from "react-icons/md";
  import { RiSettings3Fill, RiSettings3Line } from "react-icons/ri";
  import { RxDashboard } from "react-icons/rx";
  
  export const SIDEMENU_LINKS = [
    {
      title: "Dashboard",
      url: "/",
      InActiveIcon: RxDashboard,
      ActiveIcon: MdDashboard,
    },
    // {
    //   title: "Add Products",
    //   url: "/add-products",
    //   InActiveIcon: AiOutlinePlusCircle,
    //   ActiveIcon: AiFillPlusCircle,
    // },
    // {
    //   title: "Products",
    //   url: "/products",
    //   InActiveIcon: AiOutlineShop,
    //   ActiveIcon: AiFillShop,
    // },
    // {
    //   title: "Requested Products",
    //   url: "/requested-products",
    //   InActiveIcon: BsDatabaseAdd,
    //   ActiveIcon: BsDatabaseFillAdd,
    // },
    // {
    //   title: "Settings",
    //   url: "/settings",
    //   InActiveIcon: RiSettings3Line,
    //   ActiveIcon: RiSettings3Fill,
    // },
  ];
  