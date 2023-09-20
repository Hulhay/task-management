import { Stack } from '@fluentui/react';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DropResult,
} from '@hello-pangea/dnd';
import React, { useState } from 'react';

import { ColumnComponent } from '../column';
import { getCardsMap, reorder, reorderCardMap } from '../helper';
import { CardsMap, IBoard, IColumn } from '../types';

const Board: React.FC<IBoard> = ({ columns, cards, columnProps, cardProps }) => {
  const initialCards: CardsMap = getCardsMap(columns, cards, columnProps.key);
  const [columnsData, setColumnsData] = useState<IColumn[]>(columns);
  const [cardsData, setCardsData] = useState<CardsMap>(initialCards);

  const reorderList = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (!destination) return;

    // moving Lane
    if (result.type === 'BOARD') {
      const newLanesData = reorder(columnsData, source.index, destination.index);

      setColumnsData(newLanesData);
      return;
    }

    // moving Card
    const newCardsData = reorderCardMap(cardsData, source, destination);
    setCardsData(newCardsData);
  };

  const handleDragEnd = (result: DropResult) => {
    reorderList(result);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" type="BOARD" direction={'horizontal'}>
        {(provided: DroppableProvided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Stack
              className="board"
              tokens={{ childrenGap: 5 }}
              styles={{ root: { minWidth: 100, backgroundColor: 'yellow' } }}
              horizontal
            >
              {Object.values(columnsData).map((column, index) => (
                <ColumnComponent
                  key={column.key}
                  column={column}
                  cards={cardsData[column.key]}
                  index={index}
                  columnProps={columnProps}
                  cardsProps={cardProps}
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
