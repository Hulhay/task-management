import { Draggable, DraggableProvided } from '@hello-pangea/dnd';

import { CardProps } from '../types';

const CardComponent: React.FC<CardProps> = ({ card, index, cardsProps }) => {
  return (
    <Draggable draggableId={card.draggableID} index={index}>
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
          {cardsProps?.onRender?.(card)}
          {/* {card.id} */}
        </div>
      )}
    </Draggable>
  );
};

export default CardComponent;
