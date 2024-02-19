import * as UserService from "./user/index.js";
import * as ActivityPostService from "./activityPostServices/activityPostServices.js";
import * as HousingPostService from "./housingPost/index.js";
// Why do we need the services folder?

// Services contain additional business logic that might not be directly related to our DB operations.
// They provide a way to modularize and separate logic in our application.

export default {
  UserService,
  ActivityPostService,
  HousingPostService,
};
