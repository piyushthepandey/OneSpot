import axios from 'axios';

import { baseURL } from '../constants';

export const fetchActivityData = async (id: string) => {
  try {
    const response = await axios.get(`${baseURL}/activity-posts/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch housing data");
    }
  } catch (error) {
    console.error("Error fetching housing data:", error);
    throw error;
  }
};
