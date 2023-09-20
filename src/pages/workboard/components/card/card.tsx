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
          }}
        >
          {cardsProps?.onRender?.(card) || card.draggableID}
        </div>
      )}
    </Draggable>
  );
};

export default CardComponent;
