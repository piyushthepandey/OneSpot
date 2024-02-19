import userRouter from "./users/user-routes.js";
import activityPostRouter from "./activityPostRouter/activityPostRouter.js";
import postRouter from "./HousingPost/housing-routes.js";
import authenticationRouter from "./authentication/authentication-routes.js";

// Why do we need routes folder?
// Routes define the endpoints of our APIs and specify which controller function should be executed when a client hits an endpoint.

export default (app) => {
  // For all API calls to /users, userRouter will be used to handle the request
  app.use("/authentication", authenticationRouter);
  app.use("/users", userRouter);
  app.use("/activity-posts", activityPostRouter);
  // For all API calls to /posts, postRouter will be used to handle the request
  app.use("/posts", postRouter);
};
