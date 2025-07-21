// src/App.tsx
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import ToastProvider from './components/common/ToastProvider';

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastProvider />
    </>
  );
};

export default App;
