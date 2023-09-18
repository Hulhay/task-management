import { IStackTokens, Stack } from '@fluentui/react';
import { memo, useState } from 'react';
import { CardComponent, CardProps } from 'react-trello-ts/dist/components/Card';

import { titleCase } from '../../../../helper';
import { palette } from '../../../../utils';
import { customCardStyle, labelStyle, tagStyle } from './customCardStyle';

type CustomCardProps = {
  title?: string;
  priority?: string;
};

const stackToken: IStackTokens = {
  childrenGap: 5,
};

const CustomCard: CardComponent<CustomCardProps & CardProps> = ({
  onClick,
  id,
  title,
  tags,
  priority,
}) => {
  const [color, setColor] = useState<string>(palette.text.black);
  const [textDecoration, setTextDecoration] = useState<string>('none');

  return (
    <Stack style={customCardStyle(priority)} onClick={onClick}>
      <a
        style={labelStyle(color, textDecoration)}
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
        {titleCase(title || '')}
      </a>
      {tags && (
        <Stack horizontal horizontalAlign="end" tokens={stackToken}>
          {tags.map((tag, index) => (
            <div key={index} style={tagStyle}>
              {tag.title}
            </div>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default memo(CustomCard);
