import { Label, Stack } from '@fluentui/react';
import { memo } from 'react';

import { lang } from '../../../../utils';

const NoData = () => {
  return (
    <Stack horizontalAlign="center" verticalAlign="center">
      <Label>{lang('home.list.no_data')}</Label>
    </Stack>
  );
};

export default memo(NoData);
