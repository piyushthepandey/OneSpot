import axios from "axios";
import { baseURL } from "../constants";
import { HousingPost, ActivityPost } from "../models/HomePage/types";


// interface UpdateSavedByUsersParams {
//   savedByUsers: string[];
// }

// // Function to save RSVP to backend storage
// export const updateRsvp = async (values: HousingPost) => {
//   try {
//     const rsvp = values.rsvps || [];
//     const updateFields = {
//       rsvps: rsvp.map((userId: string) => ({ userId })),
//       // Add other fields to update if needed
//     };

//     const response = await axios.patch(`${baseURL}/posts/${_id}/rsvp`, updateFields);

//     // Handle the response if necessary
//     console.log("RSVP updated successfully", response.data);
//   } catch (error) {
//     console.error("Error while saving RSVP", error);
//     throw error;
//   }
// };

// // Function to update savedByUsers field in backend storage
// export const updateSavedByUsers = async ({ _id, savedByUsers }: UpdateSavedByUsersParams) => {
//   try {
//     const updateFields = {
//       savedByUsers: savedByUsers.map((userId: string) => ({ userId })),
//       // Add other fields to update if needed
//     };

//     const response = await axios.patch(`${baseURL}/posts/${_id}/save`, updateFields);

//     // Handle the response if necessary
//     console.log("savedByUsers updated successfully", response.data);
//   } catch (error) {
//     console.error("Error while updating savedByUsers", error);
//     throw error;
//   }
// };

// export default { updateRsvp, updateSavedByUsers };
