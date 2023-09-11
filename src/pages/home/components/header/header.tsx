import { memo } from 'react';

import { lang } from '../../../../utils';
import { headerStyle } from './headerStyle';

const Header = () => {
  return (
    <div style={headerStyle}>
      <h1>{lang('home.header')}</h1>
    </div>
  );
};

export default memo(Header);
