import { IDropdownOption } from '@fluentui/react';

export const stateOptions: IDropdownOption[] = [
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

export const priorityOptions: IDropdownOption[] = [
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

export const tagOptions: IDropdownOption[] = [
  {
    key: 'tag1',
    text: 'tag1',
  },
  {
    key: 'tag2',
    text: 'tag2',
  },
  {
    key: 'tag3',
    text: 'tag3',
  },
];

export const getStateText = (key: string) => {
  switch (key) {
    case 'todo':
      return 'Todo';
    case 'in-progress':
      return 'In-progress';
    case 'completed':
      return 'Completed';
    default:
      return 'Todo';
  }
};

export const getPriorityText = (key: string) => {
  switch (key) {
    case 'low':
      return 'Low';
    case 'medium':
      return 'Medium';
    case 'high':
      return 'High';
    default:
      return 'Low';
  }
};
