import { DetailsList, IDropdownOption, SelectionMode } from '@fluentui/react';
import React, { useEffect, useState } from 'react';

import { Header, Loading } from '../../components';
import { taskService } from '../../service';
import { lang } from '../../utils';
import { FilterBox, NoData } from './components';
import { Columns } from './homeProps';
import { style } from './homeStyle';

type IRenderedComponent = {
  [key: string]: React.ReactElement;
};

const Home = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [state, setState] = useState<IDropdownOption>({ key: '', text: '' });
  const [priority, setPriority] = useState<IDropdownOption>({ key: '', text: '' });
  const [toRender, setToRender] = useState<string>('loading');
  const { response, loading, request } = taskService.getTasks({
    keyword,
    state: state.key as string,
    priority: priority.key as string,
  });

  const renderedComponent: IRenderedComponent = {
    loading: <Loading />,
    notData: <NoData />,
    data: (
      <DetailsList
        items={response?.data || []}
        columns={Columns}
        selectionMode={SelectionMode.none}
      />
    ),
  };

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
    if (loading) {
      setToRender('loading');
      return;
    }
    if (response?.data.length === 0) {
      setToRender('notData');
      return;
    }
    setToRender('data');
  }, [response, loading]);

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
      {renderedComponent[toRender]}
    </div>
  );
};

export default Home;
