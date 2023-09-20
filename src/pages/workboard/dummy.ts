import { IColumn } from './components/types';

export const lanes: IColumn[] = [
  {
    key: 'todo',
    label: 'To Do',
    data: {
      max: 100,
    },
  },
  {
    key: 'inprogress',
    label: 'In Progress',
    data: {
      max: 5,
    },
  },
  {
    key: 'completed',
    label: 'Completed',
    data: {
      max: 100,
    },
  },
];

export const cards = [
  {
    id: 'task-1',
    status: 'todo',
    title: 'Task 1',
    priority: 'low',
  },
  {
    id: 'task-2',
    status: 'todo',
    title: 'Task 2',
    priority: 'low',
  },
  {
    id: 'task-3',
    status: 'inprogress',
    title: 'Task 3',
    priority: 'medium',
  },
  {
    id: 'task-4',
    status: 'todo',
    title: 'Task 4',
    priority: 'high',
  },
  {
    id: 'task-5',
    status: 'inprogress',
    title: 'Task 5',
    priority: 'low',
  },
];
