import model from "./model.js";
import mongoose from "mongoose";

export const createPost = (post) => {
  delete post._id;
  return model.create(post);
};

export const findAllPosts = () => model.find();
export const findPostById = (postId) => model.findById(postId);
export const updatePost = (postId, post) => {
  return model.updateOne({ _id: postId }, { $set: post });
};
export const deletePost = (postId) => {
  return model.deleteOne({ _id: postId });
};
export const findPostsByAuthor = (authorId) => {
  return model.find({ author: authorId });
};
export const uploadImage = (postId, url) =>
  model.updateOne({ _id: postId }, { $set: { image: url } });
