import axios from "axios";

import { baseURL } from "../constants";

const api = axios.create({
  baseURL: baseURL,
});

export const filterActivityDataApi = async (filterParams: any) => {
  try {
    const response = await api.get("/activity-posts", {
      params: filterParams,
    });
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching housing data:", error);
    throw error;
  }
};
