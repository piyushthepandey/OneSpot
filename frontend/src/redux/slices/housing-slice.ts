import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";

const initialState = {};
export const housingSlice = createSlice({
  name: "housing",
  initialState: initialState,
  reducers: {
    loadHousingPosts: (state, action: PayloadAction) => {
      return "Testing";
    },
  },
});
export const { loadHousingPosts } = housingSlice.actions;

export const searchHousingPosts = (
  query: string
): ((state: AppState) => any) => {
  return (state: AppState) => state.housing;
};

export default housingSlice.reducer;
