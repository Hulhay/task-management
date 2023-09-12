import { Label } from '@fluentui/react';
import { memo } from 'react';

import { tagLabelStyle } from './tagLabelStyle';

interface ITagLabel {
  tag: string;
}

const TagLabel = ({ tag }: ITagLabel) => {
  return <Label style={tagLabelStyle}>{tag}</Label>;
};

export default memo(TagLabel);
