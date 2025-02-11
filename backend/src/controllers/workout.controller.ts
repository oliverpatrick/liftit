import httpStatus from "http-status";
import pick from "../utils/pick";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";
import { workoutService } from "../services";

const getWorkouts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "intensity"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await workoutService.queryWorkoutPlans(filter, options);
  res.send(result);
});

const getWorkout = catchAsync(async (req, res) => {
  const workoutPlan = await workoutService.getWorkoutPlanById(
    req.params.workoutId
  );
  if (!workoutPlan) {
    throw new ApiError(httpStatus.NOT_FOUND, "Workout plan not found");
  }
  res.send(workoutPlan);
});

export default {
  getWorkouts,
  getWorkout,
};
