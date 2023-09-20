import { Card, Lane } from './components/types';

export const lanes: Lane[] = [
  {
    id: 'todo',
    title: 'To Do',
  },
  {
    id: 'inprogress',
    title: 'In Progress',
  },
  {
    id: 'completed',
    title: 'Completed',
  },
];

export const cards: Card[] = [
  {
    id: 'task-1',
    laneID: 'todo',
    content: 'Task 1',
  },
  {
    id: 'task-2',
    laneID: 'todo',
    content: 'Task 2',
  },
  {
    id: 'task-3',
    laneID: 'inprogress',
    content: 'Task 3',
  },
  {
    id: 'task-4',
    laneID: 'todo',
    content: 'Task 4',
  },
  {
    id: 'task-5',
    laneID: 'inprogress',
    content: 'Task 5',
  },
];
