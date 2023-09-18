import { BoardData } from 'react-trello-ts/dist/types/Board';

export const boardData: BoardData = {
  lanes: [
    {
      id: 'todo',
      title: 'To Do',
      className: 'todo',
      cards: [],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      disallowAddingCard: true,
      cards: [],
    },
    {
      id: 'completed',
      title: 'Completed',
      disallowAddingCard: true,
      cards: [],
    },
  ],
};
