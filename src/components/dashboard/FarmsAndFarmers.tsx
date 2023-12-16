import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { GiFarmer } from "react-icons/gi";
import { useSelector } from "react-redux";
import { CardsContainer } from ".";
import { UserCard } from "../cards";
import { AddFarm } from "../popups";

const FarmsAndFarmers = () => {
  const { t } = useTranslation();
  const suppliers = useSelector((state: RootState) => state.suppliers);
  const router = useRouter();

  return (
    <CardsContainer
      isLoading={suppliers === null}
      title={t("farmsAndFarmers")}
      titleButton={<AddFarm />}
      items={suppliers || []}
      moreLink="/suppliers"
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
