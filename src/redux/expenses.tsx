import { expenseProps } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

let initialState: expenseProps[] = [];
// let initialState: any | supplierProps[] = null;

const expenses = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    saveExpensesAction: (state, { payload }) => payload,
    addExpenseAction: (state, { payload }) => {
      if (state === null) {
        return state;
      }
      if (Array.isArray(state)) {
        state?.push(payload);
      }
    },
    editExpenseAction: (state, { payload }) => {
      if (state === null) {
        return state;
      }
      const findIndex = state?.findIndex(
        (item: expenseProps) => item.id == payload.id
      );
      state[findIndex] = payload;
    },
  },
});

export const { saveExpensesAction, addExpenseAction, editExpenseAction } =
  expenses.actions;

export default expenses.reducer;
