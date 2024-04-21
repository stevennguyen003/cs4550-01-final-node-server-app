import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    displayName: String,
    profilePicture: String,
    dob: Date,
    role: {
        type: String,
        enum: ["USER", "ADMIN", ""],
        default: "USER",
    },
    bio: String,
    yearsOfExperience: Number,
},
    { collection: "users" });
export default userSchema;