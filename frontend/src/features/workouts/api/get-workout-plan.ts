import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '../../../lib/api-client';
import { QueryConfig } from '../../../lib/react-query';
import { WorkoutPlan } from '../../../types/api';

export const getWorkoutPlan = ({
  workoutId,
}: {
  workoutId: string;
}): Promise<WorkoutPlan> => {
  return api.get(`/workouts/workout-plan/${workoutId}`);
};

export const getWorkoutPlanQueryOptions = (workoutId: string) => {
  return queryOptions({
    queryKey: ['workout-plan', workoutId],
    queryFn: () => getWorkoutPlan({ workoutId }),
  });
};

type UseWorkoutsOptions = {
  workoutId: string;
  queryConfig?: QueryConfig<typeof getWorkoutPlanQueryOptions>;
};

export const useWorkoutPlan = ({
  workoutId,
  queryConfig,
}: UseWorkoutsOptions) => {
  return useQuery({
    ...getWorkoutPlanQueryOptions(workoutId),
    ...queryConfig,
  });
};
