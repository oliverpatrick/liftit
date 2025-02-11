// import { useParams } from 'react-router';

import { ContentLayout } from '@/components/layouts';
import WorkoutPlanForm from '@/features/workouts/components/workout-plan.form';

// import WorkoutPlan from '@/features/workouts/components/workout-plan';

const createWorkoutRoute = () => {
  return (
    <>
      <ContentLayout title={'Create Workout Plan'}>
        <WorkoutPlanForm />
      </ContentLayout>
    </>
  );
};

export default createWorkoutRoute;
