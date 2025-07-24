// src/routes/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import AdminPage from '../pages/adminPage/AdminPage';
import LoginPage from '../pages/auth/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import ResponsiveLayout from '../layouts/ResponsiveLayout';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <ResponsiveLayout />,
    children: [
      { path: '/', element: <AdminPage /> },
      { path: '/admin', element: <AdminPage /> },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
