import { Plus } from 'lucide-react';

import { ContentLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import WorkoutList from '@/features/workouts/components/workout-list';

const WorkoutListRoute = () => {
  return (
    <ContentLayout title="Workouts">
      <div className="flex justify-end">
        <Link to="/workouts/create" className="mr-4">
          <Button size="sm">
            <div className="flex items-center">
              <span className="mr-2 text-lg font-semibold">Create Workout</span>
              <Plus className="size-5" />
            </div>
          </Button>
        </Link>
      </div>
      <div className="mt-4">
        <WorkoutList />
      </div>
    </ContentLayout>
  );
};

export default WorkoutListRoute;
