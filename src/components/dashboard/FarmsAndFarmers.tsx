import { useApi } from "@/hooks";
import { RootState } from "@/redux/store";
import { saveSuppliersAction } from "@/redux/suppliers";
import { SUPPLIERS } from "@/utils/endpoints";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { GiFarmer } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { CardsContainer } from ".";
import { UserCard } from "../cards";
import { AddFarm } from "../popups";

const FarmsAndFarmers = () => {
  const { t } = useTranslation();
  const suppliers = useSelector((state: RootState) => state.suppliers);
  const router = useRouter();
  // const dispatch = useDispatch();
  // const { get } = useApi();

  // useEffect(() => {
  //   get({ url: SUPPLIERS.getAll }).then((res) => {
  //     console.log("SUPPLIERS.getAll: ", { res });
  //     if (Array.isArray(res)) {
  //       // setSuppliers(res);
  //       dispatch(saveSuppliersAction(res));
  //     } else {
  //       alert("Error: get suppliers");
  //       // setSuppliers([]);
  //       if (!suppliers) {
  //         dispatch(saveSuppliersAction([]));
  //       }
  //     }
  //   });
  // }, []);

  return (
    <CardsContainer
      isLoading={suppliers === null}
      title={t("farmsAndFarmers")}
      titleButton={<AddFarm />}
      items={suppliers || []}
      Card={({ item, ...params }) => (
        <UserCard
          item={item}
          onClick={(item) => router.push("farm-details?id=" + item.id)}
          Icon={GiFarmer}
          {...params}
        />
      )}
    />
  );
};

export default FarmsAndFarmers;
