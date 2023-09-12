import { memo } from 'react';
import { Outlet } from 'react-router-dom';

import { Navbar } from '../../components';

const RootLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default memo(RootLayout);
