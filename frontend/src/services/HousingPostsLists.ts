import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export interface HousingPost {
  _id: string;
  title: string;
  author: string;
  preferences: {
    location: string;
    rent: number;
  };
}

export async function fetchHousingPosts(): Promise<HousingPost[]> {
  try {
    const response = await axios.get<HousingPost[]>(`${API_BASE_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching housing posts:', error);
    throw error;
  }
}

export async function updateHousingPost(id: string, updatedPost: Partial<HousingPost>): Promise<void> {
  try {
    await axios.put(`${API_BASE_URL}/posts/${id}`, updatedPost);
  } catch (error) {
    console.error('Error updating housing post:', error);
    throw error;
  }
}

export async function deleteHousingPost(id: string): Promise<void> {
  try {
    await axios.delete(`${API_BASE_URL}/posts/${id}`);
  } catch (error) {
    console.error('Error deleting housing post:', error);
    throw error;
  }
}
