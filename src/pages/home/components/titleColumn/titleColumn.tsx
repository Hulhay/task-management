import React, { memo, useState } from 'react';

import { titleCase } from '../../../../helper';
import { palette } from '../../../../utils';

interface ITitleColumn {
  taskID: string;
  title: string;
}

const TitleColumn: React.FC<ITitleColumn> = ({ taskID, title }) => {
  const [color, setColor] = useState<string>(palette.text.black);
  const [textDecoration, setTextDecoration] = useState<string>('none');

  const style: React.CSSProperties = {
    textDecoration: textDecoration,
    color: color,
  };
  return (
    <a
      style={style}
      href={`/task/${taskID}`}
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
