import { DATA } from "@/data";
import { useTranslation } from "react-i18next";
import { ExpensesCard } from "../cards";
import { AddExpenses } from "../popups";
import { CardsContainer } from ".";

const Expenses = () => {
  const { t } = useTranslation();
  return (
    <CardsContainer
      title={
        <>
          {t("expenses")}
          <AddExpenses />
        </>
      }
      items={DATA}
      Card={ExpensesCard}
    />
  );
};

export default Expenses;
