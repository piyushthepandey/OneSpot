import Service from "../../services/index.js";
import { getResponse, getErrorResponse } from "../responseHandler.js";

//fetch all posts with filtering
export const getHousingPosts = async (req, res) => {
  try {
    const params = { ...req.query };
    const posts = await Service.HousingPostService.searchPosts(params);
    getResponse(posts, res);
  } catch (err) {
    getErrorResponse(err, res);
  }
};


//fetch posts by id
export const getHousingPostsById = async (req, res) => {
  try {
    const id = req.params.id;
    const posts = await Service.HousingPostService.getPostsById(id);
    getResponse(posts, res);
  } catch (err) {
    getErrorResponse(err, res);
  }
};

//Add new post
export const createNewHousingPost = async (req, res) => {
  try {
    const newPost = { ...req.body };
    const post = await Service.HousingPostService.addNewPosts(newPost);
    getResponse(post, res);
  } catch (err) {
    getErrorResponse(err, res);
  }
};

//Update post
export const updateHousingPost = async (req, res) => {
  try {
    const id = req.params.id;
    const postToUpdate = { ...req.body };
    const updatePost = await Service.HousingPostService.updatePosts(
      postToUpdate,
      id
    );
    getResponse(updatePost, res);
  } catch (err) {
    getErrorResponse(err, res);
  }
};

//Delete Post
export const removeHousingPost = async (req, res) => {
  try {
    const id = req.params.id;
    await Service.HousingPostService.removePost(id);
    getResponse({}, res);
  } catch (err) {
    getErrorResponse(err, res);
  }
};

// RSVP to post
export const rsvpToPost = async (req, res) => {
  try {
    const postId = req.params.postId; // Assuming postId is in the URL params
    const userId = req.body.userId; // Assuming userId is in the request body

    const updatedPost = await Service.HousingPostService.rsvpToPost(
      postId,
      userId
    );
    getResponse(updatedPost, res);
  } catch (err) {
    getErrorResponse(err, res);
  }
};

// Save post
export const savedPost = async (req, res) => {
  try {
    const postId = req.params.postId; // Assuming postId is in the URL params
    const userId = req.body.userId; // Assuming userId is in the request body

    const updatedPost = await Service.HousingPostService.savePost(
      postId,
      userId
    );
    getResponse(updatedPost, res);
  } catch (err) {
    getErrorResponse(err, res);
  }
};

// this function will fetch all the latest activiy posts in the database
export const fetchLatestHousingPosts = async (req, res) => {
  try {
    const date = Date.now();
    const users = await Service.HousingPostService.findLatestHousing(date);
    getResponse(users, res);
  } catch (err) {
    getErrorResponse(err, res);
  }
};
