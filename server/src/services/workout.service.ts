import { User, WorkoutPlan } from "@prisma/client";
import httpStatus from "http-status";
import prisma from "../client";
import ApiError from "../utils/ApiError";

// /**
//  * Create a user
//  * @param {Object} userBody
//  * @returns {Promise<User>}
//  */
// const createWorkoutPlan = async (name: string, email: string): Promise<WorkoutPlan> => {
//   // if (await getUserById(id)) {
//   //   throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
//   // }
//   return prisma.user.create({
//     data: {
//       name: name,
//       email: email,
//     },
//   });
// };

// const getWorkoutPlan = async (id: number): Promise<WorkoutPlan | null> => {
//   try {
//     const id = parseInt(req.params.id, 10);
//     if (isNaN(id)) {
//       res.status(400).json({ error: "Invalid workout plan ID" });
//       return;
//     }

//     const workoutPlan = await prisma.workoutPlan.findUnique({
//       where: { id },
//       include: {
//         createdBy: true,
//         users: {
//           include: {
//             user: true,
//           },
//         },
//         workouts: {
//           include: {
//             exercises: {
//               include: {
//                 exercise: true,
//               },
//             },
//             exerciseLogs: true,
//           },
//         },
//       },
//     });

//     if (!workoutPlan) {
//       res.status(404).json({ error: "Workout plan not found" });
//       return;
//     }

//     res.json(workoutPlan);
//   } catch (error) {
//     console.error("Error fetching workout plan:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export default {
//   createUser,
// };
