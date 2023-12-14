import { DATA } from "@/data";
import { useTranslation } from "react-i18next";
import { ExpensesCard } from "../cards";
import { AddExpenses } from "../popups";
import { CardsContainer } from ".";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useApi } from "@/hooks";
import { expenseProps } from "@/utils/types";
import { EXPENSES } from "@/utils/endpoints";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Expenses = () => {
  const { t } = useTranslation();
  // const router = useRouter();
  const expenses = useSelector((state: RootState) => state.expenses.expenses);
  // const [expense, setExpense] = useState<null | expenseProps[]>(null);
  // const { get } = useApi();

  // useEffect(() => {
  //   get({ url: EXPENSES.getAll }).then((res) => {
  //     console.log("EXPENSES.getAll: ", { res });
  //     if (Array.isArray(res)) {
  //       setExpense(res);
  //     } else {
  //       alert("Error: get Expenses");
  //       setExpense([]);
  //     }
  //   });
  // }, []);
  return (
    <CardsContainer
      isLoading={expenses === null}
      title={t("dashboard.expenses")}
      titleButton={<AddExpenses />}
      items={expenses || []}
      Card={ExpensesCard}
      moreLink="/expenses"
    />
  );
};

export default Expenses;
