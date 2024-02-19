import axios from 'axios';
import { baseURL } from "../constants";


const API_BASE_URL = 'http://localhost:3000';

export interface ActivityPost {
    _id: string;
    title: string;
    author: string;
    createdDate: Date;
    preferences: string[];
    description: string;
  }

console.log("Check");

export async function updateActivityPost(id: string, updatedPost: Partial<ActivityPost>): Promise<void> {
    try {
        await axios.put(`${baseURL}/activity-posts/${id}`, updatedPost);
    } catch (error) {
        console.error('Error updating activity post:', error);
        throw error;
    }
}
