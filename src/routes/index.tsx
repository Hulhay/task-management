import { createBrowserRouter } from 'react-router-dom';

import { CreateTask, DetailTask, Home } from '../pages';
import RootLayout from './layout';

const Navigations = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'add',
        element: <CreateTask />,
      },
      {
        path: 'task/:id',
        element: <DetailTask />,
      },
    ],
  },
]);

export default Navigations;
