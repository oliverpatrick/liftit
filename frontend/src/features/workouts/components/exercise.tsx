import React from 'react';
// import { Link } from 'react-router';

import { Spinner } from '@/components/ui/spinner';

import { useExercise } from '../api/get-exercise';

interface ExerciseProps {
  exerciseId: string;
  workoutId: string;
}

const Exercise: React.FC<ExerciseProps> = ({
  exerciseId,
  workoutId,
}: ExerciseProps) => {
  const exerciseQuery = useExercise({ exerciseId, workoutId });
  const exercise = exerciseQuery.data;

  if (exerciseQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!exercise) return null;

  if (exerciseQuery.error) {
    return <p>No exercise found</p>;
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="rounded-lg bg-white p-4 shadow-sm">
        {/* Exercise Name */}
        <h3 className="mb-2 text-lg font-medium text-gray-800">
          {exercise.name}
        </h3>

        {/* Exercise Details */}
        <div className="space-y-1 text-sm text-gray-600">
          <p>
            <span className="font-semibold">Category:</span> {exercise.category}
          </p>
          <p>
            <span className="font-semibold">Muscle Group:</span>{' '}
            {exercise.muscleGroup}
          </p>
          <p>
            <span className="font-semibold">Equipment:</span>{' '}
            {exercise.equipment}
          </p>
          <p>
            <span className="font-semibold">Type:</span> {exercise.type}
          </p>
          <p>
            <span className="font-semibold">Difficulty:</span>{' '}
            {exercise.difficulty}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Exercise;
