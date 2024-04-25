import mongoose from "mongoose";
const exerciseSchema = new mongoose.Schema(
    {
        name: String,
        savedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            required: true,
        },
    },
    { collection: "exercises" }
);

export default exerciseSchema;