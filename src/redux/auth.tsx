import { createSlice } from "@reduxjs/toolkit";

const initialState: null | { name: string; token: string } = null;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserAction: (state, action) => action.payload,
  },
});

export const { setUserAction } = authSlice.actions;
export default authSlice.reducer;
