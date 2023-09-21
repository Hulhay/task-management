import { Label, Stack } from '@fluentui/react';
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
          <Label
            {...provided.dragHandleProps}
            style={{ backgroundColor: 'wheat', marginBottom: 5 }}
          >
            {column.label}
          </Label>
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
                      minWidth: 150,
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
            {columnProps?.onRenderFooter?.(column, cards)}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default ColumnComponent;
