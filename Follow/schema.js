import mongoose from "mongoose";
const { Schema, model } = mongoose;

const followSchema = new Schema({
    follower: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    followee: { type: Schema.Types.ObjectId, ref: 'User', required: true },
   // createdAt: { type: Date, default: Date.now }
});

export default model('Follow', followSchema);
