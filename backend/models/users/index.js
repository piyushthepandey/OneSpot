import mongoose from "mongoose";
import { UserRoles, genderEnums } from "../../constants/index.js";

// We will be using the mongoose schema to define the structure of the document
const Schemea = mongoose.Schema;

const userSchema = new Schemea(
  {
    userName: {
      type: String,
      // required is used to specify if the field is mandatory or not
      required: true,
      // unique is used to specify that this field should be unique
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      // we can adjust the min length of the password as mongodb is polymorphic
      minlength: 8,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      // Basic email format validation where it has to follow the format of <string>@<string>.<string>
      match: /^\S+@\S+\.\S+$/,
    },
    phoneNumber: {
      type: String,
      trim: true,
      // Basic phone number format validation where we accept numbers from 0 to 9 and length between 10 to 15
      match: /^[0-9]{10,15}$/,
    },
    profilePicture: {
      // We have to decide on how to handle images when we are storing them in the database
      type: String,
    },
    userRole: {
      type: String,
      enum: [UserRoles.ADMIN, UserRoles.USER],
      default: UserRoles.USER,
    },
    isUserEnabled: {
      type: Boolean,
      default: true,
    },
    personalInfo: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      // I was thinking of using DOB to derive the age of the user instead of asking user the age
      dateOfBirth: {
        type: Date,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        enum: [genderEnums.MALE, genderEnums.FEMALE, genderEnums.OTHERS],
      },
    },
  },
  {
    versionKey: false,
    // timestamps will automatically add the createdAt and updatedAt fields to the document
    // hence i removed it from the scema above
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
