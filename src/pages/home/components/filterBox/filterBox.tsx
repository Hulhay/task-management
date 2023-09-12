import {
  Dropdown,
  IButtonProps,
  IconButton,
  IDropdownOption,
  Stack,
} from '@fluentui/react';
import { IIconProps } from '@fluentui/react/lib/Icon';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import React, { memo, useEffect, useMemo, useState } from 'react';

import { lang } from '../../../../utils';

const stateOptions: IDropdownOption[] = [
  {
    key: 'todo',
    text: 'Todo',
  },
  {
    key: 'in-progress',
    text: 'In-progress',
  },
  {
    key: 'completed',
    text: 'Completed',
  },
];

const priorityOptions: IDropdownOption[] = [
  {
    key: 'low',
    text: 'Low',
  },
  {
    key: 'medium',
    text: 'Medium',
  },
  {
    key: 'high',
    text: 'High',
  },
];

const filterIcon: IIconProps = { iconName: 'Filter' };
const clearIcon: IIconProps = { iconName: 'Clear' };
const clearSearchIcon: IButtonProps = {
  style: { display: 'none' },
};

const FilterBox = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [state, setState] = useState<IDropdownOption>({ key: '', text: '' });
  const [priority, setPriority] = useState<IDropdownOption>({ key: '', text: '' });

  const onKeywordChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event?.target.value || '');
  };

  const onStateChange = (
    _: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
  ) => {
    if (option) {
      setState(option);
    }
  };

  const onPriorityChange = (
    _: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
  ) => {
    if (option) {
      setPriority(option);
    }
  };

  const onClear = () => {
    setKeyword('');
    setState({ key: '', text: '' });
    setPriority({ key: '', text: '' });
  };

  const showResetButton = useMemo(
    () => !!keyword || !!state.key || !!priority.key,
    [keyword, state.key, priority.key],
  );

  useEffect(() => {
    console.log({
      keyword,
      state: state?.key,
      priority: priority.key,
    });
  }, [keyword, state, priority]);

  return (
    <Stack horizontal>
      <Stack.Item grow={4}>
        <SearchBox
          placeholder={lang('home.filter.title_placeholder')}
          iconProps={filterIcon}
          showIcon
          onChange={onKeywordChange}
          clearButtonProps={clearSearchIcon}
          value={keyword}
        />
      </Stack.Item>
      <Stack.Item grow={1}>
        <Dropdown
          options={stateOptions}
          placeholder={lang('home.filter.state_placeholder')}
          onChange={onStateChange}
          selectedKey={state?.key}
        />
      </Stack.Item>
      <Stack.Item grow={1}>
        <Dropdown
          options={priorityOptions}
          placeholder={lang('home.filter.priority_placeholder')}
          onChange={onPriorityChange}
          selectedKey={priority?.key}
        />
      </Stack.Item>
      {showResetButton ? (
        <Stack.Item>
          <IconButton iconProps={clearIcon} onClick={onClear} />
        </Stack.Item>
      ) : null}
    </Stack>
  );
};

export default memo(FilterBox);
