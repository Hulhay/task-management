import { memo } from 'react';

import { headerStyle } from './headerStyle';

interface IHeader {
  title: string;
}

const Header = ({ title }: IHeader) => {
  return (
    <div style={headerStyle}>
      <h1>{title}</h1>
    </div>
  );
};

export default memo(Header);
