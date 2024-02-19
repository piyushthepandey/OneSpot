import ActivityPost from "../../models/activityPostModel/activityPostModel.js";

export const createActivityPost = async (postData) => {
  const newActivityPost = new ActivityPost(postData);
  return await newActivityPost.save();
};

export const shareActivityPost = async (postId, userId) => {
  return await ActivityPost.findByIdAndUpdate(
    postId,
    { $addToSet: { shared: { userId } } },
    { new: true, upsert: true }
  ).exec();
}

export const rsvpActivityPost = async (postId, userId) => {
  return await ActivityPost.findByIdAndUpdate(
    postId,
    { $addToSet: { rsvps: { userId } } },
    { new: true, upsert: true }
  )
}

export const saveActivityPost = async (postId, userId) => {
  return await ActivityPost.findByIdAndUpdate(
    postId,
    { $addToSet: { savedBy: { userId } } },
    { new: true, upsert: true }
  )
}

export const deleteActivityPost = async (postId) => {
  return await ActivityPost.findByIdAndDelete(postId).exec();
};

// Getting all posts with an option filter preferences 
export const getAllActivityPosts = async (param = {}) => {
  const activityPreferences = {
    preferences: param.preferences,
    category: param.category,
  };

  // console.log("Activity Preferences:", activityPreferences);

  const filterConditions = [];

  if (activityPreferences.preferences !== undefined) {
    filterConditions.push({ preferences: activityPreferences.preferences });
  }

  if (activityPreferences.category !== undefined) {
    filterConditions.push({ category: activityPreferences.category });
  }

  const query =
    filterConditions.length > 1 ? { $and: filterConditions } : filterConditions[0];

  if (Object.keys(param).length === 0) {
    const allPosts = await ActivityPost.find({}).exec();
    return allPosts;
  }

  // console.log("Final Query:", JSON.stringify(query, null, 2));

  const listOfPosts = await ActivityPost.find(query).exec();
  return listOfPosts;
};

export const findByActivityPostId = async (postId) => {
  const activityPost = await ActivityPost.findById(postId).exec();
  return activityPost;
};

export const updateActivityPost = async (updatedData, postId) => {
  const UpdatedActivity = await ActivityPost.findByIdAndUpdate(
    postId,
    updatedData
  ).exec();
  return UpdatedActivity;
};


// find latest activities based on date
export const findLatestActivities = async (timestamp) => {
  const date = new Date(timestamp);
  // console.log("this is the date:", date);
  const posts = await ActivityPost.find({
    "createdDate": {
      $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      $lte: date
    }
  })
  return posts;
}