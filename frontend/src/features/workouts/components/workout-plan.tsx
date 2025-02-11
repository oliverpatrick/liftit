import React from 'react';
// import { Link } from 'react-router';

import { Link } from '@/components/ui/link';
import { Spinner } from '@/components/ui/spinner';

import { useWorkoutPlan } from '../api/get-workout-plan';

interface WorkoutPlanProps {
  workoutPlanId: string;
}

const WorkoutPlan: React.FC<WorkoutPlanProps> = ({
  workoutPlanId,
}: WorkoutPlanProps) => {
  const workoutDetailQuery = useWorkoutPlan({ workoutId: workoutPlanId });
  const workoutDetail = workoutDetailQuery.data;

  if (workoutDetailQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!workoutDetail) return null;

  if (workoutDetailQuery.error) {
    return <p>No workouts found</p>;
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      {/* Workout Name */}
      <h1 className="mb-4 text-3xl font-bold text-gray-800">
        {workoutDetail.name}
      </h1>

      {/* Workout Description */}
      <p className="mb-6 text-gray-600">{workoutDetail.description}</p>

      {/* Workouts List */}
      <div className="space-y-6">
        {workoutDetail.workouts.map((workout) => (
          <div key={workout.id} className="rounded-lg bg-gray-50 p-4">
            {/* Workout Name and Day */}
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              {workout.name}
            </h2>
            <p className="mb-4 text-sm text-gray-500">
              Day {workout.dayOfWeek}
            </p>

            {/* Exercises List */}
            <div className="space-y-4">
              {workout.exercises.map((exercise) => (
                <Link
                  key={exercise.id}
                  to={`/workouts/workout-plan/${workoutPlanId}/exercise/${exercise.exercise.id}`}
                >
                  <div className="rounded-lg bg-white p-4 shadow-sm">
                    {/* Exercise Name */}
                    <h3 className="mb-2 text-lg font-medium text-gray-800">
                      {exercise.exercise.name}
                    </h3>

                    {/* Exercise Details */}
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>
                        <span className="font-semibold">Category:</span>{' '}
                        {exercise.exercise.category}
                      </p>
                      <p>
                        <span className="font-semibold">Muscle Group:</span>{' '}
                        {exercise.exercise.muscleGroup}
                      </p>
                      <p>
                        <span className="font-semibold">Equipment:</span>{' '}
                        {exercise.exercise.equipment}
                      </p>
                      <p>
                        <span className="font-semibold">Type:</span>{' '}
                        {exercise.exercise.type}
                      </p>
                      <p>
                        <span className="font-semibold">Difficulty:</span>{' '}
                        {exercise.exercise.difficulty}
                      </p>
                    </div>

                    {/* Sets and Reps */}
                    <div className="mt-3 text-sm font-semibold text-blue-600">
                      {`${exercise.defaultSets} sets x ${exercise.defaultReps} reps`}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPlan;
