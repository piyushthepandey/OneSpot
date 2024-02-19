import Service from "../../services/index.js";
import { getResponse, getErrorResponse } from "../responseHandler.js";

export const createActivityPost = async (req, res) => {
  try {
    const postData = { ...req.body };
    const newActivityPost =
      await Service.ActivityPostService.createActivityPost(postData);
    getResponse(newActivityPost, res, 201);
  } catch (error) {
    getErrorResponse(error, res);
  }
};

export const shareActivityPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.body.userId;

    const updatedPost = await Service.ActivityPostService.shareActivityPost(
      postId,
      userId
    );
    getResponse(updatedPost, res);
  } catch (error) {
    getErrorResponse(error, res);
  }
};

export const rsvpActivityPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.body.userId;

    const updatedPost = await Service.ActivityPostService.rsvpActivityPost(
      postId,
      userId
    );
    getResponse(updatedPost, res);
  } catch (error) {
    getErrorResponse(error, res);
  }
};

export const saveActivityPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.body.userId;

    const updatedPost = await Service.ActivityPostService.saveActivityPost(
      postId,
      userId
    );
    getResponse(updatedPost, res);
  } catch (error) {
    getErrorResponse(error, res);
  }
};

export const updateActivityPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedData = { ...req.body };
    const updatedPost = await Service.ActivityPostService.updateActivityPost(
      updatedData,
      postId
    );
    getResponse(updatedPost, res);
  } catch (error) {
    getErrorResponse(error, res);
  }
};

export const deleteActivityPost = async (req, res) => {
  try {
    const postId = req.params.id;
    await Service.ActivityPostService.deleteActivityPost(postId);
    getResponse({}, res);
  } catch (error) {
    getErrorResponse(error, res);
  }
};

export const getAllActivityPosts = async (req, res) => {
  try {
    const params = { ...req.query };
    const activityPosts = await Service.ActivityPostService.getAllActivityPosts(
      params
    );
    getResponse(activityPosts, res);
  } catch (error) {
    getErrorResponse(error, res);
  }
};

export const getActivityPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Service.ActivityPostService.findByActivityPostId(id);
    getResponse(user, res);
  } catch (err) {
    getErrorResponse(err, res);
  }
};

// this function will fetch all the latest activiy posts in the database

export const fetchLatestActivities = async (req, res) => {
  try {
    const date = Date.now();
    const users = await Service.ActivityPostService.findLatestActivities(date);
    getResponse(users, res);
  } catch (err) {
    getErrorResponse(err, res);
  }
};
