import mongoose from "mongoose";
import { genderEnums } from "../../constants/index.js";
const Schema = mongoose.Schema;

const housingPostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description : {
      type: String
    },
    housingPostImages: [
      {
        data: {
          type: String,
          required: true,
        },
        fileName: {
          type: String,
          required: true,
        },
        fileType: {
          type: String,
          required: true,
        },
      },
    ],
    preferences: {
      gender: {
        type: String,
        enum: [genderEnums.MALE, genderEnums.FEMALE, genderEnums.OTHERS],
      },
      location: {
        type: String,
        required: false,
      },
      rent: {
        type: Number,
        required: false,
      },
      moveInDate: {
        type: Date,
        required: false,
      },
      isOnLease: {
        type: Boolean,
        required: false,
      },
      noOfBeds: {
        type: Number,
        required: false,
      },
      noOfBaths: {
        type: Number,
        required: false,
      },
      noOfTenants: {
        type: Number,
        required: false,
      },
      smoking: {
        type: Boolean,
        required: false,
      },
      alcohol: {
        type: Boolean,
        required: false,
      },
      veg: {
        type: Boolean,
        required: false,
      },
      nonVeg: {
        type: Boolean,
        required: false,
      },
    },
    benefits: {
      freeLaundryInUnit: {
        type: Boolean,
      },
      heatingInUnit: {
        type: Boolean,
      },
      gymInBuilding: {
        type: Boolean,
      },
    },
    rsvps: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: false,
        },
      },
    ],
    savedByUsers: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: false,
        },
      },
    ],
    createdDate: {
      type: Date,
      default: Date.now,
    },
    updateDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const HousingModel = mongoose.model("HousingPost", housingPostSchema);

export default HousingModel;
