import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export interface User {
  _id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  userRole: string;
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

export async function deleteUser(userId: string): Promise<void> {
  try {
    await axios.delete(`${API_BASE_URL}/users/${userId}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}
