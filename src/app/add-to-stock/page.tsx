"use client";
import { CustomButton, CustomInput } from "@/components/common";
import { AddFarm, AddPropduct } from "@/components/popups";
import { AddExpensesCard } from "@/components/stock";
// import { PRODUCTS } from "@/data";
import { useApi } from "@/hooks";
import { RootState } from "@/redux/store";
import { saveSuppliersAction } from "@/redux/suppliers";
import { SUPPLIERS, STORE, PRODUCTS } from "@/utils/endpoints";
import { formatDate } from "@/utils/helper";
import { productProps, supplierProps } from "@/utils/types";
import { Autocomplete, FormControl } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const suppliers = useSelector((state: RootState) => state.suppliers);
  const { t } = useTranslation();
  const [products, setProducts] = useState<productProps[]>([]);
  const [id, setId] = useState<null | string>(null);
  const [values, setValues] = useState({
    farmsName: "",
    farmsID: 0,
    carNumber: "",
    date: formatDate(new Date()),
    productName: "",
    productID: 0,
    number: 0,
    quantity: 0,
    discount: 0,
    netQuantity: 0,
    price: 0,
    paied: 0,
    remaining: 0,
    farmsNotes: "",
    total: 0,
    supplyDate: "2023-12-04T00:00:00",
    created_Date: null,
  });

  const dispatch = useDispatch();
  const { get } = useApi();

  useEffect(() => {
    const searchQuiry = new URLSearchParams(window.location.search);
    const ID = searchQuiry.get("id");
    if (ID != null) {
      setId(ID);
      get({ url: SUPPLIERS.getRecord, params: { recordId: ID } }).then(
        (res) => {
          console.log("SUPPLIERS.getRecord: ", { res });

          if (res?.farmsID) {
            setValues({ ...values, ...res });
          }
        }
      );
    }
    get({ url: SUPPLIERS.getAll }).then((res) => {
      console.log("SUPPLIERS.getAll: ", { res });
      if (Array.isArray(res)) {
        // setSuppliers(res);
        dispatch(saveSuppliersAction(res));
      } else {
        alert("Error: get suppliers");
        // setSuppliers([]);
        if (!suppliers) {
          dispatch(saveSuppliersAction([]));
        }
      }
    });
    get({ url: PRODUCTS.getAll }).then((res) => {
      console.log("PRODUCTS.getAll: ", { res });
      if (Array.isArray(res)) {
        setProducts(res);
        // dispatch(saveSuppliersAction(res));
      } else {
        alert("Error: get Products");
        setProducts([]);
        if (!suppliers) {
          // dispatch(saveSuppliersAction([]));
        }
      }
    });
  }, [window.location]);

  const handleChangeValue = (e: any) => {
    const { id, value } = e.target;
    console.log({ id, value });
    setValues({ ...values, [id]: value });
  };
  const handleSelectChange = (
    name: string,
    value: null | (productProps & supplierProps)
  ) => {
    setValues({
      ...values,
      [name + "ID"]: value?.id || value?.productID || "",
      [name + "Name"]: value?.name || value?.productName || "",
    });
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
  console.log({
    suppliers,
    products,
    values,
    far: suppliers?.find((item) => item.id === values.farmsID),
  });
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
              options={suppliers || []}
              getOptionLabel={(item) => item.name}
              id="farms"
              onChange={(e, value) => {
                handleSelectChange("farms", value);
              }}
              // value={suppliers?.find((item) => item.id == values.farmsID)}
              value={{ id: values.farmsID, name: values.farmsName } as any}
              inputValue={values.farmsName || ""}
              renderInput={(params) => (
                <CustomInput
                  {...params}
                  id="farms"
                  label={t("AddToStock.name")}
                  value={
                    suppliers?.find((item) => item.id === values.farmsID)?.name
                  }
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
              options={products || []}
              getOptionLabel={(item) => item.productName}
              id="product"
              onChange={(e, value) => {
                handleSelectChange("product", value as any);
              }}
              // value={products?.find(
              //   (item) => item.productID === values.productID
              // )}
              inputValue={values.productName || ""}
              value={
                {
                  productID: values.productID,
                  productName: values.productName,
                } as any
              }
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
              id="paied"
              label={t("AddToStock.payed")}
              value={values.paied || calculatePaied}
              onChange={handleChangeValue}
              type="number"
            />
          </FormControl>

          <FormControl className="md:col-span-2 col-span-1">
            <CustomInput
              id="farmsNotes"
              label={t("AddToStock.note")}
              value={values.farmsNotes}
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

      <AddExpensesCard />
    </main>
  );
}
