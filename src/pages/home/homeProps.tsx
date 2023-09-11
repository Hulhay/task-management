import { IColumn } from '@fluentui/react';

import { formatDateString, titleCase } from '../../helper';
import { lang } from '../../utils';
import { StateLabel, TagLabel, TitleColumn } from './components';

export const Columns: IColumn[] = [
  {
    key: 'title',
    name: lang('home.list.title'),
    minWidth: 210,
    maxWidth: 550,
    isRowHeader: true,
    isResizable: true,
    onRender: (item: any) => {
      return <TitleColumn id={item.id} title={item.title} />;
    },
  },
  {
    key: 'status',
    name: lang('home.list.state'),
    minWidth: 70,
    maxWidth: 90,
    onRender: (item: any) => {
      return <StateLabel state={item.status} />;
    },
  },
  {
    key: 'prirotiy',
    name: lang('home.list.priority'),
    minWidth: 70,
    maxWidth: 90,
    isResizable: true,
    onRender: (item: any) => titleCase(item.priority),
  },
  {
    key: 'dueDate',
    name: lang('home.list.due_date'),
    minWidth: 80,
    maxWidth: 120,
    isResizable: true,
    onRender: (item: any) => formatDateString(item.due_date, 'MMMM D, YYYY'),
  },
  {
    key: 'tags',
    name: lang('home.list.tags'),
    minWidth: 70,
    maxWidth: 90,
    isResizable: true,
    onRender: (item: any) => {
      return (
        <div>
          {item.tags.map((tag: string) => (
            <TagLabel tag={tag} key={tag} />
          ))}
        </div>
      );
    },
  },
];
