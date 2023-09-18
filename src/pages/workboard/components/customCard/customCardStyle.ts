export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'low':
      return 'orange';
    case 'medium':
      return 'blue';
    case 'high':
      return 'red';
    default:
      return 'purple';
  }
};

export const customCardStyle = (priority?: string): React.CSSProperties => {
  return {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderLeft: `3px solid ${getPriorityColor(priority || '')}`,
    borderRadius: 4,
  };
};

export const labelStyle = (
  color: string,
  textDecoration: string,
): React.CSSProperties => {
  return {
    color: color,
    textDecoration: textDecoration,
    fontWeight: 'bold',
    marginBottom: 10,
    width: 250,
    whiteSpace: 'initial',
    lineHeight: 1.1,
  };
};

export const tagStyle: React.CSSProperties = {
  backgroundColor: 'lightblue',
  padding: '0px 5px',
  borderRadius: 5,
  fontSize: 11,
};
