import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    content: String,
    image: String,
    
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    date: Date,
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment", // Reference to the Comment model
      },
    ],
  },
  { collection: "posts" }
);

export default postSchema;
