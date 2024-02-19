import axios from 'axios';

import { baseURL } from "../constants";



console.log("Check");

export async function deleteActivityPost(id: string): Promise<void> {
    try {
      await axios.delete(`${baseURL}/posts/${id}`);
    } catch (error) {
      console.error('Error deleting activity post:', error);
      throw error;
    }
  }
