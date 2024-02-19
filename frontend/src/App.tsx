import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import About from "./pages/About/index";
import HousingPostsPage from "./pages/HousingPosts/index";
import ActivitiesPage from "./pages/Activities/index";
import LoginPage from "./pages/Login/index";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import NotFound from "./pages/NotFound";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import SignUp from "./pages/SignUp";
import { APP_ROUTE_PATHS } from "./constants";
import HousingListingPage from "./pages/HousingListingPage";
import ActivityListingPage from "./pages/ActivityListingPage";
import CreateHousingListing from "./pages/CreateHousingListing";
import CreateActivityListing from "./pages/CreateActivityListing";
import ContactUs from "./pages/ContactUs";
import Faqs from "./pages/Faqs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivateRouteHandler from "./components/common/PrivateRouteHandler";
import PrivateRouteHandlerForAdmin from "./components/common/PrivateRouteHandlerForAdmin";
import PositionedSnackbar from "./components/common/ToastMessage";
import AdminPage from "./pages/Admin/index";
import UserList from "./pages/UsersList/index";
import ActivtiyListPage from "./pages/ActivityPostsLists/index";
import HousingListPage from "./pages/HousingPostsLists/index";
import ErrorComponent from "./components/common/ErrorComponent";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <div className="App">
      <ErrorBoundary fallback={<ErrorComponent />}>
        {/* Header component will be rendered for all the pages */}
        <Header />
        <ErrorBoundary fallback={<ErrorComponent />}>
          <PositionedSnackbar />
          <div className="content">
            <Routes>
              {/* When the path is "/about" we will route user to About Us Page */}
              <Route path={APP_ROUTE_PATHS.ABOUT} element={<About />} />

              <Route element={<PrivateRouteHandler />}>
                {/* <Route> */}
                {/* When the path is "/" we will route user to Home Page */}
                <Route path={APP_ROUTE_PATHS.HOME} element={<HomePage />} />
                {/* When the path is "/housing-posts" we will route user to Housing Posts Page */}
                <Route
                  path={APP_ROUTE_PATHS.HOUSING_POSTS}
                  element={<HousingPostsPage />}
                />
                {/* When the path is "/admin" we will route user to admin page */}

                {/* When the path is "/activties" we will route user to Activities Page */}
                <Route
                  path={APP_ROUTE_PATHS.ACTIVITIES}
                  element={<ActivitiesPage />}
                />

                <Route
                  path={APP_ROUTE_PATHS.HOUSING_POST}
                  element={<HousingListingPage />}
                />

                <Route
                  path={APP_ROUTE_PATHS.ACTIVITY_POST}
                  element={<ActivityListingPage />}
                />
                <Route
                  path={APP_ROUTE_PATHS.CREATE_HOUSING_LISTING}
                  element={<CreateHousingListing />}
                />
                <Route
                  path={APP_ROUTE_PATHS.CREATE_ACTIVITY_LISTING}
                  element={<CreateActivityListing />}
                />

                {/* When the path is "/profile" we will route user to User Page */}
                <Route path={APP_ROUTE_PATHS.PROFILE} element={<UserPage />} />
              </Route>

              <Route element={<PrivateRouteHandlerForAdmin />}>
                <Route path={APP_ROUTE_PATHS.ADMIN} element={<AdminPage />} />
                {/* When the path is "/usersLists" we will route user to userLists page */}
                <Route
                  path={APP_ROUTE_PATHS.USERSLISTS}
                  element={<UserList />}
                />
                {/* When the path is "/activityPostsLists" we will route user to activityLists page */}
                <Route
                  path={APP_ROUTE_PATHS.ACTIVITYLISTS}
                  element={<ActivtiyListPage />}
                />
                {/* When the path is "/housingPostLists" we will route user to housingLists page */}

                <Route
                  path={APP_ROUTE_PATHS.HOUSINGLISTS}
                  element={<HousingListPage />}
                />
              </Route>

              {/* When the path is "/landing" we will route user to Landing Page */}
              <Route
                index
                path={APP_ROUTE_PATHS.LANDING}
                element={<LandingPage />}
              />

              <Route path={APP_ROUTE_PATHS.LOGIN} element={<LoginPage />} />

              <Route path={APP_ROUTE_PATHS.LOGOUT} element={<LoginPage />} />

              <Route path={APP_ROUTE_PATHS.SIGN_UP} element={<SignUp />} />

              <Route
                path={APP_ROUTE_PATHS.CONTACT_US}
                element={<ContactUs />}
              />

              <Route path={APP_ROUTE_PATHS.FAQS} element={<Faqs />} />

              <Route
                path={APP_ROUTE_PATHS.PRIVACY_POLICY}
                element={<PrivacyPolicy />}
              />

              <Route
                path={APP_ROUTE_PATHS.TERMS_AND_CONDITIONS}
                element={<TermsAndConditions />}
              />

              {/*  When the path is not any of the above we will route user to NotFound Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </div>
  );
}

export default App;
