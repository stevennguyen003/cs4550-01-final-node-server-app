import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    displayName: { type: String, required: true },
    profilePicture: String,
    dob: Date,
    role: {
        type: String,
        enum: ["USER", "ADMIN", ""],
        default: "USER",
    },
    bio: { type: String },
    yearsOfExperience: { type: Number, required: true },
    sex: {
        type: String,
        enum: ["Male", "Female"],
        required: true },
},
    { discriminatorKey: 'role', collection: "users" });
export default userSchema;

const adminSchema = userSchema.discriminator('ADMIN', new mongoose.Schema({
    department: String,
}));

const appUserSchema = userSchema.discriminator('USER', new mongoose.Schema({
    status: {
        type: String,
        enum: ["BANNED", "NORMAL"],
        default: "NORMAL",},
}));