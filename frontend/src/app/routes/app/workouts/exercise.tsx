import { useParams } from 'react-router';

import { ContentLayout } from '@/components/layouts';
import { Table } from '@/components/ui/table/table copy';
import Exercise from '@/features/workouts/components/exercise';

const ExerciseRoute = () => {
  const params = useParams();
  const exerciseId = params.exerciseId as string;
  const workoutId = params.workoutId as string;

  return (
    <>
      <ContentLayout title={''}>
        <Exercise exerciseId={exerciseId} workoutId={workoutId} />
        <Table />
      </ContentLayout>
    </>
  );
};

export default ExerciseRoute;
