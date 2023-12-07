import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "./user";
import appSettings from "./appSettings";
import suppliers from "./suppliers";
import expenses from "./expenses";
import clients from "./clients";

const rootReducers = combineReducers({
  user,
  appSettings,
  suppliers,
  expenses,
  clients,
});
export type RootState = ReturnType<typeof rootReducers>;
export type AppDispatch = typeof store.dispatch;
const store = configureStore({
  reducer: rootReducers,
});

export default store;
