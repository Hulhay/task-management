import { Stack } from '@fluentui/react';
import {
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from '@hello-pangea/dnd';

import { CardComponent } from '../card';
import { ColumnKanbanProps } from '../types';

const ColumnComponent: React.FC<ColumnKanbanProps> = (props) => {
  return (
    <Draggable
      draggableId={props.column.key}
      index={props.index}
      isDragDisabled={!props.isDraggable}
    >
      {(provided: DraggableProvided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="column"
          style={{
            ...provided.draggableProps.style,
            padding: 5,
            border: '2px solid #454545',
            backgroundColor: 'white',
          }}
        >
          {/* Header Column */}
          <Stack
            {...provided.dragHandleProps}
            className="column-header"
            style={{
              marginBottom: 5,
              border: '2px solid #454545',
              textAlign: props.columnProps?.onRenderHeader ? 'left' : 'center',
            }}
          >
            {props.column.onRenderHeader
              ? props.column.onRenderHeader(props.cards, props.column)
              : props.columnProps?.onRenderHeader
              ? props.columnProps?.onRenderHeader?.(props.cards, props.column)
              : props.column.label}
          </Stack>

          {/* Droppable Area */}
          <Droppable droppableId={props.column.key} type="COLUMN">
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Stack
                  className="card-list"
                  tokens={{ childrenGap: 5 }}
                  styles={{
                    root: {
                      border: '2px solid #454545',
                      backgroundColor: snapshot.isDraggingOver ? '#dddddd' : 'white',
                      minHeight: 50,
                      minWidth: 250,
                    },
                  }}
                >
                  {props.cards?.map((card, index) => (
                    <CardComponent
                      key={card[props.cardsProps?.keyField as string]}
                      index={index}
                      card={card}
                      cardsProps={props.cardsProps}
                    />
                  ))}
                  {provided.placeholder}
                </Stack>
              </div>
            )}
          </Droppable>

          {/* Column Footer */}
          <div style={{ marginTop: 5, border: '2px solid #454545' }}>
            {props.column.onRenderFooter
              ? props.column.onRenderFooter?.(props.cards, props.column)
              : props.columnProps?.onRenderFooter?.(props.cards, props.column)}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default ColumnComponent;
