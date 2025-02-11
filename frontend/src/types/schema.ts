import { z } from 'zod';

// User Schema
const userSchema = z.object({
  id: z.number().int().positive().optional(), // Auto-generated, optional for creation
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  createdAt: z.date().optional(), // Auto-generated, optional for creation
  workoutPlans: z.array(z.number().int().positive()).optional(), // Array of workoutPlan IDs
  createdWorkoutPlans: z.array(z.number().int().positive()).optional(), // Array of workoutPlan IDs
  exerciseLogs: z.array(z.number().int().positive()).optional(), // Array of exerciseLog IDs
});

// UserWorkoutPlan Schema
const userWorkoutPlanSchema = z.object({
  userId: z.number().int().positive(),
  workoutPlanId: z.number().int().positive(),
  assignedAt: z.date().optional(), // Auto-generated, optional for creation
});

// ExerciseLog Schema
const exerciseLogSchema = z.object({
  id: z.number().int().positive().optional(), // Auto-generated, optional for creation
  userId: z.number().int().positive(),
  workoutId: z.number().int().positive(),
  exerciseId: z.number().int().positive(),
  sets: z.number().int().min(1).default(1),
  reps: z.number().int().min(1).default(1),
  unit: z.number().int().min(1).default(1),
  weight: z.number().min(0).default(0.0),
  completedAt: z.date().optional(), // Auto-generated, optional for creation
});

// WorkoutExercise Schema
const workoutExerciseSchema = z.object({
  id: z.number().int().positive().optional(), // Auto-generated, optional for creation
  workoutId: z.number().int().positive().optional(), // Optional foreign key
  exerciseId: z.number().int().positive().optional(), // Optional foreign key
  defaultSets: z.number().int().min(1).default(1),
  defaultReps: z.number().int().min(1).default(1),
  defaultUnit: z.number().int().min(1).default(1),
  defaultWeight: z.number().min(0).default(0.0),
  orderIndex: z.number().int().min(1).default(1),
});

// Exercise Schema
const exerciseSchema = z.object({
  id: z.number().int().positive().optional(), // Auto-generated, optional for creation
  name: z.string().min(1, 'Exercise name is required'),
  category: z.string().optional(),
  muscleGroup: z.string().optional(),
  equipment: z.string().optional(),
  type: z.string().optional(),
  difficulty: z.number().int().min(1).max(5).default(1),
  workoutExercises: workoutExerciseSchema,
  exerciseLogs: z.array(z.number().int().positive()).optional(), // Array of exerciseLog IDs
});

// Workout Schema
const workoutSchema = z.object({
  id: z.number().int().positive().optional(), // Auto-generated, optional for creation
  workoutPlanId: z.number().int().positive().optional(), // Optional foreign key
  name: z.string().min(1, 'Workout name is required'),
  dayOfWeek: z.number().int().min(1).max(7).default(1),
  createdAt: z.date().optional(),
  exercises: z.array(exerciseSchema),
  exerciseLogs: z.array(z.number().int().positive()).optional(), // Array of exerciseLog IDs
});

// WorkoutPlan Schema
const workoutPlanSchema = z.object({
  id: z.number().int().positive().optional(), // Auto-generated, optional for creation
  name: z.string().min(1, 'Workout plan name is required'),
  description: z.string().optional(),
  isGlobal: z.boolean().default(false),
  createdById: z.number().int().positive().optional().nullable(), // Optional foreign key
  createdAt: z.date().optional(), // Auto-generated, optional for creation
  workouts: z.array(workoutSchema).optional(), // Array of workout IDs
  users: z.array(z.number().int().positive()).optional(), // Array of user IDs
});

export type WorkoutPlanFormValues = z.infer<typeof workoutPlanSchema>;

// Export all schemas
export {
  userSchema,
  workoutPlanSchema,
  userWorkoutPlanSchema,
  workoutSchema,
  exerciseSchema,
  workoutExerciseSchema,
  exerciseLogSchema,
};
