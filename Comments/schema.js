import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
  {
    content: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // Reference to the Post model}
      required: true,
    },
    date: Date,
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
      },
    ],

  },
  { collection: "comments" }
  
);


export default commentSchema;
