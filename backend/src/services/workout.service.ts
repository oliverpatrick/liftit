import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import { WorkoutPlan } from "../models/workout-schema"; // Assuming models are exported from "../models"

/**
 * Query for workout plans
 * @param {Object} filter - Mongoose filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<Array<WorkoutPlan>>}
 */
const queryWorkoutPlans = async (filter: any, options: any) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy
    ? { [options.sortBy]: options.sortType ?? "desc" }
    : {};

  const workoutPlans = await WorkoutPlan.find(filter)
    .sort(sortBy)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean(); // Converts Mongoose docs to plain objects

  return workoutPlans;
};

/**
 * Get workout plan by id
 * @param {string} id
 * @returns {Promise<WorkoutPlan | null>}
 */
const getWorkoutPlanById = async (id: string) => {
  const workoutPlan = await WorkoutPlan.findById(id).lean();
  if (!workoutPlan) {
    throw new ApiError(httpStatus.NOT_FOUND, "Workout plan not found");
  }
  return workoutPlan;
};

export default {
  queryWorkoutPlans,
  getWorkoutPlanById,
};
