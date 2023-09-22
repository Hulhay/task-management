import { Draggable, DraggableProvided } from '@hello-pangea/dnd';

import { CardKanbanProps } from '../types';

const Card: React.FC<CardKanbanProps> = (props) => {
  const cardKey = props.card[props.cardsProps?.keyField as string];

  return (
    <Draggable draggableId={cardKey} index={props.index}>
      {(provided: DraggableProvided) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="card"
          style={{
            ...provided.draggableProps.style,
          }}
          onClick={(e) => props.onCardClick?.(e, props.card)}
          onDoubleClick={(e) => props.onCardDoubleClick?.(e, props.card)}
        >
          {props.cardsProps?.onRender
            ? props.cardsProps?.onRender?.(props.card)
            : cardKey}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
