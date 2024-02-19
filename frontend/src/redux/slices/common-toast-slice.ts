import { createSlice } from "@reduxjs/toolkit";

export const commonToastSlice = createSlice({
  name: "toastMessage",
  initialState: {
    open: false,
    vertical: "top",
    horizontal: "right",
    message: "",
    severity: "",
  },
  reducers: {
    openToast: (state, action) => {
      return { ...state, ...action.payload, open: true };
    },
    closeToast: (state) => {
      return { ...state, open: false, message: "", severity: "" };
    },
  },
});

export const { openToast, closeToast } = commonToastSlice.actions;

export default commonToastSlice.reducer;
