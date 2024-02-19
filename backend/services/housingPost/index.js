import Housing from "../../models/HousingPost/index.js";

export const searchPosts = async (param = {}) => {
  const preferences = {
    gender: param.gender,
    location: param.location,
    rent: param.rent,
    moveInDate: param.moveInDate,
    isOnLease: param.isOnLease,
    noOfBeds: param.noOfBeds,
    noOfBaths: param.noOfBaths,
    noOfTenants: param.noOfTenants,
    smoking: param.smoking,
    alcohol: param.alcohol,
    veg: param.veg,
    nonVeg: param.nonVeg,
  };

  const benefits = {
    freeLaundryInUnit: param.freeLaundryInUnit,
    heatingInUnit: param.heatingInUnit,
    gymInBuilding: param.gymInBuilding,
  };

  // console.log("Preferences:", preferences);
  // console.log("Benefits:", benefits);

  // Construct a list of filter conditions
  const filterConditions = [];

  // Add preferences to the filter conditions
  if (preferences.gender !== undefined) {
    filterConditions.push({ "preferences.gender": preferences.gender });
  }
  if (preferences.location !== undefined) {
    filterConditions.push({ "preferences.location": preferences.location });
  }
  if (preferences.rent !== undefined) {
    filterConditions.push({ "preferences.rent": preferences.rent });
  }
  if (preferences.moveInDate !== undefined) {
    filterConditions.push({ "preferences.moveInDate": preferences.moveInDate });
  }
  if (preferences.isOnLease !== undefined) {
    filterConditions.push({ "preferences.isOnLease": preferences.isOnLease });
  }
  if (preferences.noOfBeds !== undefined) {
    filterConditions.push({ "preferences.noOfBeds": preferences.noOfBeds });
  }
  if (preferences.noOfBaths !== undefined) {
    filterConditions.push({ "preferences.noOfBaths": preferences.noOfBaths });
  }
  if (preferences.noOfTenants !== undefined) {
    filterConditions.push({ "preferences.noOfTenants": preferences.noOfTenants });
  }
  if (preferences.smoking !== undefined) {
    filterConditions.push({ "preferences.smoking": preferences.smoking });
  }
  if (preferences.alcohol !== undefined) {
    filterConditions.push({ "preferences.alcohol": preferences.alcohol });
  }
  if (preferences.veg !== undefined) {
    filterConditions.push({ "preferences.veg": preferences.veg });
  }
  if (preferences.nonVeg !== undefined) {
    filterConditions.push({ "preferences.nonVeg": preferences.nonVeg });
  }
  

  if (benefits.freeLaundryInUnit !== undefined) {
    filterConditions.push({ "benefits.freeLaundryInUnit": benefits.freeLaundryInUnit });
  }
  if (benefits.heatingInUnit !== undefined) {
    filterConditions.push({ "benefits.heatingInUnit": benefits.heatingInUnit });
  }
  if (benefits.gymInBuilding !== undefined) {
    filterConditions.push({ "benefits.gymInBuilding": benefits.gymInBuilding });
  }

  const query =
    filterConditions.length > 1 ? { $and: filterConditions } : filterConditions[0];

  if (Object.keys(param).length === 0) {
    const allPosts = await Housing.find({}).exec();
    return allPosts;
  }

  // console.log("Final Query:", JSON.stringify(query, null, 2));

  const listOfPosts = await Housing.find(query).exec();
  return listOfPosts;
};




//fetches posts by id from the database
export const getPostsById = async (id) => {
  const findPosts = await Housing.findById(id).exec();
  return findPosts;
};

//add new posts
export const addNewPosts = async (newPosts) => {
  const PostsNew = new Housing(newPosts);
  return await PostsNew.save();
};

//Update posts
export const updatePosts = async (updatePosts, id) => {
  const Posts = await Housing.findByIdAndUpdate(id, updatePosts).exec();
  return Posts;
};

//Delete posts
export const removePost = async (id) => {
  return await Housing.findByIdAndDelete(id).exec();
};

//TODO: Review the below functions - should we use findByIdAndUpdate for both rsvp and save? Currently I'm assuming rsvp has PUT method and Save has POST.

// RSVP, SAVE to Post
// rsvpToPost function
export const rsvpToPost = async (postId, userId) => {
  return await Housing.findByIdAndUpdate(
    postId,
    { $addToSet: { rsvps: { userId } } },
    { new: true, upsert: true } // Add upsert option to create the document if not present
  ).exec();
};

// savePost function
export const savePost = async (postId, userId) => {
  return await Housing.findByIdAndUpdate(
    postId,
    { $addToSet: { savedByUsers: { userId } } },
    { new: true, upsert: true } // Add upsert option to create the document if not present
  ).exec();
};

// find latest activities based on date
export const findLatestHousing = async (timestamp) => {
  const date = new Date(timestamp);
  const posts = await Housing.find({
    createdDate: {
      $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      $lte: date,
    },
  }).exec();
  return posts;
};
