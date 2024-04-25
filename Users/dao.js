import model from "./model.js";
import mongoose from "mongoose";

export const createUser = (user) => {
  delete user._id;
  return model.create(user);
};
export const findUsersByRole = (role) => model.find({ role: role });
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>
  model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>
  model.findOne({ username, password });
export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
export const uploadProfilePicture = (userId, url) =>
  model.updateOne({ _id: userId }, { $set: { profilePicture: url } });
export const updateRoleUser = (userId, user) =>
  model.replaceOne({ _id: userId }, user, {
    overwriteDiscriminatorKey: true,
    runValidators: true
});

