import axios from "axios";
import { baseURL } from "../constants";

export const fetchActivityPosts = async () => {
    try {
      const response = await axios.get(`${baseURL}/activity-posts/fetchLatestPosts`);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch activity posts");
      }
    } catch (error) {
      console.error("Error fetching activity posts:", error);
      throw error;
    }
  };