import { Stack } from '@fluentui/react';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DropResult,
} from '@hello-pangea/dnd';
import React, { useState } from 'react';

import { reorder, reorderCardMap } from '../helper';
import { Lane } from '../lane';
import { IBoard, Lanes } from '../types';

const Board: React.FC<IBoard> = ({ lanes, cards, draggableLanes, onDragEnd }) => {
  const [columns, setColumns] = useState<Lanes>(lanes);
  const orderColumn = Object.keys(columns);

  const reorderList = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    // moving Lane
    if (result.type === 'BOARD') {
      const newOrderColumn: string[] = reorder(
        orderColumn,
        source.index,
        destination.index,
      );

      const newColumns: Lanes = {};
      newOrderColumn.forEach((columnId) => {
        newColumns[columnId] = columns[columnId];
      });

      setColumns(newColumns);
      return;
    }

    const newColumnMap = reorderCardMap(columns, source, destination, draggableId);
    setColumns(newColumnMap);
  };

  const handleDragEnd = (result: DropResult) => {
    reorderList(result);
    if (onDragEnd) onDragEnd();
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" type="BOARD" direction="horizontal">
        {(provided: DroppableProvided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Stack
              className="board"
              horizontal
              tokens={{ childrenGap: 5 }}
              styles={{ root: { minWidth: 100, backgroundColor: 'yellow' } }}
            >
              {Object.values(columns).map((column, index) => (
                <Lane
                  key={column.id}
                  lane={column}
                  cards={cards}
                  index={index}
                  draggableLanes={draggableLanes || false}
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
