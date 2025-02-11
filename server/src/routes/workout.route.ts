import express, { Router, Request, Response } from "express";
import prisma from "../client"; // Adjust the path to your Prisma client
import {
  Exercise,
  Prisma,
  Workout,
  WorkoutExercise,
  WorkoutPlan,
} from "@prisma/client";

export const workoutsRoute: Router = express.Router();

// GET all workout plans
workoutsRoute.get("/workouts", async (req: Request, res: Response) => {
  try {
    const workouts = await prisma.workoutPlan.findMany();
    res.json(workouts);
  } catch (error) {
    console.error("Error fetching workouts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET a single workout plan by its ID, including related data
workoutsRoute.get(
  "/workouts/workout-plan/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid workout plan ID" });
        return;
      }

      const workoutPlan = await prisma.workoutPlan.findUnique({
        where: { id },
        include: {
          createdBy: true,
          users: {
            include: { user: true },
          },
          workouts: {
            include: {
              exercises: {
                include: { exercise: true },
              },
              exerciseLogs: true,
            },
          },
        },
      });

      if (!workoutPlan) {
        res.status(404).json({ error: "Workout plan not found" });
        return;
      }

      res.json(workoutPlan);
    } catch (error) {
      console.error("Error fetching workout plan:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// GET a single exercise by its ID within a given workout plan
workoutsRoute.get(
  "/workouts/workout-plan/:workoutPlanId/exercise/:exerciseId",
  async (req: Request, res: Response) => {
    try {
      const workoutPlanId = parseInt(req.params.workoutPlanId, 10);
      const exerciseId = parseInt(req.params.exerciseId, 10);

      if (isNaN(workoutPlanId) || isNaN(exerciseId)) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }

      const exercise = await prisma.exercise.findUnique({
        where: { id: exerciseId },
      });

      if (!exercise) {
        res.status(404).json({ error: "Exercise not found" });
        return;
      }

      res.json(exercise);
    } catch (error) {
      console.error("Error fetching exercise:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

/* ============================================================================
   Create a WorkoutPlan
   ----------------------------------------------------------------------------
   Creates a new workout plan. In your schema, WorkoutPlan has the following fields:
   - name: string
   - description: string (optional)
   - isGlobal: boolean (defaults to false)
   - createdById: number (optional foreign key)
============================================================================ */
export async function createWorkoutPlan(
  tx: Prisma.TransactionClient,
  data: {
    name: string;
    description?: string;
    isGlobal: boolean;
    createdById: number;
  }
): Promise<WorkoutPlan> {
  return tx.workoutPlan.create({ data });
}

/* ============================================================================
   Create a Workout
   ----------------------------------------------------------------------------
   Creates a workout and associates it with an existing workout plan via
   the foreign key. In your schema, Workout has the following fields:
   - name: string
   - dayOfWeek: number (defaults to 1)
   - workoutPlanId: number (foreign key)
============================================================================ */
export async function createWorkout(
  tx: Prisma.TransactionClient,
  data: {
    name: string;
    dayOfWeek: number;
    workoutPlanId: number;
  }
): Promise<Workout> {
  return tx.workout.create({
    data: {
      name: data.name,
      dayOfWeek: data.dayOfWeek,
      workoutPlan: { connect: { id: data.workoutPlanId } },
    },
  });
}

/* ============================================================================
   Create an Exercise
   ----------------------------------------------------------------------------
   Creates an exercise record. In your schema, Exercise has the following fields:
   - name: string (unique)
   - category?: string
   - muscleGroup?: string
   - equipment?: string
   - type?: string
   - difficulty: number (defaults to 1)
   
   If you wish to prevent duplicate exercises based on name, consider using
   upsert or first checking for an existing exercise before creating.
============================================================================ */
export async function createExercise(
  tx: Prisma.TransactionClient,
  data: {
    name: string;
    category?: string;
    muscleGroup?: string;
    equipment?: string;
    type?: string;
    difficulty: number;
  }
): Promise<Exercise> {
  return tx.exercise.create({ data });
}

/* ============================================================================
   Create a WorkoutExercise
   ----------------------------------------------------------------------------
   Creates a join record between a Workout and an Exercise, along with additional
   fields (defaultSets, defaultReps, etc.). In your schema, WorkoutExercise has:
   - workoutId: number (foreign key)
   - exerciseId: number (foreign key)
   - defaultSets: number (defaults to 1)
   - defaultReps: number (defaults to 1)
   - defaultUnit: number (defaults to 1)
   - defaultWeight?: Decimal (optional, defaults to 0.0)
   - orderIndex: number (defaults to 1)
============================================================================ */
export async function createWorkoutExercise(
  tx: Prisma.TransactionClient,
  data: {
    workoutId: number;
    exerciseId: number;
    defaultSets: number;
    defaultReps: number;
    defaultUnit: number;
    defaultWeight?: number; // Assuming JavaScript number maps to Decimal
    orderIndex: number;
  }
): Promise<WorkoutExercise> {
  return tx.workoutExercise.create({
    data: {
      workout: { connect: { id: data.workoutId } },
      exercise: { connect: { id: data.exerciseId } },
      defaultSets: data.defaultSets,
      defaultReps: data.defaultReps,
      defaultUnit: data.defaultUnit,
      defaultWeight: data.defaultWeight,
      orderIndex: data.orderIndex,
    },
  });
}

/**
 * POST /workouts/create-workout-plan
 *
 * Expected request body:
 * {
 *   "name": "Plan Name",
 *   "description": "Some description",
 *   "isGlobal": true,
 *   "createdById": 1,
 *   "workouts": [
 *     {
 *       "name": "Workout Name",
 *       "dayOfWeek": 2,
 *       "exercises": [
 *         {
 *           "name": "Exercise Name",
 *           "category": "Category",
 *           "muscleGroup": "Muscle Group",
 *           "equipment": "Equipment",
 *           "type": "Type",
 *           "difficulty": 1,
 *           "workoutExercises": {
 *             "defaultSets": 1,
 *             "defaultReps": 1,
 *             "defaultUnit": 2,
 *             "defaultWeight": 10,
 *             "orderIndex": 1
 *           }
 *         }
 *       ]
 *     }
 *   ]
 * }
 */
workoutsRoute.post(
  "/workouts/create-workout-plan",
  async (req: Request, res: Response) => {
    try {
      // Destructure request body; assume it contains the proper structure.
      const { name, description, isGlobal, createdById, workouts } = req.body;

      // Basic validation.
      if (!name || !description || createdById === undefined) {
        res.status(400).json({ error: "Missing required fields" });
      }

      // Run all operations within a transaction.
      const result = await prisma.$transaction(async (tx) => {
        // 1. Create WorkoutPlan.
        const workoutPlan = await createWorkoutPlan(tx, {
          name,
          description,
          isGlobal,
          createdById,
        });

        // 2. Loop through each workout.
        for (const workoutData of workouts) {
          // Create a Workout for this WorkoutPlan.
          const workout = await createWorkout(tx, {
            name: workoutData.name,
            dayOfWeek: workoutData.dayOfWeek,
            workoutPlanId: workoutPlan.id,
          });

          // 3. Loop through each exercise in this workout.
          for (const exerciseData of workoutData.exercises) {
            // Create an Exercise.
            const exercise = await createExercise(tx, {
              name: exerciseData.name,
              category: exerciseData.category,
              muscleGroup: exerciseData.muscleGroup,
              equipment: exerciseData.equipment,
              type: exerciseData.type,
              difficulty: exerciseData.difficulty,
            });

            // 4. Create a WorkoutExercise (join record).
            if (exerciseData.workoutExercises) {
              await createWorkoutExercise(tx, {
                workoutId: workout.id,
                exerciseId: exercise.id,
                defaultSets: exerciseData.workoutExercises.defaultSets,
                defaultReps: exerciseData.workoutExercises.defaultReps,
                defaultUnit: exerciseData.workoutExercises.defaultUnit,
                defaultWeight: exerciseData.workoutExercises.defaultWeight,
                orderIndex: exerciseData.workoutExercises.orderIndex,
              });
            }
          }
        }

        return workoutPlan;
      });

      res.json(result);
    } catch (error: any) {
      console.error("Error creating workout plan:", error);
      res
        .status(500)
        .json({ error: error.message || "Error creating workout plan" });
    }
  }
);
