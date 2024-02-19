import mongoose from "mongoose";
const Schema = mongoose.Schema;
const activityPostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  activityPostImages: [
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
  shared: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  preferences: [
    {
      type: String,
      required: false,
    },
  ],
  category:  {
    type: String,
    required: true,
  },
  rsvps: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  savedBy: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
});

const ActivityPost = mongoose.model("ActivityPost", activityPostSchema);

export default ActivityPost;
