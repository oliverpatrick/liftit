import { useParams } from 'react-router';

import { ContentLayout } from '@/components/layouts';
import WorkoutPlan from '@/features/workouts/components/workout-plan';

const WorkoutPlanRoute = () => {
  const params = useParams();
  const workoutId = params.workoutId as string;

  return (
    <>
      <ContentLayout title={''}>
        <WorkoutPlan workoutPlanId={workoutId} />
      </ContentLayout>
    </>
  );
};

export default WorkoutPlanRoute;
