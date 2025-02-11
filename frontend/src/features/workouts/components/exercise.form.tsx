import { X } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Select, Input, FormFieldArray } from '@/components/ui/form';
import { WorkoutPlanFormValues } from '@/types/schema';

// import RepetitionForm from './repetition.form';

type WorkoutFormProps = {
  control: any;
  workoutIndex: number;
};

const ExercseForm = ({ control, workoutIndex }: WorkoutFormProps) => {
  const { register, formState } = useFormContext<WorkoutPlanFormValues>();

  return (
    <FormFieldArray control={control} name="exercises">
      {(fields, append, remove) => (
        <div className="mb-2 space-y-2 rounded-sm border border-gray-200 bg-blue-100 p-4">
          {fields.map((field, exerciseIndex) => {
            console.log('field', field);
            console.log('index', exerciseIndex);

            return (
              <div key={field.id} className="flex-col items-center">
                <div className="flex justify-end">
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    onClick={() => remove(exerciseIndex)}
                    icon={<X />}
                  />
                </div>
                <Input
                  label="Name"
                  error={
                    formState.errors['workouts']?.[workoutIndex]?.exercises?.[
                      exerciseIndex
                    ]?.name
                  }
                  registration={register(
                    `workouts.${workoutIndex}.exercises.${exerciseIndex}.name`,
                  )}
                />
                <Input
                  label="Category"
                  error={
                    formState.errors['workouts']?.[workoutIndex]?.exercises?.[
                      exerciseIndex
                    ]?.category
                  }
                  registration={register(
                    `workouts.${exerciseIndex}.exercises.${exerciseIndex}.category`,
                  )}
                />
                <Input
                  label="Muscle Group"
                  error={
                    formState.errors['workouts']?.[workoutIndex]?.exercises?.[
                      exerciseIndex
                    ]?.muscleGroup
                  }
                  registration={register(
                    `workouts.${workoutIndex}.exercises.${exerciseIndex}.muscleGroup`,
                  )}
                />
                <Input
                  label="Equipment"
                  error={
                    formState.errors['workouts']?.[workoutIndex]?.exercises?.[
                      exerciseIndex
                    ]?.equipment
                  }
                  registration={register(
                    `workouts.${workoutIndex}.exercises.${exerciseIndex}.equipment`,
                  )}
                />
                <Select
                  label="Difficulty"
                  error={
                    formState.errors['workouts']?.[workoutIndex]?.exercises?.[
                      exerciseIndex
                    ]?.difficulty
                  }
                  registration={register(
                    `workouts.${workoutIndex}.exercises.${exerciseIndex}.difficulty`,
                    { valueAsNumber: true },
                  )}
                  options={[
                    { label: 'Beginner', value: 1 },
                    { label: 'Novice', value: 2 },
                    { label: 'Intermediate', value: 3 },
                    { label: 'Advanced', value: 4 },
                    { label: 'Expert', value: 5 },
                  ]}
                />
                {/* <RepetitionForm index={exerciseIndex} /> */}
              </div>
            );
          })}
          <Button
            type="button"
            onClick={() =>
              append({
                name: '',
                category: '',
                muscleGroup: '',
                equipment: '',
                type: '',
                difficulty: 1,
                // workoutExercises: {
                //   defaultSets: 1,
                //   defaultReps: 1,
                //   defaultWeight: 0,
                //   defaultUnit: 1,
                // },
              })
            }
          >
            Add Exercise
          </Button>
        </div>
      )}
    </FormFieldArray>
  );
};

export default ExercseForm;
