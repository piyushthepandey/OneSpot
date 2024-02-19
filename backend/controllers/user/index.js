import Service from "../../services/index.js";
import { getResponse, getErrorResponse } from "../responseHandler.js";
import bcryptjs from "bcryptjs";

// This function will fetch for all the users in the database
// and we can pass additional params to filter the results
export const getUsers = async (req, res) => {
  try {
    const params = { ...req.query };
    const users = await Service.UserService.searchUsers(params);
    getResponse(users, res);
  } catch (error) {
    getErrorResponse(error, res);
  }
};

// This function will fetch for a user in the database based on the ID
export const findUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Service.UserService.findByUserId(id);
    getResponse(user, res);
  } catch (err) {
    getErrorResponse(err, res);
  }
};

export const updateExistingUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updateUser = { ...req.body };
    const user = await Service.UserService.updateUser(updateUser, id);
    getResponse(user, res);
  } catch (err) {
    getErrorResponse(err, res);
  }
};

export const removeUserFromPlatform = async (req, res) => {
  try {
    const id = req.params.id;
    await Service.UserService.removeUser(id);
    getResponse({}, res);
  } catch (err) {
    getErrorResponse(err, res);
  }
};

export const deleteUser = async (req, res) => {
  if (req.user.id !== req.params.id) {
    return getErrorResponse({ message: "Unauthorized", statusCode: 401 }, res);
  }

  try {
    const id = req.params.id;
    await Service.UserService.removeUser(id);
    // first we clear the cookie and then we send the response
    res.clearCookie("session_token");
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    getErrorResponse(err, res);
  }
};

export const updateProfile = async (req, res) => {
  if (req.user.id !== req.params.id) {
    return getErrorResponse({ message: "Unauthorized", statusCode: 401 }, res);
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const id = req.params.id;
    const userPaylaod = { ...req.body };

    const updateUser = await Service.UserService.updateUserProfle(
      userPaylaod,
      id
    );

    const { password, ...userDetails } = updateUser._doc;

    getResponse(userDetails, res);
  } catch (err) {
    getErrorResponse(err, res);
  }
};
