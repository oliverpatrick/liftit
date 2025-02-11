import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '../../../lib/api-client';
import { QueryConfig } from '../../../lib/react-query';
import { WorkoutPlan } from '../../../types/api';

export const getWorkouts = (): Promise<WorkoutPlan[]> => {
  return api.get(`/workouts`);
};

export const getWorkoutsQueryOptions = () => {
  return queryOptions({
    queryKey: ['workouts'],
    queryFn: () => getWorkouts(),
  });
};

type UseWorkoutsOptions = {
  queryConfig?: QueryConfig<typeof getWorkoutsQueryOptions>;
};

export const useWorkouts = ({ queryConfig }: UseWorkoutsOptions) => {
  return useQuery({
    ...getWorkoutsQueryOptions(),
    ...queryConfig,
  });
};
