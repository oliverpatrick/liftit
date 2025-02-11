import { useNavigate, useSearchParams } from 'react-router';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { paths } from '@/config/paths';
import { LoginForm } from '@/features/auth/components/login-form';

const LoginRoute = () => {
  return (
    <AuthLayout title="Log in">
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginRoute;
