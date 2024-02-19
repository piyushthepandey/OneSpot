import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { UserLoggedInModel } from "../../models/User/authentication";

export interface userInternface {
  loggedInUser: UserLoggedInModel | null;
}

export const userInitialState: userInternface = {
  loggedInUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserLoggedInModel | null>) => {
      state.loggedInUser = action.payload;
    },
    removeUserData: (state) => {
      state.loggedInUser = null;
    },
  },
});

export const { setUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;
