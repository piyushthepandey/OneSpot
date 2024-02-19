import axios from 'axios';

import { baseURL } from "../constants";

export interface HousingPost {
    _id: string;
    title: string;
    author: string;
    description: string;
    preferences: {
        location: string;
        rent: number;
    };
}

console.log("Check");

export async function updateHousingPost(id: string, updatedPost: Partial<HousingPost>): Promise<void> {
    try {
        await axios.put(`${baseURL}/posts/${id}`, updatedPost);
    } catch (error) {
        console.error('Error updating activity post:', error);
        throw error;
    }
}
