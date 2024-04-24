import mongoose from "mongoose";

// Friend Schema to manage friend relationships between users
const friendSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined', 'blocked'],
    default: 'pending'
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  confirmedDate: Date
}, { collection: 'friends' });

export default friendSchema;
