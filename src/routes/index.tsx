import { createBrowserRouter } from 'react-router-dom';

import { CreateTask, DetailTask, EditTask, Home, NetworkError, NotFound } from '../pages';
import RootLayout from './layout';

const Navigations = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
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
        path: 'task/:taskID',
        element: <DetailTask />,
      },
      {
        path: 'task/:taskID/edit',
        element: <EditTask />,
      },
    ],
  },
  {
    path: 'network-error',
    element: <NetworkError />,
  },
]);

export default Navigations;
