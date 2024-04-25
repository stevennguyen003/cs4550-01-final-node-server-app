import mongoose from "mongoose";
const { Schema, model } = mongoose;

const followsSchema = new mongoose.Schema(
  {

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
      },
    ],
    followees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { collection: "follows" }
);

export default followsSchema ;
