import { DATA } from "@/data";
import { useTranslation } from "react-i18next";
import { ClientCard, UserCard } from "../cards";
import AddClient from "../popups/AddClient";
import { CardsContainer } from ".";
import { useRouter } from "next/navigation";
import { FaUserTie } from "react-icons/fa";
import { useApi } from "@/hooks";
import { useEffect, useState } from "react";
import { clientProps } from "@/utils/types";
import { CLIENT } from "@/utils/endpoints";

const Clients = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [clients, setClients] = useState<null | clientProps[]>(null);
  const { get } = useApi();

  useEffect(() => {
    get({ url: CLIENT.getAll }).then((res) => {
      console.log("CLIENT.getAll", { res });
      if (Array.isArray(res)) {
        setClients(res);
      } else {
        alert("Error: get Clints");
        setClients([]);
      }
    });
  }, []);

  return (
    <CardsContainer
      isLoading={clients === null}
      title={t("client.clients")}
      titleButton={<AddClient />}
      items={clients || []}
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
