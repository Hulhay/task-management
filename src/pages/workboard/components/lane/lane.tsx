import { Label, Stack } from '@fluentui/react';
import {
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from '@hello-pangea/dnd';

import { Card } from '../card';
import { LaneProps } from '../types';

const Lane: React.FC<LaneProps> = ({ index, lane, cards, draggableLanes }) => {
  return (
    <Draggable
      key={lane.id}
      draggableId={lane.id}
      index={index}
      isDragDisabled={!draggableLanes}
    >
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
          <Label {...provided.dragHandleProps}>{lane.title}</Label>
          <Droppable droppableId={lane.id} type="LANE">
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Stack
                  className="card-list"
                  tokens={{ childrenGap: 5 }}
                  styles={{
                    root: {
                      backgroundColor: snapshot.isDraggingOver ? 'lightblue' : 'blue',
                      minHeight: 200,
                      minWidth: 150,
                    },
                  }}
                >
                  {lane.cardIDs.map((cardId, index) => {
                    return (
                      <Card card={cards[cardId]} key={cards[cardId].id} index={index} />
                    );
                  })}
                  {provided.placeholder}
                </Stack>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Lane;
