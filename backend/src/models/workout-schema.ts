import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

// Repetition Schema
const RepetitionSchema = new Schema({
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  unit: { type: String, enum: ["seconds", "reps", "minutes"], default: "reps" },
});

// Exercise Schema
const ExerciseSchema = new Schema({
  exerciseName: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: RepetitionSchema, required: true },
  category: { type: [String], required: true },
  subCategory: { type: [String], required: true },
});

// Day Schema
const DaySchema = new Schema({
  name: { type: String, required: true },
  warmups: [{ type: Types.ObjectId, ref: "Exercise" }],
  exercises: [{ type: Types.ObjectId, ref: "Exercise" }],
});

// WorkoutPlan Schema
const WorkoutPlanSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  restIntervals: { type: String, required: true },
  intensity: { type: String, required: true },
  days: [{ type: Types.ObjectId, ref: "Day" }],
});

// Models
const Repetition = model("Repetition", RepetitionSchema);
const Exercise = model("Exercise", ExerciseSchema);
const Day = model("Day", DaySchema);
const WorkoutPlan = model("WorkoutPlan", WorkoutPlanSchema);

export { Repetition, Exercise, Day, WorkoutPlan };
