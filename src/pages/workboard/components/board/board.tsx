import { Stack } from '@fluentui/react';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DropResult,
} from '@hello-pangea/dnd';
import React, { useState } from 'react';

import { ColumnComponent } from '../column';
import { getCardsMap, reorder, reorderCardsMap } from '../helper';
import { CardsMap, IBoard, IColumn } from '../types';

const Board: React.FC<IBoard> = (props) => {
  const initialCards: CardsMap = getCardsMap(
    props.defaultColumns || [],
    props.defaultCards || [],
    props.columnsProps?.keyField || '',
  );
  const [columnsData, setColumnsData] = useState<IColumn[]>(props.defaultColumns || []);
  const [cardsData, setCardsData] = useState<CardsMap>(initialCards);

  const reorderList = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    // moving Lane
    if (result.type === 'BOARD') {
      const newLanesData = reorder(columnsData, source.index, destination.index);

      setColumnsData(newLanesData);
      return;
    }

    // moving Card
    const newCardsData = reorderCardsMap(cardsData, source, destination);
    setCardsData(newCardsData);
  };

  const handleDragEnd = (result: DropResult) => {
    reorderList(result);

    const { type, source, destination } = result;

    if (type === 'COLUMN') {
      const card = cardsData[source.droppableId][source.index];
      if (props.onCardDragEnd) {
        props.onCardDragEnd(
          card,
          { key: source.droppableId, index: source.index },
          {
            key: destination?.droppableId || '',
            index: destination?.index || -1,
          },
        );
      }
    }

    if (type === 'BOARD') {
      if (props.onColumnDragEnd) {
        props.onColumnDragEnd(
          columnsData[source.index],
          source.index,
          destination?.index,
        );
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" type="BOARD" direction={'horizontal'}>
        {(provided: DroppableProvided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Stack className="board" tokens={{ childrenGap: 5 }} horizontal>
              {Object.values(columnsData).map((column, index) => (
                <ColumnComponent
                  key={column.key}
                  index={index}
                  column={column}
                  cards={cardsData[column.key]}
                  columnProps={props.columnsProps}
                  cardsProps={props.cardsProps}
                  isDraggable={props.dragColumnEnabled}
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
