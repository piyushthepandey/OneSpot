import * as UserController from "./user/index.js";
import * as ActivityPostController from "./activityPostController/activityPostController.js";
import * as HousingController from "./HousingPost/housing-controller.js";
import * as AuthenticationController from "./authentication/authentication-controller.js";

// Why do we need controllers folder?

// Controllers handle our application's business logic, they interact with the models we have defined and helps in managing the flow of data.
// Controllers receive requests from the routes, perform operations using the models, and send responses back.

// Flow of data in our application:
// Routes -> Controllers -> Models -> Database and send response back to the user

export default {
  UserController,
  ActivityPostController,
  HousingController,
  AuthenticationController,
};
