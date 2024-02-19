import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export interface ActivityPost {
  _id: string;
  // Add other properties as needed
}

export interface User {
  _id: string;
  // Add other properties as needed
}

export interface HousingPost {
  _id: string;
  // Add other properties as needed
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

export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await axios.get<User[]>(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
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
