import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import appSettings from "./appSettings";

const rootReducers = combineReducers({ auth, appSettings });
export type RootState = ReturnType<typeof rootReducers>;

const store = configureStore({
  reducer: rootReducers,
});
export default store;
