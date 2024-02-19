import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// We are wrapping our App component with the Provider component, that way
// the App component and all of its children will have access to the store
root.render(
  <Suspense fallback={<CircularProgress color="inherit" />}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </Suspense>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
