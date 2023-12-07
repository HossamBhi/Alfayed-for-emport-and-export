"use client";
import { CustomButton, CustomInput } from "@/components/common";
import { AddExpenses } from "@/components/popups";
// import { PRODUCTS } from "@/data";
import { useApi } from "@/hooks";
import { RootState } from "@/redux/store";
import { SUPPLIERS } from "@/utils/endpoints";
import { productProps, supplierProps } from "@/utils/types";
import {
  Autocomplete,
  Box,
  Collapse,
  FormControl,
  List,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { TransitionGroup } from "react-transition-group";

const AddExpensesCard = () => {
  const expenses = useSelector((state: RootState) => state.expenses);
  const { t } = useTranslation();
  const [id, setId] = useState<null | string>(null);
  const [fruitsInBasket, setFruitsInBasket] = useState([0]);
  const dispatch = useDispatch();
  const { get } = useApi();
  const {
    palette: { primary },
  } = useTheme();
  const handleAddFruit = () => {
    setFruitsInBasket((prev) => [prev[0] + 1, ...prev]);
  };
  const [values, setValues] = useState({
    farmRecordID: 0,
    expenseID: 0,
    expenseName: "",
    expenseDate: "2023-12-07T17:22:31.679Z",
    created_Date: "2023-12-07T17:22:31.679Z",
    quantity: 0,
    value: 0,
    price: 0,
    additionalPrice: 0,
    additionalNotes: "",
    total: 0,
    paied: 0,
    remaining: 0,
    expenseRecordNotes: "",
  });

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

  const handleSubmit = () => {
    alert("Submit me");
  };
  return (
    <div>
      <h4
        className={`mb-4 col-span-1 flex justify-between items-center border rounded-lg px-4 py-2 bg-[#26693780]`}
      >
        {t("AddToStock.expenses")}
        <CustomButton
          variant="outlined"
          onClick={handleAddFruit}
          color="secondary"
        >
          {t("AddToStock.addExpenseOnProduct")}
        </CustomButton>
      </h4>

      <List sx={{ mt: 1 }}>
        <TransitionGroup>
          {fruitsInBasket.map((item) => (
            <Collapse key={item}>
              <div className="relative p-4 bg-white px-4 border rounded-lg flex flex-col mb-4">
                <Box
                  className="absolute px-2 top-[-10px] right-[-10px] rounded-full p-1 z-10 cursor-pointer"
                  sx={{
                    backgroundColor: primary.main,
                    borderWidth: 2,
                    borderColor: "#fff",
                    fontSize: 12,
                    color: "#fff",
                  }}
                >
                  {item + 1}
                </Box>
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <div className="md:col-span-3 col-span-1 flex flex-row justify-between gap-2 border rounded-md items-center ltr:pr-1 rtl:pl-1">
                    <Autocomplete
                      className="flex-1"
                      clearOnEscape
                      options={expenses || []}
                      getOptionLabel={(item) => item.name}
                      id="expense"
                      onChange={(e, value) => {
                        handleSelectChange("expense", value);
                      }}
                      // value={suppliers?.find((item) => item.id == values.farmsID)}
                      value={
                        {
                          id: values.expenseID,
                          name: values.expenseName,
                        } as any
                      }
                      inputValue={values.expenseName || ""}
                      renderInput={(params) => (
                        <CustomInput
                          {...params}
                          id="expense"
                          label={t("expenses.expensesName")}
                        />
                      )}
                    />
                    <AddExpenses showButtonTitle />
                  </div>
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
                      id="value"
                      label={t("AddToStock.value")}
                      value={values.value}
                      onChange={handleChangeValue}
                      type="number"
                    />
                  </FormControl>
                  <FormControl>
                    <CustomInput
                      id="price"
                      label={t("AddToStock.subTotal")}
                      value={values.price}
                      onChange={handleChangeValue}
                      type="number"
                      disabled
                    />
                  </FormControl>
                  <FormControl>
                    <CustomInput
                      id="additionalPrice"
                      label={t("AddToStock.additionalPrice")}
                      value={values.additionalPrice}
                      onChange={handleChangeValue}
                      type="number"
                    />
                  </FormControl>
                  <FormControl className="md:col-span-2 col-span-1">
                    <CustomInput
                      id="additionalNotes"
                      label={t("AddToStock.additionalNotes")}
                      value={values.additionalNotes}
                      onChange={handleChangeValue}
                      type="text"
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
                      value={values.paied}
                      // value={values.paied || calculatePaied}
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
                  <FormControl>
                    <CustomInput
                      id="expenseDate"
                      label={t("AddToStock.expenseDate")}
                      value={values.expenseDate}
                      onChange={handleChangeValue}
                      type="date"
                    />
                  </FormControl>
                  <FormControl className="md:col-span-2 col-span-1">
                    <CustomInput
                      id="expenseRecordNotes"
                      label={t("AddToStock.note")}
                      value={values.expenseRecordNotes}
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
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </div>
  );
};

export default AddExpensesCard;
