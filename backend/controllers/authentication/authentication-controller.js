import Service from "../../services/index.js";
import { getResponse, getErrorResponse } from "../responseHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// This function will create a new user in the database
export const createNewUser = async (req, res) => {
  try {
    const newUser = { ...req.body };
    // We are uisng bcrypt here to Hash the password before saving it to the database,
    newUser.password = bcryptjs.hashSync(newUser.password, 10);
    const user = await Service.UserService.addNewUser(newUser);
    getResponse(user, res, 201);
  } catch (error) {
    getErrorResponse(error, res);
  }
};

export const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // We are using the searchExistingUser method from the UserService to check if the user exists in the database
    const isValidUser = await Service.UserService.searchExistingUser(email);

    if (!isValidUser) {
      return getErrorResponse(
        { message: "User does not exist", statusCode: 404 },
        res
      );
    }

    if (!isValidUser.isUserEnabled) {
      return getErrorResponse(
        { message: "User is disabled", statusCode: 204 },
        res
      );
    }

    // We are using bcrypt here to compare the password entered by the user with the hashed password in the database
    const isValidPassword = bcryptjs.compareSync(
      password,
      isValidUser.password
    );

    // If the password is invalid we will return an error with statuscode 401
    if (!isValidPassword) {
      return getErrorResponse(
        { message: "Invalid Password", statusCode: 401 },
        res
      );
    }

    // We are using jwt here to create a token for the user
    const jwtToken = jwt.sign(
      { id: isValidUser._id, iat: Math.floor(Date.now()) },
      process.env.JWT_SECRET
    );

    // We are using destructuring here to remove the password from the user object
    const { password: userPassword, ...userDetails } = isValidUser._doc;

    res
      .cookie("session_token", jwtToken, {
        httpOnly: true,
      })
      .status(200)
      .json(userDetails);
  } catch (error) {
    getErrorResponse(error, res);
  }
};

export const signOutUser = async (req, res) => {
  try {
    // We are clearing the cookie here
    res.clearCookie("session_token");
    // We are sending a response with statuscode 200 to indicate that the user has been logged out successfully
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    getErrorResponse(error, res);
  }
};
