// src/routes/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import AdminPage from '../pages/adminPage/AdminPage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import NotFoundPage from '../pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <AdminPage /> },
      { path: '/admin', element: <AdminPage /> },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
