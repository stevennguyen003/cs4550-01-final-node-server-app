import model from "./model.js"; 

export const createFollow = async (followerId, followeeId) => {
    return model.create({ follower: followerId, followee: followeeId });
};

export const deleteFollow = async (followerId, followeeId) => {
    return model.deleteOne({ follower: followerId, followee: followeeId });
};

export const findFollowersByUserId = async (userId) => {
    return model.find({ followee: userId }).populate('follower');
};

export const findFolloweesByUserId = async (userId) => {
    return model.find({ follower: userId }).populate('followee');
};
