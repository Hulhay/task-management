import { IColumn } from '@fluentui/react';

import { TagLabel } from '../../components';
import { formatDateString, titleCase } from '../../helper';
import { lang } from '../../utils';
import { StateLabel, TitleColumn } from './components';

export const Columns: IColumn[] = [
  {
    key: 'title',
    name: lang('home.list.title'),
    minWidth: 210,
    maxWidth: 450,
    isRowHeader: true,
    isResizable: true,
    onRender: (item: any) => {
      return <TitleColumn taskID={item.id} title={item.title} />;
    },
  },
  {
    key: 'status',
    name: lang('home.list.state'),
    minWidth: 70,
    maxWidth: 95,
    isResizable: true,
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
          {item.tags.map((tag: string, index: number) => (
            <TagLabel tag={tag} key={index} />
          ))}
        </div>
      );
    },
  },
];
