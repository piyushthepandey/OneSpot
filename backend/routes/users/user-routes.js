import express from "express";

import Controller from "../../controllers/index.js";
import { verifyJwtToken } from "../../middleware/verifyJwtToken.js";

const router = express.Router();

// Whenever the route has /users then the controller below will be called
// This will return a list of users
router.route("/").get(Controller.UserController.getUsers);

// Since we are only allowing certain fields to be updated by the user
// we can treat this as a partial update, hece the use of patch
router.patch(
  "/updateProfile/:id",
  verifyJwtToken,
  Controller.UserController.updateProfile
);

// we are going to use this route to delete a user when they are logged in
router.delete(
  "/deleteUser/:id",
  verifyJwtToken,
  Controller.UserController.deleteUser
);

// Whenever the route has /users/:id then the controller below will be called
// these apis can be used by the admin to update or delete a user as we dont have
// any check using jwt token for these routes
router
  .route("/:id")
  .get(Controller.UserController.findUser)
  .put(Controller.UserController.updateExistingUser)
  .delete(Controller.UserController.removeUserFromPlatform);

export default router;
