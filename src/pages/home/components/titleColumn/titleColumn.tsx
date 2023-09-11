import React, { memo, useState } from 'react';

import { titleCase } from '../../../../helper';
import { palette } from '../../../../utils';

interface ITitleColumn {
  id: string;
  title: string;
}

const TitleColumn = ({ id, title }: ITitleColumn) => {
  const [color, setColor] = useState<string>(palette.text.black);
  const [textDecoration, setTextDecoration] = useState<string>('none');

  const style: React.CSSProperties = {
    textDecoration: textDecoration,
    color: color,
  };
  return (
    <a
      style={style}
      href={`/task/${id}`}
      onMouseEnter={() => {
        setColor(palette.text.selected);
        setTextDecoration('underline');
      }}
      onMouseLeave={() => {
        setColor(palette.text.black);
        setTextDecoration('none');
      }}
    >
      {titleCase(title)}
    </a>
  );
};

export default memo(TitleColumn);
