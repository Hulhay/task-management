import { Draggable, DraggableProvided } from '@hello-pangea/dnd';

import { CardProps } from '../types';

const Card: React.FC<CardProps> = ({ card, index }) => {
  return (
    <Draggable key={card.id} draggableId={card.id} index={index}>
      {(provided: DraggableProvided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="card"
          style={{
            ...provided.draggableProps.style,
            backgroundColor: 'white',
            padding: 5,
            minWidth: 150,
          }}
        >
          {card.content}
        </div>
      )}
    </Draggable>
  );
};

export default Card;