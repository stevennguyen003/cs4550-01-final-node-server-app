import model from "./model.js"; 

export const createFriendRequest = async (friendData) => {
  return model.create(friendData);
};

export const updateFriendRequest = async (requesterId, recipientId, updateData) => {
  return model.findOneAndUpdate(
    { requester: requesterId, recipient: recipientId },
    { $set: updateData },
    { new: true } 
  );
};

export const findAllFriendRequestsByUser = async (userId) => {
  return model.find({
    $or: [{ requester: userId }, { recipient: userId }]
  }).populate('requester recipient', 'username'); 
};

export const deleteFriendRequest = async (requesterId, recipientId) => {
  return model.findOneAndDelete({ requester: requesterId, recipient: recipientId });
};

export const findPendingRequestsToUser = async (userId) => {
  return model.find({ recipient: userId, status: 'pending' });
};
