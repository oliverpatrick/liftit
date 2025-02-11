import React from 'react';
import { Link } from 'react-router';

import { Spinner } from '@/components/ui/spinner';
import { WorkoutPlan } from '@/types/api';

import { useWorkouts } from '../api/get-workout-list';

// type WorkoutListProps = {
//   onWorkoutSelect: (id: number) => void;
// };

/**
 * Workout list component
 *
 * @param {*} onWorkoutSelect - Id Workout selection
 * @returns {*}
 */
const WorkoutList: React.FC = () => {
  const workoutQuery = useWorkouts({});
  const workouts = workoutQuery.data;

  if (workoutQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!workouts) return null;

  if (workoutQuery.error) {
    return <p>No workouts found</p>;
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      {/* Workout Plans List */}
      <div className="space-y-4">
        {workouts.map((workout: WorkoutPlan) => (
          <Link
            key={workout.id}
            to={`/workouts/workout-plan/${workout.id}`}
            className="block rounded-lg bg-gray-50 p-4 transition-colors duration-200 hover:bg-gray-100"
          >
            <div>
              {/* Workout Name */}
              <h5 className="mb-2 text-xl font-bold text-gray-800">
                {workout.name}
              </h5>

              {/* Workout Description */}
              <p className="text-gray-600">{workout.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WorkoutList;
