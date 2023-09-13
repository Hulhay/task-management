import { Stack } from '@fluentui/react';

import { Header } from '../../components';
import { lang } from '../../utils';

const NetworkError: React.FC = () => {
  return (
    <Stack horizontalAlign="center">
      <Header title={lang('network_error.header')} />
    </Stack>
  );
};

export default NetworkError;
