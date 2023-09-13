import { Spinner, SpinnerSize, Stack } from '@fluentui/react';
import { memo } from 'react';

import { style } from './loadingStyle';

const Loading: React.FC = () => {
  return (
    <Stack horizontalAlign="center" verticalAlign="center" styles={style}>
      <Spinner size={SpinnerSize.large} />
    </Stack>
  );
};

export default memo(Loading);
