import { DATA } from "@/data";
import { useTranslation } from "react-i18next";
import { CardsContainer } from ".";
import { UserCard } from "../cards";
import { AddFarm } from "../popups";
import { GiFarmer } from "react-icons/gi";
import { useRouter } from "next/navigation";

const FarmsAndFarmers = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <CardsContainer
      title={t("farmsAndFarmers")}
      titleButton={<AddFarm />}
      items={DATA}
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
