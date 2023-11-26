"use client";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FaPoundSign, FaUsers } from "react-icons/fa";
import { FaBoxesStacked } from "react-icons/fa6";

type StatisticCardProps = {
  price: number;
  Icon: JSX.ElementType;
  label: string;
  color: string;
};

const Statistics = () => {
  const { t } = useTranslation();
  const StatisticCard = useCallback(
    ({ price, Icon, label, color }: StatisticCardProps) => {
      return (
        <div className="rounded-lg bg-white p-4 flex justify-between items-center">
          <div className="flex flex-col w-full">
            <p className={`text-2xl font-bold text-${color}-600 pb-2`}>{price}</p>
            <p className="text-xl text-gray-600">{label}</p>
          </div>
          <div className={`bg-${color}-200 text-${color}-600 p-4 rounded-lg`}>
            <Icon size="30" />
          </div>
        </div>
      );
    },
    []
  );
  return (
    <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <StatisticCard
        price={100000}
        label={t("dashboard.total")}
        Icon={FaPoundSign}
        color="green"
      />
      <StatisticCard
        price={100}
        label={t("dashboard.clients")}
        Icon={FaUsers}
        color="blue"
      />
      <StatisticCard
        price={300}
        label={t("dashboard.products")}
        Icon={FaBoxesStacked}
        color="purple"
      />
    </div>
  );
};

export default Statistics;
