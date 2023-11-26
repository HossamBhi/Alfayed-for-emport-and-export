import { DATA } from "@/data";
import { useTranslation } from "react-i18next";
import { Farmcard } from "../cards";
import { AddFarm } from "../popups";
import { CardsContainer } from ".";

const FarmsAndFarmers = () => {
  const { t } = useTranslation();
  return (
    <CardsContainer
      title={
        <>
          {t("farmsAndFarmers")}
          <AddFarm />
        </>
      }
      items={DATA}
      Card={Farmcard}
    />
  );
};

export default FarmsAndFarmers;
