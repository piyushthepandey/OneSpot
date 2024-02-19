import axios from 'axios';
import { ActivityPost } from '../models/HomePage/types';
import { baseURL } from "../constants";
import { Category } from '@mui/icons-material';

export const addNewActivityPost = async (values: ActivityPost) => {
    console.log('values',values);
    const images = values.activityPostImages || [];
  // Create a JSON-serializable version of values
    const serializedPost = {
    title: values.title,
    description: values.description,
    author: values.author,
    category: values.category,
    activityPostImages: images.map((image: { data: any; fileName: any; fileType: any; }) => ({
      data: image.data,
      fileName: image.fileName,
      fileType: image.fileType,
    })),
    createdDate: values.createdDate,
    updateDate: values.updateDate,
  };

  console.log('setting serializedPost', serializedPost);

  const response = await axios.post(
    `${baseURL}/activity-posts`,
    serializedPost,
    {
        headers: {
          'Content-Type': 'application/json',
        },
    }
  );

   return response;
};
