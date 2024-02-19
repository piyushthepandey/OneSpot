import axios from "axios";
import { ActivityPostData } from "../models/Activity/activity";
import { baseURL } from "../constants";

export const fetchData = async <T>(url: string): Promise<T | null> => {
  try {
    const response = await axios.get<T>(url);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Response status: " + response.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const fetchActivityDataApi = async () => {
  return await fetchData<ActivityPostData[]>(`${baseURL}/activity-posts`);
};
