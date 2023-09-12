import { INavLinkGroup, Nav } from '@fluentui/react';
import { memo } from 'react';

import { navbarStyles } from './navbarStyle';

const navLink: INavLinkGroup[] = [
  {
    name: 'Task',
    links: [
      {
        name: 'Add New Task',
        url: '/add',
      },
      {
        name: 'My Task',
        url: '/',
      },
    ],
  },
];

const Navbar = () => {
  return <Nav groups={navLink} styles={navbarStyles} />;
};

export default memo(Navbar);
