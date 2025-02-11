import { X } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormFieldArray, Input, Select } from '@/components/ui/form';
import { WorkoutPlanFormValues } from '@/types/schema';

import ExerciseForm from './exercise.form';

type WorkoutFormProps = {
  control: any;
};

const WorkoutForm = ({ control }: WorkoutFormProps) => {
  const { formState, register } = useFormContext<WorkoutPlanFormValues>();
  // console.log('formState.errors', formState.errors);

  return (
    <FormFieldArray control={control} name="workouts">
      {(fields, append, remove) => (
        <div className="mb-2 flex-col space-y-2 rounded-sm border border-gray-200 bg-blue-200 p-4">
          {fields.map((field, index) => {
            console.log('workout field', field);
            console.log('workout index', index);

            return (
              <div key={field.id} className="flex-col items-center">
                <div className="flex justify-end">
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    onClick={() => remove(index)}
                    icon={<X />}
                  ></Button>
                </div>
                <Input
                  label="Workout Name"
                  placeholder="Enter workout name"
                  error={formState.errors['workouts']?.[index]?.name}
                  registration={register(`workouts.${index}.name`)} // Dynamically refer to the workout name
                />
                <Select
                  label="Day of the Week"
                  options={[
                    { label: 'Sunday', value: 1 as number },
                    { label: 'Monday', value: 2 as number },
                    { label: 'Tuesday', value: 3 as number },
                    { label: 'Wednesday', value: 4 as number },
                    { label: 'Thursday', value: 5 as number },
                    { label: 'Friday', value: 6 as number },
                    { label: 'Saturday', value: 7 as number },
                  ]}
                  error={formState.errors['workouts']?.[index]?.dayOfWeek}
                  registration={register(`workouts.${index}.dayOfWeek`, {
                    valueAsNumber: true,
                  })}
                />

                <h3 className="mb-2 text-lg font-medium text-gray-800">
                  Exercises
                </h3>
                <ExerciseForm control={control} workoutIndex={index} />
              </div>
            );
          })}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() => append({ name: '', dayOfWeek: 1, exercises: [] })}
            >
              Add Workout
            </Button>
          </div>
        </div>
      )}
    </FormFieldArray>
  );
};

export { WorkoutForm };
