import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  // Load workout plans from the JSON file
  const filePath = path.resolve(__dirname, "./api.json");
  const workoutPlansData = fs.readFileSync(filePath, "utf-8");
  const workoutPlans = JSON.parse(workoutPlansData);

  for (const workoutPlanData of workoutPlans) {
    const workoutPlan = await prisma.workoutPlan.create({
      data: {
        name: workoutPlanData.name,
        description: workoutPlanData.description,
        isGlobal: workoutPlanData.isGlobal,
        createdAt: new Date(workoutPlanData.createdAt),
      },
    });
    console.log("Created workout plan:", workoutPlan);

    // Loop through each workout in the workout plan
    for (const workoutData of workoutPlanData.workouts) {
      const workout = await prisma.workout.create({
        data: {
          workoutPlanId: workoutPlan.id,
          name: workoutData.name,
          dayOfWeek: workoutData.dayOfWeek,
          createdAt: new Date(workoutData.createdAt),
        },
      });
      console.log("Created workout:", workout);

      // Loop through exercises in the workout
      for (const exerciseData of workoutData.exercises) {
        const exercise = await prisma.exercise.upsert({
          where: { name: exerciseData.exercise.name },
          update: {},
          create: {
            id: exerciseData.exercise.id,
            name: exerciseData.exercise.name,
            category: exerciseData.exercise.category,
            muscleGroup: exerciseData.exercise.muscleGroup,
            equipment: exerciseData.exercise.equipment,
            type: exerciseData.exercise.type,
            difficulty: exerciseData.exercise.difficulty,
          },
        });
        console.log("Created or updated exercise:", exercise);

        await prisma.workoutExercise.create({
          data: {
            workoutId: workout.id,
            exerciseId: exercise.id,
            defaultSets: exerciseData.defaultSets,
            defaultReps: exerciseData.defaultReps,
            defaultUnit: exerciseData.defaultUnit,
            defaultWeight: parseFloat(exerciseData.defaultWeight),
            orderIndex: exerciseData.orderIndex,
          },
        });
        console.log("Added workout exercise:", exerciseData);
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
