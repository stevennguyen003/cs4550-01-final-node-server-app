import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("ExerciseModel", schema);
export default model;