"use client";
import { CustomButton, CustomInput, CustomSelect } from "@/components/common";
import { AddFarm, AddPropduct } from "@/components/popups";
import { DATA, PRODUCTS } from "@/data";
import { formatDate } from "@/utils/helper";
import {
  Autocomplete,
  FormControl,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  const searchParmas = new URLSearchParams(window.location.search);
  const [values, setValues] = useState({
    name: "",
    carNumber: "",
    date: formatDate(new Date()),
    product: "",
    number: 0,
    quantity: 0,
    discount: 0,
    netQuantity: 0,
    price: 0,
    payed: 0,
    remaining: 0,
    note: "",
    total: 0,
  });

  const handleChangeValue = (e: any) => {
    const { id, value } = e.target;
    console.log({ id, value });
    setValues({ ...values, [id]: value });
  };
  const handleSelectChange = (
    name: string,
    value: null | (typeof PRODUCTS)[0]
  ) => {
    setValues({ ...values, [name]: value?.id });
  };

  const calculateNetQuantity: number = useMemo(() => {
    const { quantity, discount } = values;
    if (discount <= 0) return Number(quantity);

    return Number((quantity * (1 - Number(discount / 100))).toFixed(2));
  }, [values.discount, values.quantity]);

  const calculatePaied = useMemo(() => {
    const { price } = values;

    return (price * (calculateNetQuantity || 1)).toFixed(2);
  }, [calculateNetQuantity]);

  const handleSubmit = () => {
    alert("Submit me");
  };

  console.log({ name: values.name });

  // TODO: make a float precentage
  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="bg-white p-4 border rounded-lg flex flex-col mb-4">
        <h4 className="mb-4 col-span-1">{t("AddToStock.addProduct")}</h4>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="md:col-span-2 col-span-1 flex flex-row justify-between gap-2 border rounded-md items-center ltr:pr-1 rtl:pl-1">
            <Autocomplete
              className="flex-1"
              clearOnEscape
              options={DATA}
              getOptionLabel={(item) => item.name}
              id="name"
              onChange={(e, value) => {
                handleSelectChange("name", value);
              }}
              renderInput={(params) => (
                <CustomInput
                  {...params}
                  id="name"
                  label={t("AddToStock.name")}
                />
              )}
            />
            <AddFarm showButtonTitle />
          </div>

          <FormControl>
            <CustomInput
              id="date"
              label={t("AddToStock.date")}
              value={values.date}
              onChange={handleChangeValue}
              type="date"
            />
          </FormControl>
          <div className="md:col-span-2 col-span-1 flex flex-row justify-between gap-2 border rounded-md items-center ltr:pr-1 rtl:pl-1">
            <Autocomplete
              className="flex-1"
              clearOnEscape
              options={PRODUCTS}
              getOptionLabel={(item) => item.name}
              id="product"
              onChange={(e, value) => {
                handleSelectChange("product", value);
              }}
              renderInput={(params) => (
                <CustomInput
                  {...params}
                  id="product"
                  label={t("AddToStock.product")}
                />
              )}
            />
            <AddPropduct />
          </div>
          <FormControl>
            <CustomInput
              type="number"
              id="carNumber"
              label={t("AddToStock.carNumber")}
              value={values.carNumber}
              onChange={handleChangeValue}
            />
          </FormControl>
          {/* <FormControl className="md:col-span-2 col-span-1">
            <CustomSelect
              items={PRODUCTS}
              name="product"
              label={t("AddToStock.product")}
              value={values.product}
              onChange={handleSelectChange}
            />
          </FormControl> */}
          <FormControl>
            <CustomInput
              id="number"
              label={t("AddToStock.number")}
              value={values.number}
              onChange={handleChangeValue}
              type="number"
            />
          </FormControl>
          <FormControl>
            <CustomInput
              id="quantity"
              label={t("AddToStock.quantity")}
              value={values.quantity}
              onChange={handleChangeValue}
              type="number"
            />
          </FormControl>
          <FormControl>
            <CustomInput
              id="discount"
              label={t("AddToStock.discount")}
              value={values.discount}
              onChange={handleChangeValue}
              type="number"
            />
          </FormControl>
          <FormControl>
            <CustomInput
              id="netQuantity"
              label={t("AddToStock.netQuantity")}
              value={calculateNetQuantity}
              onChange={handleChangeValue}
              type="number"
              disabled
            />
          </FormControl>
          <FormControl>
            <CustomInput
              id="price"
              label={t("AddToStock.price")}
              value={values.price}
              onChange={handleChangeValue}
              type="number"
            />
          </FormControl>
          <FormControl>
            <CustomInput
              id="total"
              label={t("AddToStock.total")}
              value={values.total}
              onChange={handleChangeValue}
              type="number"
              disabled
            />
          </FormControl>
          <FormControl>
            <CustomInput
              id="payed"
              label={t("AddToStock.payed")}
              value={values.payed || calculatePaied}
              onChange={handleChangeValue}
              type="number"
            />
          </FormControl>
          {/* <FormControl>
            <CustomInput
              id="remaining"
              label={t("AddToStock.remaining")}
              value={values.remaining}
              onChange={handleChangeValue}
              type="number"
            />
          </FormControl> */}

          <FormControl className="md:col-span-2 col-span-1">
            <CustomInput
              id="note"
              label={t("AddToStock.note")}
              value={values.note}
              onChange={handleChangeValue}
              type="text"
            />
          </FormControl>
          <div className="col-span-2 md:flex hidden"></div>
          <CustomButton variant="contained" onClick={handleSubmit}>
            {t("AddToStock.save")}
          </CustomButton>
        </form>
      </div>
    </main>
  );
}
