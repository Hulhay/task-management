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
