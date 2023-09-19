import {
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from '@hello-pangea/dnd';

import { Card } from '../card';
import { LaneProps } from '../types';

const Lane: React.FC<LaneProps> = ({ index, lane, cards }) => {
  return (
    <Draggable key={lane.id} draggableId={lane.id} index={index}>
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
          <h2>{lane.title}</h2>
          <Droppable droppableId={lane.id} type="LANE">
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="card-list"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 5,
                  backgroundColor: snapshot.isDraggingOver ? 'lightblue' : 'blue',
                  minHeight: 200,
                  minWidth: 150,
                }}
              >
                {lane.cardIDs.map((cardId, index) => {
                  return (
                    <Card card={cards[cardId]} key={cards[cardId].id} index={index} />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Lane;
