import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '../../../lib/api-client';
import { QueryConfig } from '../../../lib/react-query';
import { Exercise } from '../../../types/api';

export const getExercise = ({
  exerciseId,
  workoutId,
}: {
  exerciseId: string;
  workoutId: string;
}): Promise<Exercise> => {
  return api.get(`/workouts/workout-plan/${workoutId}/exercise/${exerciseId}`);
};

export const getExerciseQueryOptions = (
  exerciseId: string,
  workoutId: string,
) => {
  return queryOptions({
    queryKey: ['exercise'],
    queryFn: () => getExercise({ exerciseId, workoutId }),
  });
};

type UseExerciseOptions = {
  exerciseId: string;
  workoutId: string;
  queryConfig?: QueryConfig<typeof getExerciseQueryOptions>;
};

export const useExercise = ({
  exerciseId,
  workoutId,
  queryConfig,
}: UseExerciseOptions) => {
  return useQuery({
    ...getExerciseQueryOptions(exerciseId, workoutId),
    ...queryConfig,
  });
};
