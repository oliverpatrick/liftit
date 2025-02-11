import { useFormContext } from 'react-hook-form';

import { Select, Input } from '@/components/ui/form';
import { WorkoutPlanFormValues } from '@/types/schema';

type WorkoutFormProps = {
  index: number;
};

const RepetitionForm = ({ index }: WorkoutFormProps) => {
  const { register, formState } = useFormContext<WorkoutPlanFormValues>();

  return (
    <div className="flex-col items-center">
      <Input
        label="Reps"
        type="number"
        error={
          formState.errors['workouts']?.[index]?.exercises?.[index]
            ?.workoutExercises?.defaultReps
        }
        registration={register(
          `workouts.${index}.exercises.${index}.workoutExercises.defaultReps`,
          { valueAsNumber: true },
        )}
      />
      <Input
        label="Sets"
        type="number"
        error={
          formState.errors['workouts']?.[index]?.exercises?.[index]
            ?.workoutExercises?.defaultSets
        }
        registration={register(
          `workouts.${index}.exercises.${index}.workoutExercises.defaultSets`,
          { valueAsNumber: true },
        )}
      />
      <Input
        label="Weight"
        type="number"
        error={
          formState.errors['workouts']?.[index]?.exercises?.[index]
            ?.workoutExercises?.defaultWeight
        }
        registration={register(
          `workouts.${index}.exercises.${index}.workoutExercises.defaultWeight`,
          { valueAsNumber: true },
        )}
      />
      <Select
        label="defaultUnit"
        options={[
          { label: 'lbs', value: 1 },
          { label: 'kg', value: 2 },
          { label: 'bodyweight', value: 3 },
        ]}
        error={
          formState.errors['workouts']?.[index]?.exercises?.[index]
            ?.workoutExercises?.defaultUnit
        }
        registration={register(
          `workouts.${index}.exercises.${index}.workoutExercises.defaultUnit`,
          { valueAsNumber: true },
        )}
      />
    </div>
  );
};

export default RepetitionForm;
