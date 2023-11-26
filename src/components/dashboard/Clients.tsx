import { DATA } from "@/data";
import { useTranslation } from "react-i18next";
import { ClientCard } from "../cards";
import AddClient from "../popups/AddClient";
import { CardsContainer } from ".";

const Clients = () => {
  const { t } = useTranslation();
  return (
    <CardsContainer
      title={
        <>
          {t("clients")}
          <AddClient />
        </>
      }
      items={DATA}
      Card={ClientCard}
    />
  );
};

export default Clients;
