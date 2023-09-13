import { Label } from '@fluentui/react';
import { memo } from 'react';

import { tagLabelStyle } from './tagLabelStyle';

interface ITagLabel {
  tag: string;
}

const TagLabel: React.FC<ITagLabel> = ({ tag }) => {
  return <Label style={tagLabelStyle}>{tag}</Label>;
};

export default memo(TagLabel);
