import { RootState } from "@/redux/store";
import { useTranslation } from "react-i18next";
import { FaUserTie } from "react-icons/fa";
import { useSelector } from "react-redux";
import { CardsContainer } from ".";
import { UserCard } from "../cards";
import AddClient from "../popups/AddClient";
import { useRouter } from "next/navigation";

const Clients = () => {
  const { t } = useTranslation();
  const clients = useSelector((state: RootState) => state.clients);
  const router = useRouter();

  return (
    <CardsContainer
      isLoading={clients === null}
      title={t("client.clients")}
      titleButton={<AddClient />}
      items={clients || []}
      moreLink="/clients"
      Card={({ item, ...params }) => (
        <UserCard
          item={item}
          onClick={(item) => router.push("client-details?id=" + item.id)}
          Icon={FaUserTie}
          {...params}
        />
      )}
    />
  );
};

export default Clients;
