import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: String,
    lastName: String,
    displayName: String,
    pfp: File,
    dob: Date,
    role: {
        type: String,
        enum: ["USER", "TEAM-MEMBER", ""],
        default: "ANON",
    },
},
    { collection: "users" });
export default userSchema;