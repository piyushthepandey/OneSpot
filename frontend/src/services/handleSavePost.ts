import axios from "axios";
import { HousingPost } from "../models/HomePage/types";
import { baseURL } from "../constants";

export const addNewPost = async (values: HousingPost) => {
  const images = values.housingPostImages || [];
  // Create a JSON-serializable version of values
  const serializedPost = {
    title: values.title,
    description: values.description,
    preferences: { ...values.preferences },
    benefits: { ...values.benefits },
    author: values.author,
    housingPostImages: images.map(
      (image: { data: any; fileName: any; fileType: any }) => ({
        data: image.data,
        fileName: image.fileName,
        fileType: image.fileType,
      })
    ),
    createdDate: values.createdDate,
    updateDate: values.updateDate,
  };

  console.log("setting serializedPost", serializedPost);

  const response = await axios.post(
    `${baseURL}/posts/addNewPosts`,
    serializedPost,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};
