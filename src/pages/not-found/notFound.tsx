import { Label, PrimaryButton, Stack } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';

import { Header } from '../../components';
import { lang } from '../../utils';
import { buttonStyle, stackStyle } from './notFoundStyle';

const NotFound = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/');
  };

  return (
    <Stack horizontalAlign="center" verticalAlign="center" styles={stackStyle}>
      <Header title={lang('not_found.header')} />
      <Label>{lang('not_found.description')}</Label>
      <PrimaryButton styles={buttonStyle} onClick={onClick}>
        {lang('button.back_to_home')}
      </PrimaryButton>
    </Stack>
  );
};

export default NotFound;
