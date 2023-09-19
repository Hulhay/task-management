import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DropResult,
} from '@hello-pangea/dnd';
import React, { useState } from 'react';

import { Lane } from '../lane';
import { IBoard, Lanes } from '../types';

const Board: React.FC<IBoard> = ({ lanes, cards, onDragEnd }) => {
  const [columns, setColumns] = useState<Lanes>(lanes);

  const defaultHandleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    console.log(result.type);

    if (!destination) return;

    if (result.type === 'BOARD') {
      // Reorder columns
      const newColumnOrder = Array.from(Object.keys(columns));
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newColumns: Lanes = {};
      newColumnOrder.forEach((columnId) => {
        newColumns[columnId] = columns[columnId];
      });

      setColumns(newColumns);
    } else {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];

      if (source.droppableId === destination.droppableId) {
        // Reorder tasks within the same column
        const newCardIDs = Array.from(sourceColumn.cardIDs);
        newCardIDs.splice(source.index, 1);
        newCardIDs.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...sourceColumn,
          cardIDs: newCardIDs,
        };

        setColumns({
          ...columns,
          [newColumn.id]: newColumn,
        });
      } else {
        // Move task between columns
        const sourceCardIDs = Array.from(sourceColumn.cardIDs);
        const destCardIDs = Array.from(destColumn.cardIDs);

        sourceCardIDs.splice(source.index, 1);
        destCardIDs.splice(destination.index, 0, draggableId);

        const newSourceColumn = {
          ...sourceColumn,
          cardIDs: sourceCardIDs,
        };

        const newDestColumn = {
          ...destColumn,
          cardIDs: destCardIDs,
        };

        setColumns((prevColumns) => ({
          ...prevColumns,
          [newSourceColumn.id]: newSourceColumn,
          [newDestColumn.id]: newDestColumn,
        }));
      }
    }
  };

  const handleDragEnd = (result: DropResult) => {
    defaultHandleDragEnd(result);
    if (onDragEnd) onDragEnd();
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" type="BOARD" direction="horizontal">
        {(provided: DroppableProvided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="board"
            style={{
              display: 'flex',
              gap: 5,
              minWidth: 100,
              backgroundColor: 'yellow',
            }}
          >
            {Object.values(columns).map((column, index) => (
              <Lane key={column.id} lane={column} cards={cards} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
