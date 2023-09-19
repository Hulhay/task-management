import { Cards, Lanes } from './components/types';

export const lanes: Lanes = {
  todo: {
    id: 'todo',
    title: 'To Do',
    cardIDs: ['task-1', 'task-2', 'task-3'],
  },
  inprogress: {
    id: 'inprogress',
    title: 'In Progress',
    cardIDs: ['task-4'],
  },
  completed: {
    id: 'completed',
    title: 'Completed',
    cardIDs: [],
  },
};

export const cards: Cards = {
  'task-1': { id: 'task-1', content: 'Task 1' },
  'task-2': { id: 'task-2', content: 'Task 2' },
  'task-3': { id: 'task-3', content: 'Task 3' },
  'task-4': { id: 'task-4', content: 'Task 4' },
};
