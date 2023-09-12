import { DetailsList, IDropdownOption, SelectionMode } from '@fluentui/react';
import React, { useEffect, useState } from 'react';

import { Header, Loading } from '../../components';
import { taskService } from '../../service';
import { lang } from '../../utils';
import { FilterBox } from './components';
import { Columns } from './homeProps';
import { style } from './homeStyle';

const Home = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [state, setState] = useState<IDropdownOption>({ key: '', text: '' });
  const [priority, setPriority] = useState<IDropdownOption>({ key: '', text: '' });
  const { response, loading, request } = taskService.getTasks({
    keyword,
    state: state.key as string,
    priority: priority.key as string,
  });

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

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    if (keyword && keyword.length < 3) return;
    request();
  }, [keyword, state, priority]);

  return (
    <div style={style}>
      <Header title={lang('home.header')} />
      <FilterBox
        keyword={keyword}
        state={state}
        priority={priority}
        onKeywordChange={onKeywordChange}
        onStateChange={onStateChange}
        onPriorityChange={onPriorityChange}
        onClear={onClear}
      />
      {loading ? (
        <Loading />
      ) : (
        <DetailsList
          items={response?.data || []}
          columns={Columns}
          selectionMode={SelectionMode.none}
        />
      )}
    </div>
  );
};

export default Home;
