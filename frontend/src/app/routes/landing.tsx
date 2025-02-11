import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { Head } from '@/components/seo';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';

const LandingRoute = () => {
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (user.data) {
      navigate(paths.app.workouts.getHref());
    } else {
      navigate(paths.auth.login.getHref());
    }
  }, [user.data]);

  return (
    <>
      <Head description="Login" />
      <div className="flex h-screen items-center bg-white">/</div>
    </>
  );
};

export default LandingRoute;
