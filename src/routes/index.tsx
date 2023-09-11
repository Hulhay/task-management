import { createBrowserRouter } from 'react-router-dom';

import { CreateTask, DetailTask, Home } from '../pages';

const Navigations = createBrowserRouter([
  {
    index: true,
    element: <Home />,
  },
  {
    path: '/add',
    element: <CreateTask />,
  },
  {
    path: '/task/:id',
    element: <DetailTask />,
  },
]);

export default Navigations;
