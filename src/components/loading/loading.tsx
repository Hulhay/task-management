import { Stack } from '@fluentui/react';
import { memo } from 'react';

import { style } from './loadingStyle';
import Spinner from './spinner';

const Loading = () => {
  return (
    <Stack horizontalAlign="center" verticalAlign="center" styles={style}>
      <Spinner />
    </Stack>
  );
};

export default memo(Loading);
