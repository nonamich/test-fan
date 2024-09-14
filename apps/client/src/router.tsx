import { createBrowserRouter } from 'react-router-dom';

import { Layout } from './components';
import { HomePage, LoginPage, UserPage, Page404 } from './pages';

export const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: Layout,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      {
        path: '/user',
        element: <UserPage />,
      },
      { path: '*', element: <Page404 /> },
    ],
  },
]);
