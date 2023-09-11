import { initializeIcons } from '@fluentui/react';
import { RouterProvider } from 'react-router-dom';

import Navigations from './routes';

initializeIcons();

const App = () => {
  return <RouterProvider router={Navigations} />;
};

export default App;
