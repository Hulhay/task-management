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

const LaneComponent: React.FC<LaneProps> = ({
  index,
  lane,
  cards,
  draggableLanes,
  verticalLanes,
}) => {
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
          <Droppable
            droppableId={lane.id}
            type="LANE"
            direction={verticalLanes ? 'horizontal' : 'vertical'}
          >
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Stack
                  className="card-list"
                  horizontal={verticalLanes}
                  tokens={{ childrenGap: 5 }}
                  styles={{
                    root: {
                      backgroundColor: snapshot.isDraggingOver ? 'lightblue' : 'blue',
                      minHeight: 200,
                      minWidth: 150,
                    },
                  }}
                >
                  {cards.map((card, index) => (
                    <Card card={card} key={card.id} index={index} />
                  ))}
                  {/* {lane.cardIDs.map((cardId, index) => {
                    return (
                      <Card card={cards[cardId]} key={cards[cardId].id} index={index} />
                    );
                  })} */}
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

export default LaneComponent;
