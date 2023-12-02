import { DATA } from "@/data";
import { useTranslation } from "react-i18next";
import { ClientCard, UserCard } from "../cards";
import AddClient from "../popups/AddClient";
import { CardsContainer } from ".";
import { useRouter } from "next/navigation";
import { FaUserTie } from "react-icons/fa";

const Clients = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <CardsContainer
      title={t("clients")}
      titleButton={<AddClient />}
      items={DATA}
      Card={({ item, ...params }) => (
        <UserCard
          item={item}
          onClick={() => alert("Comming Soon.")}
          // onClick={(item) => router.push("farm-details?id=" + item.id)}
          Icon={FaUserTie}
          {...params}
        />
      )}
    />
  );
};

export default Clients;
