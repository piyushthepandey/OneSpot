import Users from "../../models/users/index.js";

// We will be using methods from mongoose to interact with our database in this file
export const searchUsers = async (param = {}) => {
  const listOfUsers = await Users.find(param).exec();
  return listOfUsers;
};

export const addNewUser = async (newUser) => {
  const UserNew = new Users(newUser);
  return await UserNew.save();
};

// findById is a method given by mongoose to find a document by its _id
export const findByUserId = async (id) => {
  const User = await Users.findById(id).exec();
  return User;
};

// findByIdAndUpdate is a method given by mongoose to find a document by its _id and update it
export const updateUser = async (udpateUser, id) => {
  const User = await Users.findByIdAndUpdate(id, udpateUser).exec();
  return User;
};

// findOneAndDelete is a method given by mongoose to find a document by its _id and delete it
export const removeUser = async (_id) => {
  return await Users.findByIdAndDelete(_id).exec();
};

export const searchExistingUser = async (email) => {
  const User = await Users.findOne({ email }).exec();
  return User;
};

export const updateUserProfle = async (userPaylaod, id) => {
  const UserProfileUpdate = await Users.findByIdAndUpdate(
    id,
    {
      $set: {
        userName: userPaylaod.userName,
        password: userPaylaod.password,
        email: userPaylaod.email,
      },
    },
    { new: true }
  ).exec();

  return UserProfileUpdate;
};
