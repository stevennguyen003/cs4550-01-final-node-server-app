import model from "./model.js";
import mongoose from "mongoose";

export const createComment = (comment) => {
  delete comment._id;
  return model.create(comment);
};

export const findAllComments = () => model.find();
export const findCommentById = (commentId) => model.findById(commentId);
export const updateComment = (commentId, comment) => {
  return model.updateOne({ _id: commentId }, { $set: comment });
};
export const deleteComment = (commentId) => {
  return model.deleteOne({ _id: commentId });
};
export const findCommentsByPost = (postId) => {
  return model.find({ post: (postId) });
};
