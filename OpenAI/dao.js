import model from "./model.js";
import mongoose from "mongoose";

export const saveExercise = (exercise) => {
    return model.create(exercise);
}
export const findExerciseById = (exerciseId) => model.findById(exerciseId);
export const unsaveExercise = (exerciseId) => {
    return model.deleteOne({ _id: exerciseId });
}
export const findExerciseByUser = (userId) => {
    return model.find({ savedBy: userId });
}