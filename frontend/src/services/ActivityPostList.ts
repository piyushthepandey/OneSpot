import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export interface ActivityPost {
  _id: string;
  title: string;
  author: string;
  createdDate: Date;
  preferences: string[];
  description: string; 
}

export async function fetchActivityPosts(): Promise<ActivityPost[]> {
  try {
    const response = await axios.get<ActivityPost[]>(`${API_BASE_URL}/activity-posts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching activity posts:', error);
    throw error;
  }
}

export async function updateActivityPost(id: string, updatedPost: Partial<ActivityPost>): Promise<void> {
  try {
    await axios.put(`${API_BASE_URL}/activity-posts/${id}`, updatedPost);
  } catch (error) {
    console.error('Error updating activity post:', error);
    throw error;
  }
}

export async function deleteActivityPost(id: string): Promise<void> {
  try {
    await axios.delete(`${API_BASE_URL}/activity-posts/${id}`);
  } catch (error) {
    console.error('Error deleting activity post:', error);
    throw error;
  }
}
