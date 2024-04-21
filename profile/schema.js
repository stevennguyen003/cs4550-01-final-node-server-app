import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  profilePicture: String, // URL to the profile image
  bio: String,
  phoneNumber: String,
  role: {
    type: String,
    enum: ["USER", "VISITOR"], // i think this could be talked about?
    default: "USER",
  },
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Content' }], 
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], 
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
},
{
  collection: "users",
  timestamps: true,
});
const schema = mongoose.model("User", userSchema);
export default schema;
//export default mongoose.model("User", userSchema);
//export default userSchema;
