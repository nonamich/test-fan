import { Navigate } from 'react-router-dom';

import { useAuth } from '@/auth/AuthContext';
import { AuthForm } from '@/components';

export const LoginPage = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/user" replace />;
  }

  return (
    <>
      <AuthForm />
    </>
  );
};
