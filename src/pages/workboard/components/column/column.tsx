import { Stack } from '@fluentui/react';
import {
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from '@hello-pangea/dnd';

import { CardComponent } from '../card';
import { ColumnProps } from '../types';

const ColumnComponent: React.FC<ColumnProps> = ({
  index,
  column,
  cards,
  columnProps,
  cardsProps,
}) => {
  return (
    <Draggable draggableId={column.key} index={index}>
      {(provided: DraggableProvided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="lane"
          style={{
            ...provided.draggableProps.style,
            backgroundColor: 'red',
            padding: 5,
            minWidth: 150,
          }}
        >
          <div
            {...provided.dragHandleProps}
            style={{
              backgroundColor: 'wheat',
              marginBottom: 5,
              textAlign: columnProps?.onRenderHeader ? 'left' : 'center',
            }}
          >
            {column.onRenderHeader
              ? column.onRenderHeader(column, cards)
              : columnProps?.onRenderHeader?.(column, cards) || column.label}
          </div>
          <Droppable droppableId={column.key} type="COLUMN">
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Stack
                  className="card-list"
                  tokens={{ childrenGap: 5 }}
                  styles={{
                    root: {
                      backgroundColor: snapshot.isDraggingOver
                        ? 'lightblue'
                        : 'lightgreen',
                      minHeight: 200,
                      minWidth: 300,
                    },
                  }}
                >
                  {cards?.map((card, index) => (
                    <CardComponent
                      card={card}
                      key={index}
                      index={index}
                      cardsProps={cardsProps}
                    />
                  ))}
                  {provided.placeholder}
                </Stack>
              </div>
            )}
          </Droppable>
          <div style={{ marginTop: 5, backgroundColor: 'wheat' }}>
            {column.onRenderFooter
              ? column.onRenderFooter(column, cards)
              : columnProps?.onRenderFooter?.(column, cards)}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default ColumnComponent;
