import express from "express";

import Controller from "../../controllers/index.js";

const router = express.Router();

// Whenever the route has /posts then the controller below will be called

//API Method for getting POST through filters

//API Method for getting all posts using GET method /posts
router.route("/").get(Controller.HousingController.getHousingPosts);

// This will return a list of users
router
  .route("/fetchLatestPosts")
  .get(Controller.HousingController.getHousingPosts);

//API Method for creating new posts POST method
router
  .route("/addNewPosts")
  .post(Controller.HousingController.createNewHousingPost);

// API Method for RSVP to a post using POST method /posts/:postId/rsvp
router.route("/:postId/rsvp").patch(Controller.HousingController.rsvpToPost);

// API Method for saving a post using POST method /posts/:postId/save
router.route("/:postId/save").patch(Controller.HousingController.savedPost);

router
  .route("/:id")
  .get(Controller.HousingController.getHousingPostsById)
  .put(Controller.HousingController.updateHousingPost)
  .delete(Controller.HousingController.removeHousingPost);

export default router;
