import axios from "axios";
import { baseURL } from "../constants";

export const fetchHousingPosts = async () => {
    try {
      const response = await axios.get(`${baseURL}/posts/fetchLatestPosts`);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch housing posts");
      }
    } catch (error) {
      console.error("Error fetching housing posts:", error);
      throw error;
    }
  };