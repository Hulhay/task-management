import { Stack } from '@fluentui/react';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DropResult,
} from '@hello-pangea/dnd';
import React, { useState } from 'react';

import { getCardsMap, reorder, reorderCardMap } from '../helper';
import { LaneComponent } from '../lane';
import { CardsMap, IBoard, Lane } from '../types';

const Board: React.FC<IBoard> = ({
  lanes,
  cards,
  draggableLanes,
  verticalLanes,
  onDragEnd,
}) => {
  const initialCards: CardsMap = getCardsMap(lanes, cards);
  const [lanesData, setLanesData] = useState<Lane[]>(lanes);
  const [cardsData, setCardsData] = useState<CardsMap>(initialCards);

  const reorderList = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (!destination) return;

    // moving Lane
    if (result.type === 'BOARD') {
      const newLanesData = reorder(lanesData, source.index, destination.index);

      setLanesData(newLanesData);
      return;
    }

    // moving Card
    const newCardsData = reorderCardMap(cardsData, source, destination);
    setCardsData(newCardsData);
  };

  const handleDragEnd = (result: DropResult) => {
    reorderList(result);
    if (onDragEnd) onDragEnd();
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable
        droppableId="board"
        type="BOARD"
        direction={verticalLanes ? 'vertical' : 'horizontal'}
      >
        {(provided: DroppableProvided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Stack
              className="board"
              horizontal={!verticalLanes}
              tokens={{ childrenGap: 5 }}
              styles={{ root: { minWidth: 100, backgroundColor: 'yellow' } }}
            >
              {Object.values(lanesData).map((lane, index) => (
                <LaneComponent
                  key={lane.id}
                  lane={lane}
                  cards={cardsData[lane.id]}
                  index={index}
                  draggableLanes={draggableLanes || false}
                  verticalLanes={verticalLanes || false}
                />
              ))}
              {provided.placeholder}
            </Stack>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
