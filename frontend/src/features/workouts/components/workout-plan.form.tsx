import { Button } from '@/components/ui/button';
import { Form, Input, Label, Switch, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
// import { useUser } from '@/lib/auth';
import { useUser } from '@/lib/auth';
import { WorkoutPlanFormValues, workoutPlanSchema } from '@/types/schema';

import { useCreateWorkoutPlan } from '../api/create-workout-plan';

import { WorkoutForm } from './workout.form';

const WorkoutPlanForm = () => {
  const { addNotification } = useNotifications();
  const user = useUser();
  const createWorkoutPlan = useCreateWorkoutPlan({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Workout Plan Created',
        });
      },
    },
  });
  //   const user = useUser();

  return (
    <div className="flex-col space-y-4">
      <Form
        id="create-workout-plan"
        onSubmit={(values: WorkoutPlanFormValues) => {
          createWorkoutPlan.mutate({ data: values });
        }}
        schema={workoutPlanSchema}
        options={{
          defaultValues: {
            name: '',
            description: '',
            isGlobal: true,
            createdById: Number(user?.data?.id),
            workouts: [],
            // users: [Number(user?.data?.id)],
          },
        }}
      >
        {({ register, formState, setValue, watch, control }) => (
          <div className="flex-col space-y-2">
            <Input
              label="Name"
              error={formState.errors['name']}
              registration={register('name')}
            />

            <Textarea
              label="Description"
              error={formState.errors['description']}
              registration={register('description')}
            />

            <div className="flex items-center space-x-2">
              <Switch
                name="Public"
                onCheckedChange={(value) => setValue('isGlobal', value)}
                checked={watch('isGlobal')}
                className={` relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2`}
                id="public"
              />
              <Label htmlFor="public">Public</Label>
            </div>

            <h3 className="text-lg font-semibold text-gray-800">Workouts</h3>
            <WorkoutForm control={control} />
          </div>
        )}
      </Form>
      <Button
        form="create-workout-plan"
        type="submit"
        isLoading={createWorkoutPlan.isPending}
      >
        Submit
      </Button>
    </div>
  );
};

export default WorkoutPlanForm;
