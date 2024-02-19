import { baseURL } from "../constants";
import axios from "axios";

export const update_profile = async (userId: string, values: any) => {
  const response = await axios.patch(
    `${baseURL}/users/updateProfile/${userId}`,
    values,
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      withCredentials: true,
    }
  );

  return response;
};

export const delete_profile = async (userId: string) => {
  const response = await axios.delete(`${baseURL}/users/deleteUser/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
    withCredentials: true,
  });

  return response;
};

export const sign_out = async () => {
  const response = await axios.get(`${baseURL}/authentication/sign-out`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
    withCredentials: true,
  });

  return response;
};
