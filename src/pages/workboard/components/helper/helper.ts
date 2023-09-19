import { DraggableLocation } from '@hello-pangea/dnd';

import { Lanes } from '../types';

export const reorder = <T>(
  list: T[],
  sourceIndex: number,
  destinationIndex: number,
): T[] => {
  const result = [...list];
  const [removed] = result.splice(sourceIndex, 1);
  result.splice(destinationIndex, 0, removed);

  return result;
};

export const reorderCardMap = (
  columns: Lanes,
  source: DraggableLocation,
  destination: DraggableLocation,
  draggableId: string,
) => {
  const sourceColumn = columns[source.droppableId];
  const destColumn = columns[destination.droppableId];

  // moving Card within Lane
  if (source.droppableId === destination.droppableId) {
    const newCardIDs: string[] = reorder(
      sourceColumn.cardIDs,
      source.index,
      destination.index,
    );

    const newColumn = {
      ...sourceColumn,
      cardIDs: newCardIDs,
    };

    const result: Lanes = {
      ...columns,
      [newColumn.id]: newColumn,
    };

    return result;
  }

  // moving Card across Lane
  const newSourceCardIDs = sourceColumn.cardIDs;
  const newDestCardIDs = destColumn.cardIDs;

  newSourceCardIDs.splice(source.index, 1);
  newDestCardIDs.splice(destination.index, 0, draggableId);

  const newSourceColumn = {
    ...sourceColumn,
    cardIDs: newSourceCardIDs,
  };

  const newDestColumn = {
    ...destColumn,
    cardIDs: newDestCardIDs,
  };

  const result: Lanes = {
    ...columns,
    [newSourceColumn.id]: newSourceColumn,
    [newDestColumn.id]: newDestColumn,
  };

  return result;
};
