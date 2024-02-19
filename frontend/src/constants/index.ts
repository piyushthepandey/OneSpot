// We should have all the static text messages that we might be using
// on the frontend in this file. This will help us to maintain all texts at one place
export const constantMessages = {
  welcome_to_one_spot: "Welcome to OneSpot",
  one_spot: "OneSpot",
};

export const APP_ROUTE_PATHS = {
  HOME: "/",
  ABOUT: "/about",
  HOUSING_POSTS: "/housing-posts",
  ACTIVITIES: "/activities",
  PROFILE: "/profile",
  SIGN_UP: "/signup",
  LOGOUT: "/logout",
  LOGIN: "/login",
  LANDING: "/landing",
  HOUSING_POST: "/housing-post/:id",
  ACTIVITY_POST: "/activity-post/:id",
  CREATE_HOUSING_LISTING: "/create-housing-listing",
  CREATE_ACTIVITY_LISTING: "/create-activity-listing",
  CONTACT_US: "/contact-us",
  FAQS: "/faqs",
  PRIVACY_POLICY: "/privacy-policy",
  TERMS_AND_CONDITIONS: "/terms-and-conditions",
  ADMIN: "/admin",
  USERSLISTS: "/usersLists",
  ACTIVITYLISTS: "/activityPostsLists",
  HOUSINGLISTS: "/housingPostLists",
};

export const pageRoutes = [
  {
    path: APP_ROUTE_PATHS.HOME,
    name: "Home",
  },
  {
    path: APP_ROUTE_PATHS.ABOUT,
    name: "About",
  },
];

export const protectedPageRoutes = [
  {
    path: APP_ROUTE_PATHS.HOME,
    name: "Home",
  },
  {
    path: APP_ROUTE_PATHS.ABOUT,
    name: "About",
  },
  {
    path: APP_ROUTE_PATHS.HOUSING_POSTS,
    name: "Housing",
  },
  {
    path: APP_ROUTE_PATHS.ACTIVITIES,
    name: "Activities",
  },
];

export const userRoutes = [
  {
    path: APP_ROUTE_PATHS.PROFILE,
    name: "Profile",
  },
];

export const baseURL = "http://localhost:3000";

export const genderOptions = ["Male", "Female", "Others"];

export const countries = ["USA", "India"];
