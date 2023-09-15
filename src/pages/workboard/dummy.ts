import { BoardData } from 'react-trello-ts/dist/types/Board';

export const dummyData: BoardData = {
  lanes: [
    {
      id: 'TODO',
      title: 'To Do',
      label: 'todo1',
      className: 'todo',
      cards: [
        {
          id: 'Milk',
          title:
            'Lorem ipsum dolor sit amet, consectetur tincidunt. Lorem ipsum dolor sit amet, consectetur tincidunt.',
          assignee: 'M',
          priority: 'low',
          description: '2 Gallons of milk at the Deli store',
          tags: [
            {
              title: 'tag1',
            },
            {
              title: 'tag2',
            },
          ],
        },
        {
          id: 'Plan2',
          title: 'Lorem Ipsum Dolor Sit Amet',
          assignee: 'A',
          priority: 'medium',
          description: 'Sort out recyclable and waste as needed',
          tags: [
            {
              title: 'tag1',
            },
          ],
        },
      ],
    },
    {
      id: 'INPROGRESS',
      title: 'In Progress',
      label: 'inprogress',
      disallowAddingCard: true,
      cards: [
        {
          id: 'burn',
          title: 'Burn Garbage',
          assignee: 'M',
          priority: 'low',
          description: 'Sort out recyclable and waste as needed',
          tags: [
            {
              title: 'tag1',
            },
            {
              title: 'tag2',
            },
            {
              title: 'tag3',
            },
          ],
        },
      ],
    },
    {
      id: 'COMPLETED',
      title: 'Completed',
      label: 'completed',
      disallowAddingCard: true,
      cards: [
        {
          id: 'burn2',
          title: 'Burn Garbage 2',
          assignee: 'S',
          priority: 'high',
          description: 'Sort out recyclable and waste as needed',
          tags: [
            {
              title: 'tag3',
            },
          ],
        },
      ],
    },
  ],
};
