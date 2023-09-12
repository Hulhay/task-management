import { createBrowserRouter } from 'react-router-dom';

import { CreateTask, DetailTask, EditTask, Home } from '../pages';
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
        path: 'task/:taskID',
        element: <DetailTask />,
      },
      {
        path: 'task/:taskID/edit',
        element: <EditTask />,
      },
    ],
  },
]);

export default Navigations;
