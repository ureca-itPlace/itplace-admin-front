// src/layouts/DefaultLayout.tsx
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/common/LoadingSpinner';

const DefaultLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner className="h-12 w-12 border-4 border-purple04 border-t-transparent" />
      </div>
    );
  }

  if (!user?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-grey01">
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
