import model from "./model.js";

export const createFollow = async (follow) => {
  delete follow._id;
  return model.create(follow);
};

export const deleteFollow = async (followId) => {
  return model.deleteOne({ _id: followId });
};

export const findFollowsByUserId = async (userId) => {
  return model.find({ user: userId });
};

export const updateFollow = async (followId, follow) => {
  return model.updateOne({ _id: followId }, { $set: follow });
};

export const findFollowsById = async (followId) => {
    return model.findById(followId);    
}
