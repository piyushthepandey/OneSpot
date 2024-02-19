import { baseURL } from "../constants";
import { SignUpModel, loginModel } from "../models/User/authentication";
import axios from "axios";

// This function is used to make a request to the backend to create a new user
export const signup_user = async (values: SignUpModel) => {
  // create a request body with the values from the form
  // such that the backend can understand it
  const requestBody = {
    userName: values.userName,
    password: values.password,
    email: values.email,
    phoneNumber: values.phoneNo,
    personalInfo: {
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: values.dateOfBirth,
      country: values.country,
      gender: values.gender,
    },
  };

  // make a request to the backend to create a new user using axios
  const response = await axios.post(
    `${baseURL}/authentication/sign-up`,
    requestBody
  );

  // return the response from the backend
  return response;
};

export const login_user = async (values: loginModel) => {
  // create a request body with the values from the form
  // such that the backend can understand it
  const requestBody = {
    email: values.email,
    password: values.password,
  };

  // make a request to the backend to create a new user using axios
  const response = await axios.post(
    `${baseURL}/authentication/sign-in`,
    requestBody,
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      withCredentials: true,
    }
  );

  // return the response from the backend
  return response;
};
