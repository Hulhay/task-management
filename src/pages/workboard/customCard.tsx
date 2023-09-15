import { CardComponent, CardProps } from 'react-trello-ts/dist/components/Card';

type CustomCardProps = {
  title?: string;
  assignee?: string;
  priority?: string;
};

export const CustomCard: CardComponent<CustomCardProps & CardProps> = ({
  onClick,
  className,
  title,
  tags,
  assignee,
  priority,
}) => {
  const getPriorityColor = (priority: string) => {
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
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      style={{
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 10,
        borderLeft: `3px solid ${getPriorityColor(priority || '')}`,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      className={className}
      onClick={onClick}
    >
      <header>
        <div style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>{title}</div>
      </header>
      <footer
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            backgroundColor: 'yellow',
            width: 25,
            height: 25,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 999,
          }}
        >
          {assignee}
        </div>
        {tags && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 11,
              gap: 5,
            }}
          >
            {tags.map((tag, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'lightblue',
                  padding: '0px 5px',
                  borderRadius: 5,
                }}
              >
                {tag.title}
              </div>
            ))}
          </div>
        )}
      </footer>
    </div>
  );
};
