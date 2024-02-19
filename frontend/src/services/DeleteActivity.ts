import axios from 'axios';

import { baseURL } from "../constants";

export async function deleteActivityPost(id: string): Promise<void> {
    try {
      await axios.delete(`${baseURL}/activity-posts/${id}`);
    } catch (error) {
      console.error('Error deleting activity post:', error);
      throw error;
    }
  }
