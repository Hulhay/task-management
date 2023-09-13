import { FontSizes } from '@fluentui/react';
import { memo } from 'react';

import { headerStyle } from './headerStyle';

interface IHeader {
  title: string;
}

const Header = ({ title }: IHeader) => {
  return (
    <div style={headerStyle}>
      <h1 style={{ fontSize: FontSizes.size28, lineHeight: '1.2em' }}>{title}</h1>
    </div>
  );
};

export default memo(Header);
