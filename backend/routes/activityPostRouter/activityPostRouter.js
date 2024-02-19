import { Router } from "express";
import Controller from "../../controllers/index.js";

const router = Router();

// Whenever the route has /activityPosts then the controller below will be called
// This will return a list of users
router
  .route("/fetchLatestPosts")
  .get(Controller.ActivityPostController.fetchLatestActivities);
// Function to call share / rsvp / save
router
  .route("/:postId/share")
  .patch(Controller.ActivityPostController.shareActivityPost);

router
  .route("/:postId/rsvp")
  .patch(Controller.ActivityPostController.rsvpActivityPost);
router
  .route("/:postId/save")
  .patch(Controller.ActivityPostController.saveActivityPost);

router
  .route("/")
  .get(Controller.ActivityPostController.getAllActivityPosts)
  .post(Controller.ActivityPostController.createActivityPost);


router
  .route("/:id")
  .get(Controller.ActivityPostController.getActivityPostById)
  .put(Controller.ActivityPostController.updateActivityPost)
  .delete(Controller.ActivityPostController.deleteActivityPost);

export default router;
