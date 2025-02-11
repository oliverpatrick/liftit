import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { WorkoutPlan } from '@/types/api';
import { workoutPlanSchema } from '@/types/schema';

import { getWorkoutsQueryOptions } from './get-workout-list';

export type CreateWorkoutPlanInput = z.infer<typeof workoutPlanSchema>;

export const createWorkoutPlan = ({
  data,
}: {
  data: CreateWorkoutPlanInput;
}): Promise<WorkoutPlan> => {
  return api.post(`workouts/create-workout-plan`, data);
};

type UseCreateWorkoutPlanOptions = {
  mutationConfig?: MutationConfig<typeof createWorkoutPlan>;
};

export const useCreateWorkoutPlan = ({
  mutationConfig,
}: UseCreateWorkoutPlanOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getWorkoutsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createWorkoutPlan,
  });
};
