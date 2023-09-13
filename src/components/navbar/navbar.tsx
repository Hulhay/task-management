import { INavLinkGroup, Nav } from '@fluentui/react';
import { memo } from 'react';
import { useLocation } from 'react-router-dom';

import { navbarStyles } from './navbarStyle';

const navLink: INavLinkGroup[] = [
  {
    name: 'Task',
    links: [
      {
        name: 'Add New Task',
        url: '/add',
        key: 'add',
      },
      {
        name: 'My Task',
        url: '/',
        key: 'home',
      },
    ],
  },
];

const Navbar: React.FC = () => {
  const location = useLocation();

  const selectedItem =
    navLink[0].links.find((link) => link.url === location.pathname) ||
    navLink[0].links[1];

  return <Nav groups={navLink} styles={navbarStyles} selectedKey={selectedItem.key} />;
};

export default memo(Navbar);
