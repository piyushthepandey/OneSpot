// This will be the redux store for the frontend

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import housingReducer from "./slices/housing-slice";
import userReducer from "./slices/user-slice";
import toastReducer from "./slices/common-toast-slice";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  toastMessage: toastReducer,
  housing: housingReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    // We are disabling the serializableCheck middleware
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
