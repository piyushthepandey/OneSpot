import express from "express";
import Controller from "../../controllers/index.js";

const router = express.Router();

// I have added a new route here under /authentication/sing-up for adding new users
router
  .route("/sign-up")
  .post(Controller.AuthenticationController.createNewUser);

router.route("/sign-in").post(Controller.AuthenticationController.signInUser);

router.route("/sign-out").get(Controller.AuthenticationController.signOutUser);

export default router;
