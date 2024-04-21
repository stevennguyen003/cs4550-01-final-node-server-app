import model from "./model.js";

export const createUser = (user) => model.create(user);
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) => model.findOne({ username: username });
export const findUserByCredentials = (username, password) => model.findOne({ username, password });
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });

// we should have this right
export const followUser = (userId, targetUserId) => model.findByIdAndUpdate(
  userId,
  { $addToSet: { following: targetUserId }},
  { new: true }
);

// ?
export const unfollowUser = (userId, targetUserId) => model.findByIdAndUpdate(
  userId,
  { $pull: { following: targetUserId }},
  { new: true }
);
